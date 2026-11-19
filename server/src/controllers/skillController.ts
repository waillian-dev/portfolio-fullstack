import { Request, Response } from 'express';
import Skill from '../models/Skill';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const getSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await Skill.find().sort({ displayOrder: 1, createdAt: 1 });
  return sendResponse({
    res,
    message: 'Skills retrieved successfully',
    data: skills,
  });
});

export const createSkill = catchAsync(async (req: Request, res: Response) => {
  const skill = await Skill.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Skill created successfully',
    data: skill,
  });
});

export const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!skill) {
    throw new AppError('Skill not found', 404);
  }

  return sendResponse({
    res,
    message: 'Skill updated successfully',
    data: skill,
  });
});

export const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) {
    throw new AppError('Skill not found', 404);
  }

  return sendResponse({
    res,
    message: 'Skill deleted successfully',
  });
});
