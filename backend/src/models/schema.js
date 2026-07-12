import pool from '../config/database.js';

// Create Users Table
export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Users table created');
};

// Create Jobs Table
export const createJobsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS jobs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      region VARCHAR(100) NOT NULL,
      district VARCHAR(100) NOT NULL,
      location_name VARCHAR(255),
      salary VARCHAR(100),
      salary_period VARCHAR(50),
      job_type VARCHAR(100),
      description TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Jobs table created');
};

// Create Applications Table
export const createApplicationsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS applications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      applicant_name VARCHAR(255) NOT NULL,
      applicant_phone VARCHAR(20) NOT NULL,
      applicant_bio TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Applications table created');
};

// Create Payments Table
export const createPaymentsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      amount DECIMAL(10, 2) NOT NULL,
      payment_method VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      reference VARCHAR(255) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log('✓ Payments table created');
};

// Create Indexes
export const createIndexes = async () => {
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id)',
    'CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id)',
    'CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id)',
    'CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id)',
  ];

  for (const index of indexes) {
    await pool.query(index);
  }
  console.log('✓ Indexes created');
};

// Initialize All Tables
export const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    await createUsersTable();
    await createJobsTable();
    await createApplicationsTable();
    await createPaymentsTable();
    await createIndexes();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};
