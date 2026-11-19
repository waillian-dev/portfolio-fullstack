import { Router } from 'express';
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

export default router;
