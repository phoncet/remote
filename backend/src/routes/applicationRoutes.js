import express from 'express';
import { applyForJob, getUserApplications, getJobApplications, getAllApplications, deleteApplication } from '../controllers/applicationController.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, applyForJob);
router.get('/user/:userId', getUserApplications);
router.get('/job/:jobId', authenticate, getJobApplications);
router.get('/', authenticate, adminOnly, getAllApplications);
router.delete('/:id', authenticate, deleteApplication);

export default router;
