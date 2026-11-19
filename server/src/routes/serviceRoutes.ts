import { Router } from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { protectAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getServices);
router.post('/', protectAdmin, createService);
router.put('/:id', protectAdmin, updateService);
router.delete('/:id', protectAdmin, deleteService);

export default router;
