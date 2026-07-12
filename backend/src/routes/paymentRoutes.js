import express from 'express';
import { processPayment, getUserPayments, getAllPayments } from '../controllers/paymentController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, processPayment);
router.get('/user/:userId', authenticate, getUserPayments);
router.get('/', authenticate, adminOnly, getAllPayments);

export default router;
