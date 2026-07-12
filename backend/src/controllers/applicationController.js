import { Application } from '../models/index.js';

export const applyForJob = async (req, res) => {
  try {
    const { jobId, applicantName, applicantPhone, applicantBio } = req.body;
    const userId = req.user.id;

    if (!jobId || !applicantName || !applicantPhone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const application = await Application.create(jobId, userId, applicantName, applicantPhone, applicantBio);

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.findByUserId(userId);

    res.json({
      message: 'User applications retrieved successfully',
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.findByJobId(jobId);

    res.json({
      message: 'Job applications retrieved successfully',
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();

    res.json({
      message: 'All applications retrieved successfully',
      applications,
      count: applications.length,
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.delete(id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};
