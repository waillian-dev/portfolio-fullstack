import { Router } from 'express';
import { uploadImage, uploadMiddleware } from '../controllers/uploadController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protectAdmin, uploadMiddleware.single('image'), uploadImage);

export default router;
