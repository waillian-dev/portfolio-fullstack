import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ENV } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message || 'Internal Server Error';
  error.statusCode = err.statusCode || 500;

  console.error(`[Error Handler] ${error.statusCode} - ${error.message}`);

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(ENV.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
