import pool from '../config/database.js';

// User Model
export const User = {
  async create(name, phone, hashedPassword, role = 'user') {
    const query = `
      INSERT INTO users (name, phone, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, phone, role;
    `;
    const result = await pool.query(query, [name, phone, hashedPassword, role]);
    return result.rows[0];
  },

  async findByPhone(phone) {
    const query = 'SELECT * FROM users WHERE phone = $1';
    const result = await pool.query(query, [phone]);
    return result.rows[0];
  },

  async findById(id) {
    const query = 'SELECT id, name, phone, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findAll() {
    const query = 'SELECT id, name, phone, role, created_at FROM users ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async update(id, name, phone) {
    const query = `
      UPDATE users SET name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, name, phone, role;
    `;
    const result = await pool.query(query, [name, phone, id]);
    return result.rows[0];
  },
};

// Job Model
export const Job = {
  async create(userId, jobData) {
    const { title, category, region, district, locationName, salary, salaryPeriod, jobType, description, phone } = jobData;
    const query = `
      INSERT INTO jobs (user_id, title, category, region, district, location_name, salary, salary_period, job_type, description, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, title, category, region, district, locationName, salary, salaryPeriod, jobType, description, phone]);
    return result.rows[0];
  },

  async findAll(limit = 50, offset = 0) {
    const query = `
      SELECT j.*, u.name as user_name, u.phone as user_phone
      FROM jobs j
      LEFT JOIN users u ON j.user_id = u.id
      ORDER BY j.created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  },

  async findById(id) {
    const query = `
      SELECT j.*, u.name as user_name, u.phone as user_phone
      FROM jobs j
      LEFT JOIN users u ON j.user_id = u.id
      WHERE j.id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  async findByUserId(userId) {
    const query = `
      SELECT * FROM jobs
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async findByCategory(category) {
    const query = `
      SELECT * FROM jobs
      WHERE category = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [category]);
    return result.rows;
  },

  async findByRegion(region) {
    const query = `
      SELECT * FROM jobs
      WHERE region = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [region]);
    return result.rows;
  },

  async delete(id) {
    const query = 'DELETE FROM jobs WHERE id = $1 RETURNING id;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

// Application Model
export const Application = {
  async create(jobId, userId, applicantName, applicantPhone, applicantBio) {
    const query = `
      INSERT INTO applications (job_id, user_id, applicant_name, applicant_phone, applicant_bio)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [jobId, userId, applicantName, applicantPhone, applicantBio]);
    return result.rows[0];
  },

  async findByUserId(userId) {
    const query = `
      SELECT a.*, j.title, j.category, u.name as job_poster_name
      FROM applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      LEFT JOIN users u ON j.user_id = u.id
      WHERE a.user_id = $1
      ORDER BY a.created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async findByJobId(jobId) {
    const query = `
      SELECT a.*, u.name, u.phone
      FROM applications a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.job_id = $1
      ORDER BY a.created_at DESC;
    `;
    const result = await pool.query(query, [jobId]);
    return result.rows;
  },

  async findAll() {
    const query = `
      SELECT a.*, j.title, u.name as applicant_user_name
      FROM applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async delete(id) {
    const query = 'DELETE FROM applications WHERE id = $1 RETURNING id;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

// Payment Model
export const Payment = {
  async create(userId, amount, paymentMethod, reference) {
    const query = `
      INSERT INTO payments (user_id, amount, payment_method, reference, status)
      VALUES ($1, $2, $3, $4, 'completed')
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, amount, paymentMethod, reference]);
    return result.rows[0];
  },

  async findByUserId(userId) {
    const query = `
      SELECT * FROM payments
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async findAll() {
    const query = `
      SELECT * FROM payments
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  },
};
