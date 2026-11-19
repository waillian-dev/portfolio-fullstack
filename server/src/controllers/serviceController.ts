import { Request, Response } from 'express';
import Service from '../models/Service';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const getServices = catchAsync(async (req: Request, res: Response) => {
  const services = await Service.find().sort({ displayOrder: 1, createdAt: 1 });
  return sendResponse({
    res,
    message: 'Services retrieved successfully',
    data: services,
  });
});

export const createService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Service item created successfully',
    data: service,
  });
});

export const updateService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new AppError('Service item not found', 404);
  }

  return sendResponse({
    res,
    message: 'Service item updated successfully',
    data: service,
  });
});

export const deleteService = catchAsync(async (req: Request, res: Response) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    throw new AppError('Service item not found', 404);
  }

  return sendResponse({
    res,
    message: 'Service item deleted successfully',
  });
});
