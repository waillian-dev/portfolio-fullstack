import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getSkills);
router.post('/', protectAdmin, createSkill);
router.put('/:id', protectAdmin, updateSkill);
router.delete('/:id', protectAdmin, deleteSkill);

export default router;
