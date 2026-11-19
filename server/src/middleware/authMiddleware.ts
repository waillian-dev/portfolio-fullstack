import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { AppError } from '../utils/appError';
import Admin, { IAdmin } from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export const protectAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Unauthorized: Access token missing', 401));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new AppError('Unauthorized: User no longer exists', 401));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};
