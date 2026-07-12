import express from 'express';
import { getUserProfile, getAllUsers, getAdminStats } from '../controllers/userController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getUserProfile);
router.get('/', authenticate, adminOnly, getAllUsers);
router.get('/admin/stats', authenticate, adminOnly, getAdminStats);

export default router;
