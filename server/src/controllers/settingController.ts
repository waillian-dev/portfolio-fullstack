import { Request, Response } from 'express';
import SiteSetting from '../models/SiteSetting';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';

export const getSettings = catchAsync(async (req: Request, res: Response) => {
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({
      siteTitle: 'Alex Vance — Senior Full-Stack Developer',
      siteDescription: 'Portfolio of Alex Vance, a Senior Full-Stack Developer specializing in MERN Stack, React, Node.js and Cloud Architecture.',
      primaryColor: '#6366f1',
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
      },
    });
  }

  return sendResponse({
    res,
    message: 'Settings retrieved successfully',
    data: settings,
  });
});

export const updateSettings = catchAsync(async (req: Request, res: Response) => {
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create(req.body);
  } else {
    settings = await SiteSetting.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  }

  return sendResponse({
    res,
    message: 'Settings updated successfully',
    data: settings,
  });
});
