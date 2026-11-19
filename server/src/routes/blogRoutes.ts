import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', protectAdmin, createBlogPost);
router.put('/:id', protectAdmin, updateBlogPost);
router.delete('/:id', protectAdmin, deleteBlogPost);

export default router;
