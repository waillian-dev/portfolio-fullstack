import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';
import { catchAsync } from '../utils/asyncWrapper';
import { sendResponse } from '../utils/apiResponse';
import { AppError } from '../utils/appError';
import { slugify } from '../utils/generateSlug';

export const getBlogPosts = catchAsync(async (req: Request, res: Response) => {
  const { category, tag, search } = req.query;
  const isPublic = !req.headers.authorization;
  const filter: any = isPublic ? { isPublished: true } : {};

  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const posts = await BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  return sendResponse({
    res,
    message: 'Blog posts retrieved successfully',
    data: posts,
  });
});

export const getBlogPostBySlug = catchAsync(async (req: Request, res: Response) => {
  const post = await BlogPost.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { viewsCount: 1 } },
    { new: true }
  );

  if (!post) {
    throw new AppError('Blog post not found', 404);
  }

  return sendResponse({
    res,
    message: 'Blog post retrieved successfully',
    data: post,
  });
});

export const createBlogPost = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.slug && req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const post = await BlogPost.create(req.body);
  return sendResponse({
    res,
    statusCode: 201,
    message: 'Blog post created successfully',
    data: post,
  });
});

export const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
  if (req.body.title && !req.body.slug) {
    req.body.slug = slugify(req.body.title);
  }

  const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    throw new AppError('Blog post not found', 404);
  }

  return sendResponse({
    res,
    message: 'Blog post updated successfully',
    data: post,
  });
});

export const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) {
    throw new AppError('Blog post not found', 404);
  }

  return sendResponse({
    res,
    message: 'Blog post deleted successfully',
  });
});
