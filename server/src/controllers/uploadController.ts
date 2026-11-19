import { Request, Response } from 'express';
import multer from 'multer';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';
import { uploadFileToCloudflareR2 } from '../services/r2Service';

const storage = multer.memoryStorage();
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files (JPG, PNG, WebP, GIF) are allowed', 400) as any, false);
    }
  },
});

export const uploadImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No image file provided', 400);
  }

  const imageUrl = await uploadFileToCloudflareR2(req.file);

  return sendResponse({
    res,
    statusCode: 201,
    message: 'Image uploaded successfully to Cloudflare R2',
    data: {
      url: imageUrl,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  });
});
