import { Router } from 'express';
import { login, getMe } from '../controllers/authController';
import { protectAdmin } from '../middleware/authMiddleware';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', authRateLimiter, login);
router.get('/me', protectAdmin, getMe);

export default router;
