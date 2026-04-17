import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import pool from '../db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    // Check if user already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const id = crypto.randomUUID();
    const password_hash = await bcrypt.hash(password, 12);

    await pool.query(
      'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)',
      [id, email, password_hash]
    );

    const token = signToken({ id, email, is_admin: false });
    const user = { id, email, subscription_status: 'trial', charity_id: null, charity_percent: 10, is_admin: false };

    res.status(201).json({ token, user });
  } catch (_err) {
    console.error('FULL Register error:', _err);
    // Log specific details if needed for internal debugging
    if (_err.code === 'ER_BAD_DB_ERROR') {
      console.error('Database connection issue detected during registration.');
    }
    res.status(500).json({ error: _err.message || 'Server error during registration.' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken({ id: user.id, email: user.email, is_admin: user.is_admin });
    const { password_hash, ...safeUser } = user;

    res.json({ token, user: safeUser });
  } catch (_err) {
    console.error('Login error:', _err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// GET /api/me  — get current user profile
router.get('/me', async (req, res) => {
  try {
    // This route uses auth middleware in server.js
    const [rows] = await pool.query(
      'SELECT id, email, subscription_status, charity_id, charity_percent, is_admin, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(rows[0]);
  } catch (_err) {
    console.error('Me error:', _err);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
