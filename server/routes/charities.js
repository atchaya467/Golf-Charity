import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/charities — list all active charities
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM charities WHERE active_status = TRUE'
    );
    res.json(rows);
  } catch (_err) {
    console.error('Get charities error:', err);
    res.status(500).json({ error: 'Failed to fetch charities.' });
  }
});

// PUT /api/charities/select — user selects a charity + percent
router.put('/select', async (req, res) => {
  try {
    const { charity_id, charity_percent } = req.body;
    const pct = parseFloat(charity_percent);
    if (!charity_id || isNaN(pct) || pct < 10 || pct > 100) {
      return res.status(400).json({ error: 'Valid charity_id and charity_percent (10-100) required.' });
    }

    await pool.query(
      'UPDATE users SET charity_id = ?, charity_percent = ? WHERE id = ?',
      [charity_id, pct, req.user.id]
    );

    const [rows] = await pool.query(
      'SELECT id, email, subscription_status, charity_id, charity_percent, is_admin, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    res.json(rows[0]);
  } catch (_err) {
    console.error('Select charity error:', err);
    res.status(500).json({ error: 'Failed to update charity selection.' });
  }
});

export default router;
