import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/scores — get current user's last 5 scores
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, user_id, score_value, date_created FROM scores WHERE user_id = ? ORDER BY date_created DESC LIMIT 5',
      [req.user.id]
    );
    res.json(rows);
  } catch (_err) {
    console.error('Get scores error:', _err);
    res.status(500).json({ error: 'Failed to fetch scores.' });
  }
});

// POST /api/scores — add a new score (FIFO: keep only 5)
router.post('/', async (req, res) => {
  try {
    const { score_value } = req.body;
    const val = parseInt(score_value, 10);
    if (isNaN(val) || val < 1 || val > 45) {
      return res.status(400).json({ error: 'Score must be between 1 and 45.' });
    }

    // Count existing scores
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as cnt FROM scores WHERE user_id = ?',
      [req.user.id]
    );
    const count = countResult[0].cnt;

    // If already 5, delete the oldest
    if (count >= 5) {
      await pool.query(
        'DELETE FROM scores WHERE id = (SELECT id FROM (SELECT id FROM scores WHERE user_id = ? ORDER BY date_created ASC LIMIT 1) AS oldest)',
        [req.user.id]
      );
    }

    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO scores (id, user_id, score_value) VALUES (?, ?, ?)',
      [id, req.user.id, val]
    );

    // Return the updated list
    const [rows] = await pool.query(
      'SELECT id, user_id, score_value, date_created FROM scores WHERE user_id = ? ORDER BY date_created DESC LIMIT 5',
      [req.user.id]
    );
    res.status(201).json(rows);
  } catch (_err) {
    console.error('Add score error:', _err);
    res.status(500).json({ error: 'Failed to add score.' });
  }
});

export default router;
