import { Router } from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// Middleware to verify if the user is an admin
const verifyAdmin = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT is_admin FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0 || !rows[0].is_admin) {
      return res.status(403).json({ error: 'Access denied. Administrators only.' });
    }
    next();
  } catch (err) {
    console.error('Admin check error:', err);
    res.status(500).json({ error: 'Server error during admin check.' });
  }
};

// GET /api/users — get all users (Admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, email, subscription_status, charity_id, charity_percent, is_admin, created_at FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error('Get all users error:', err);
    res.status(500).json({ error: 'Failed to fetch user database.' });
  }
});

export default router;
