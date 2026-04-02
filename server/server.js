import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/scores.js';
import charityRoutes from './routes/charities.js';
import drawRoutes from './routes/draws.js';
import userRoutes from './routes/users.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Public auth routes
app.use('/api/auth', authRoutes);

// Protected routes (require JWT)
app.use('/api/scores', verifyToken, scoreRoutes);
app.use('/api/charities', verifyToken, charityRoutes);
app.use('/api/draws', verifyToken, drawRoutes);
app.use('/api/users', userRoutes); // Internally uses verifyToken/verifyAdmin

// Protected: get current user profile
app.get('/api/me', verifyToken, async (req, res) => {
  // Delegate to auth route handler — imported inline
  const { default: pool } = await import('./db.js');
  try {
    const [rows] = await pool.query(
      'SELECT id, email, subscription_status, charity_id, charity_percent, is_admin, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Start server only if not in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`\n🚀 Golf Charity API running on http://localhost:${PORT}\n`);
  });
}

export default app;
