import dotenv from 'dotenv';
import { initDatabase } from '../models/schema.js';
import pool from '../config/database.js';

dotenv.config();

const initDb = async () => {
  try {
    console.log('🔄 Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected');

    await initDatabase();

    console.log('✅ Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

initDb();
