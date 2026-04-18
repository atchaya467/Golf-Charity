import pool from './db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function debug() {
  const email = 'admin@gmail.com';
  const password = 'admin123';
  const JWT_SECRET = process.env.JWT_SECRET || 'digital_heroes_dev_secret_change_in_prod';

  console.log('Testing login for:', email);
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      console.log('User not found.');
      return;
    }
    const user = rows[0];
    console.log('User found:', user.email);
    
    const valid = await bcrypt.compare(password, user.password_hash);
    console.log('Password valid:', valid);
    
    const token = jwt.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '7d' });
    console.log('Token generated:', token.substring(0, 10) + '...');
    
    console.log('✅ Login logic works fine in isolation.');
  } catch (err) {
    console.error('❌ Login logic FAILED:');
    console.error(err);
  } finally {
    process.exit(0);
  }
}

debug();
