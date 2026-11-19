import { Response } from 'express';

interface SendResponseOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: any;
  meta?: any;
}

export const sendResponse = ({
  res,
  statusCode = 200,
  message = 'Success',
  data = null,
  meta = undefined,
}: SendResponseOptions) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta && { meta }),
  });
};
