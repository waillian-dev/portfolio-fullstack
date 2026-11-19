import { Request, Response } from 'express';
import Project from '../models/Project';
import BlogPost from '../models/BlogPost';
import ContactMessage from '../models/ContactMessage';
import Testimonial from '../models/Testimonial';
import Skill from '../models/Skill';
import Service from '../models/Service';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';

export const getAnalyticsSummary = catchAsync(async (req: Request, res: Response) => {
  const [
    totalProjects,
    totalBlogPosts,
    totalMessages,
    unreadMessages,
    totalTestimonials,
    totalSkills,
    totalServices,
  ] = await Promise.all([
    Project.countDocuments(),
    BlogPost.countDocuments(),
    ContactMessage.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
    Testimonial.countDocuments(),
    Skill.countDocuments(),
    Service.countDocuments(),
  ]);

  const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
  const popularProjects = await Project.find().sort({ viewsCount: -1 }).limit(4);
  const popularBlogPosts = await BlogPost.find().sort({ viewsCount: -1 }).limit(4);

  return sendResponse({
    res,
    message: 'Analytics summary retrieved',
    data: {
      metrics: {
        totalProjects,
        totalBlogPosts,
        totalMessages,
        unreadMessages,
        totalTestimonials,
        totalSkills,
        totalServices,
      },
      recentMessages,
      popularProjects,
      popularBlogPosts,
      monthlyTraffic: [
        { month: 'Jan', views: 1200 },
        { month: 'Feb', views: 1900 },
        { month: 'Mar', views: 2400 },
        { month: 'Apr', views: 3100 },
        { month: 'May', views: 2800 },
        { month: 'Jun', views: 3900 },
        { month: 'Jul', views: 4500 },
      ],
    },
  });
});
