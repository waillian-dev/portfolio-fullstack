import { Request, Response } from 'express';
import Experience from '../models/Experience';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const getExperiences = catchAsync(async (req: Request, res: Response) => {
  const experiences = await Experience.find().sort({ startDate: -1, displayOrder: 1 });
  return sendResponse({
    res,
    message: 'Experiences retrieved successfully',
    data: experiences,
  });
});

export const createExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await Experience.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Experience entry created successfully',
    data: experience,
  });
});

export const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!experience) {
    throw new AppError('Experience entry not found', 404);
  }

  return sendResponse({
    res,
    message: 'Experience entry updated successfully',
    data: experience,
  });
});

export const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) {
    throw new AppError('Experience entry not found', 404);
  }

  return sendResponse({
    res,
    message: 'Experience entry deleted successfully',
  });
});
