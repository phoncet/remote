import { User, Job, Application, Payment } from '../models/index.js';

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User profile retrieved successfully',
      user,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json({
      message: 'All users retrieved successfully',
      users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Admin Dashboard Stats
export const getAdminStats = async (req, res) => {
  try {
    const users = await User.findAll();
    const allUsers = await User.findAll();
    const jobs = await Job.findAll(1000, 0);
    const applications = await Application.findAll();

    const stats = {
      totalUsers: users.length,
      totalJobs: jobs.length,
      totalApplications: applications.length,
      activeListings: jobs.length,
      totalPayments: applications.length * 200, // 200 TSH per job
    };

    res.json({
      message: 'Admin stats retrieved successfully',
      stats,
      users: allUsers,
      jobs,
      applications,
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve admin stats' });
  }
};
