import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'kazinzuri_db',
  user: process.env.DB_USER || 'postgres',
  // Coerce password to string to avoid SASL client errors when env var is unexpected type
  password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : '',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
