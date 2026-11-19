import { Request, Response } from 'express';
import Project from '../models/Project';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';
import { slugify } from '../utils/generateSlug';

export const getProjects = catchAsync(async (req: Request, res: Response) => {
  const { category, featured, search } = req.query;
  const filter: any = {};

  if (category && category !== 'All') {
    filter.category = category;
  }
  if (featured === 'true') {
    filter.featured = true;
  }
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { technologies: { $regex: search, $options: 'i' } },
    ];
  }

  const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
  return sendResponse({
    res,
    message: 'Projects retrieved successfully',
    data: projects,
  });
});

export const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  const project = await Project.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { viewsCount: 1 } },
    { new: true }
  );

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return sendResponse({
    res,
    message: 'Project retrieved successfully',
    data: project,
  });
});

export const createProject = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.slug && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const existingSlug = await Project.findOne({ slug: req.body.slug });
  if (existingSlug) {
    req.body.slug = `${req.body.slug}-${Date.now()}`;
  }

  const project = await Project.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Project created successfully',
    data: project,
  });
});

export const updateProject = catchAsync(async (req: Request, res: Response) => {
  if (req.body.title && !req.body.slug) {
    req.body.slug = slugify(req.body.title);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return sendResponse({
    res,
    message: 'Project updated successfully',
    data: project,
  });
});

export const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }

  return sendResponse({
    res,
    message: 'Project deleted successfully',
  });
});
