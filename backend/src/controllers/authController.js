import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ error: 'Name, phone, and password are required' });
    }

    // Password complexity: must be a string containing uppercase, lowercase, number, and special character
    if (typeof password !== 'string') {
      return res.status(400).json({ error: 'Password must be a string' });
    }

    const pwdExample = 'Mfano: Abc123!@#';
    const complexityRe = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
    if (password.length < 8 || !complexityRe.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character', example: pwdExample });
    }

    const existingUser = await User.findByPhone(phone);
    if (existingUser) {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(name, phone, hashedPassword);

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);

    // Detect Postgres SASL error when client password isn't a string
    if (error && /client password must be a string/i.test(error.message || '')) {
      return res.status(500).json({ error: 'Database authentication error: DB_PASSWORD must be a string. Check your environment settings.' , details: process.env.NODE_ENV !== 'production' ? error.message : undefined });
    }

    // Handle common DB unique violation (race condition)
    if (error && error.code === '23505') {
      return res.status(400).json({ error: 'Phone number already registered' });
    }

    // Database connection issues
    if (error && (error.code === 'ECONNREFUSED' || /connect/i.test(error.message || ''))) {
      return res.status(503).json({ error: 'Database unavailable, please try again later' });
    }

    // Generic failure — include details in non-production for debugging
    const resp = { error: 'Registration failed' };
    if (process.env.NODE_ENV !== 'production' && error && error.message) {
      resp.details = error.message;
    }
    return res.status(500).json(resp);
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    const user = await User.findByPhone(phone);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid admin password' });
    }

    const token = jwt.sign(
      { id: 'admin', phone: 'admin', role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Admin login successful',
      user: { id: 'admin', name: 'Admin', phone: 'admin', role: 'admin' },
      token,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Admin login failed' });
  }
};
