import { Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const createContactMessage = catchAsync(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new AppError('All fields (name, email, subject, message) are required', 400);
  }

  const newMsg = await ContactMessage.create({ name, email, subject, message });

  return sendResponse({
    res,
    statusCode: 201,
    message: 'Thank you for reaching out! Your message has been received.',
    data: newMsg,
  });
});

export const getContactMessages = catchAsync(async (req: Request, res: Response) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return sendResponse({
    res,
    message: 'Contact messages retrieved successfully',
    data: messages,
  });
});

export const updateContactMessageStatus = catchAsync(async (req: Request, res: Response) => {
  const { isRead, isReplied } = req.body;

  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { ...(isRead !== undefined && { isRead }), ...(isReplied !== undefined && { isReplied }) },
    { new: true }
  );

  if (!msg) {
    throw new AppError('Message not found', 404);
  }

  return sendResponse({
    res,
    message: 'Message status updated',
    data: msg,
  });
});

export const deleteContactMessage = catchAsync(async (req: Request, res: Response) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) {
    throw new AppError('Message not found', 404);
  }

  return sendResponse({
    res,
    message: 'Contact message deleted successfully',
  });
});
