import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/draws — list all draws
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM draws ORDER BY draw_date DESC');
    // Parse winning_numbers from JSON string if needed
    const draws = rows.map(d => ({
      ...d,
      winning_numbers: typeof d.winning_numbers === 'string' ? JSON.parse(d.winning_numbers) : d.winning_numbers
    }));
    res.json(draws);
  } catch (err) {
    console.error('Get draws error:', err);
    res.status(500).json({ error: 'Failed to fetch draws.' });
  }
});

// POST /api/draws/simulate — admin: run a draw simulation
router.post('/simulate', async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({ error: 'Admin access required.' });
    }

    const { prize_pool_total } = req.body;
    const pool_amount = parseFloat(prize_pool_total) || 5000;

    // Generate 5 random winning numbers between 1-45
    const winning = [];
    while (winning.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1;
      if (!winning.includes(n)) winning.push(n);
    }
    winning.sort((a, b) => a - b);

    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO draws (id, draw_date, winning_numbers, prize_pool_total, is_published) VALUES (?, NOW(), ?, ?, TRUE)',
      [id, JSON.stringify(winning), pool_amount]
    );

    res.status(201).json({
      id,
      draw_date: new Date().toISOString(),
      winning_numbers: winning,
      prize_pool_total: pool_amount,
      is_published: true
    });
  } catch (err) {
    console.error('Simulate draw error:', err);
    res.status(500).json({ error: 'Failed to simulate draw.' });
  }
});

export default router;
