import { Request, Response } from 'express';
import Profile from '../models/Profile';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({
      fullName: 'Alex Vance',
      headline: 'Senior Full-Stack Developer & Software Architect',
      bio: 'Crafting scalable web apps, clean APIs, and elegant mobile experiences using modern technologies.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      location: 'San Francisco, CA',
      email: 'alex.vance@example.com',
      phone: '+1 (555) 234-5678',
      availabilityStatus: 'Available for Freelance / Full-Time Opportunities',
      resumeUrl: '/sample_resume.pdf',
      stats: {
        yearsExperience: 5,
        completedProjects: 32,
        totalClients: 18,
        technologiesMastered: 24,
      },
    });
  }

  return sendResponse({
    res,
    message: 'Profile retrieved successfully',
    data: profile,
  });
});

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  return sendResponse({
    res,
    message: 'Profile updated successfully',
    data: profile,
  });
});
