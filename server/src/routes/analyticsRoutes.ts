import { Router } from 'express';
import { getAnalyticsSummary } from '../controllers/analyticsController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/summary', protectAdmin, getAnalyticsSummary);

export default router;
