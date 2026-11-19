import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const getTestimonials = catchAsync(async (req: Request, res: Response) => {
  const isPublic = !req.headers.authorization;
  const filter = isPublic ? { isApproved: true } : {};

  const testimonials = await Testimonial.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  return sendResponse({
    res,
    message: 'Testimonials retrieved successfully',
    data: testimonials,
  });
});

export const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Testimonial created successfully',
    data: testimonial,
  });
});

export const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  return sendResponse({
    res,
    message: 'Testimonial updated successfully',
    data: testimonial,
  });
});

export const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    throw new AppError('Testimonial not found', 404);
  }

  return sendResponse({
    res,
    message: 'Testimonial deleted successfully',
  });
});
