import express from 'express';
import { getAllJobs, getJobById, createJob, getUserJobs, deleteJob } from '../controllers/jobController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', authenticate, createJob);
router.get('/user/:userId', getUserJobs);
router.delete('/:id', authenticate, deleteJob);

export default router;
