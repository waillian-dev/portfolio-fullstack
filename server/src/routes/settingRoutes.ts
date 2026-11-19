import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getSettings);
router.put('/', protectAdmin, updateSettings);

export default router;
