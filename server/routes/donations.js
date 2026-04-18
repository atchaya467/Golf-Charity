import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Publicly available to check donation summary or impact
router.get('/impact', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) as total_donations, 
        SUM(amount) as total_raised,
        COUNT(DISTINCT user_id) as donor_count
      FROM donations 
      WHERE status = 'completed'
    `);
    res.json(rows[0]);
  } catch (err) {
    console.error('Impact fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch impact data.' });
  }
});

// Create a donation (authenticated or anonymous)
router.post('/', async (req, res) => {
  const { amount, charity_id, user_id, currency = 'USD' } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid donation amount.' });
  }

  try {
    const donationId = crypto.randomUUID();
    
    // In a real app, this is where we would create a Stripe Payment Intent
    // For this implementation, we will mock a successful donation
    await pool.query(
      'INSERT INTO donations (id, user_id, charity_id, amount, currency, status, stripe_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [donationId, user_id || null, charity_id || null, amount, currency, 'completed', `ch_${crypto.randomBytes(12).toString('hex')}`]
    );

    res.json({ 
      message: 'Donation processed successfully. Thank you for your support!', 
      donationId,
      amount,
      currency
    });
  } catch (err) {
    console.error('Donation error:', err);
    res.status(500).json({ error: 'Failed to process donation.' });
  }
});

export default router;
