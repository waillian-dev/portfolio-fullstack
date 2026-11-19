import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { catchAsync } from '../utils/asyncWrapper';
import { AppError } from '../utils/appError';
import { sendResponse } from '../utils/apiResponse';
import { ENV } from '../config/env';
import { AuthRequest } from '../middleware/authMiddleware';

const signToken = (id: string) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = signToken(admin._id.toString());
  admin.password = undefined;

  return sendResponse({
    res,
    statusCode: 200,
    message: 'Login successful',
    data: {
      admin,
      token,
    },
  });
});

export const getMe = catchAsync(async (req: AuthRequest, res: Response) => {
  return sendResponse({
    res,
    statusCode: 200,
    message: 'Admin profile retrieved',
    data: req.admin,
  });
});
