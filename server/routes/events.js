import express from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY event_date ASC');
    res.json(rows);
  } catch (err) {
    console.error('Fetch events error:', err);
    res.status(500).json({ error: 'Failed to fetch events.' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Fetch event error:', err);
    res.status(500).json({ error: 'Failed to fetch event.' });
  }
});

// Register for an event
router.post('/:id/register', verifyToken, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if event exists
    const [events] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (events.length === 0) return res.status(404).json({ error: 'Event not found.' });

    // Check if already registered
    const [existing] = await pool.query(
      'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );
    if (existing.length > 0) return res.status(400).json({ error: 'Already registered for this event.' });

    // Mock Stripe registration (skipping actual Stripe logic for now to ensure flow works)
    const registrationId = crypto.randomUUID();
    await pool.query(
      'INSERT INTO registrations (id, user_id, event_id, payment_status) VALUES (?, ?, ?, ?)',
      [registrationId, userId, eventId, 'completed'] // Auto-complete for now
    );

    res.json({ message: 'Successfully registered for event.', registrationId });
  } catch (err) {
    console.error('Register event error:', err);
    res.status(500).json({ error: 'Failed to register for event.' });
  }
});

export default router;
