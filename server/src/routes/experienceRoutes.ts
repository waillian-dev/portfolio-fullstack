import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getExperiences);
router.post('/', protectAdmin, createExperience);
router.put('/:id', protectAdmin, updateExperience);
router.delete('/:id', protectAdmin, deleteExperience);

export default router;
