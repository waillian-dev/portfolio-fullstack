import { Router } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import skillRoutes from './skillRoutes';
import experienceRoutes from './experienceRoutes';
import serviceRoutes from './serviceRoutes';
import projectRoutes from './projectRoutes';
import testimonialRoutes from './testimonialRoutes';
import blogRoutes from './blogRoutes';
import contactRoutes from './contactRoutes';
import settingRoutes from './settingRoutes';
import analyticsRoutes from './analyticsRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/services', serviceRoutes);
router.use('/projects', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/settings', settingRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/upload', uploadRoutes);

export default router;
