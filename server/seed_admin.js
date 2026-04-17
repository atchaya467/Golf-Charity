import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import pool from './db.js';

async function seedAdmin() {
  try {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    console.log(`Seeding admin user: ${email}`);

    // Check if user already exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const id = crypto.randomUUID();
    const password_hash = await bcrypt.hash(password, 12);

    await pool.query(
      'INSERT INTO users (id, email, password_hash, subscription_status, charity_id, charity_percent, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, email, password_hash, 'active', null, 10, true]
    );

    console.log('Admin user successfully created!');
  } catch (err) {
    console.error('Error seeding admin user:', err);
  } finally {
    process.exit(0);
  }
}

seedAdmin();
