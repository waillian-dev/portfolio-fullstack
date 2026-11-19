import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController';
import { protectAdmin } from '../middleware/authMiddleware';
import { authRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', authRateLimiter, createContactMessage);
router.get('/', protectAdmin, getContactMessages);
router.patch('/:id', protectAdmin, updateContactMessageStatus);
router.delete('/:id', protectAdmin, deleteContactMessage);

export default router;
