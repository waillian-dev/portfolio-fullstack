import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProfile);
router.put('/', protectAdmin, updateProfile);

export default router;
