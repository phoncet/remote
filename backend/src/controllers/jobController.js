import { Job } from '../models/index.js';
import { DEMO_JOBS } from '../data/demoJobs.js';

export const getAllJobs = async (req, res) => {
  try {
    const { category, region, limit = 50, offset = 0 } = req.query;

    let jobs;

    if (category) {
      jobs = await Job.findByCategory(category);
    } else if (region) {
      jobs = await Job.findByRegion(region);
    } else {
      jobs = await Job.findAll(parseInt(limit), parseInt(offset));
    }

    res.json({
      message: 'Jobs retrieved successfully',
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    // fallback to demo jobs for local development when DB is unreachable
    return res.json({ message: 'Jobs retrieved (demo fallback)', jobs: DEMO_JOBS, count: DEMO_JOBS.length });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({
      message: 'Job retrieved successfully',
      job,
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Failed to retrieve job' });
  }
};

export const createJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, category, region, district, locationName, salary, salaryPeriod, jobType, description, phone } = req.body;

    if (!title || !category || !region || !district || !salary || !description || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const jobData = {
      title,
      category,
      region,
      district,
      locationName,
      salary,
      salaryPeriod,
      jobType,
      description,
      phone,
    };

    const job = await Job.create(userId, jobData);

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

export const getUserJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.findByUserId(userId);

    res.json({
      message: 'User jobs retrieved successfully',
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('Get user jobs error:', error);
    res.status(500).json({ error: 'Failed to retrieve user jobs' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (job.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'You do not have permission to delete this job' });
    }

    await Job.delete(id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
