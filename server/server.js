import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/scores.js';
import charityRoutes from './routes/charities.js';
import drawRoutes from './routes/draws.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';
import donationRoutes from './routes/donations.js';
import { verifyToken } from './middleware/auth.js';

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
app.use('/api/users', userRoutes); 
app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);

// Protected: get current user profile
app.get('/api/me', verifyToken, async (req, res) => {
  const { default: pool } = await import('./db.js');
  try {
    const [rows] = await pool.query(`
      SELECT 
        id, email, subscription_status, charity_id, charity_percent, is_admin, created_at,
        (SELECT COALESCE(SUM(amount), 0) FROM donations WHERE user_id = users.id AND status = 'completed') as total_donated,
        (SELECT COUNT(*) FROM registrations WHERE user_id = users.id AND payment_status = 'completed') as events_joined
      FROM users 
      WHERE id = ?
    `, [req.user.id]);
    
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    
    const user = rows[0];
    // Calculate impact score: 1pt per $10 donated + 10pts per event joined
    const impact_score = Math.floor((Number(user.total_donated) / 10) + (user.events_joined * 10));
    
    res.json({
      ...user,
      stats: {
        total_donated: Number(user.total_donated),
        events_joined: user.events_joined,
        impact_score
      }
    });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Start server only if not in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 Golf Charity API running on http://localhost:${PORT}\n`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ ERROR: Port ${PORT} is already in use. Please stop the existing process and try again.\n`);
    } else {
      console.error('\n❌ Server error:', err);
    }
    process.exit(1);
  });
}

export default app;
