import pool from './server/db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function setup() {
  try {
    const email = 'admin@gmail.com';
    const password = 'admin123';
    
    // Check if table exists
    const [rows] = await pool.query("SHOW TABLES LIKE 'users'");
    if (rows.length === 0) {
      console.log('Creating users table...');
      await pool.query(`
        CREATE TABLE users (
          id VARCHAR(36) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          is_admin BOOLEAN DEFAULT FALSE,
          subscription_status VARCHAR(50) DEFAULT 'trial',
          charity_id VARCHAR(36),
          charity_percent INT DEFAULT 10,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }

    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const passwordHash = await bcrypt.hash(password, 12);

    if (existing.length > 0) {
      console.log('Updating existing admin user...');
      await pool.query(
        'UPDATE users SET password_hash = ?, is_admin = TRUE WHERE email = ?',
        [passwordHash, email]
      );
    } else {
      console.log('Creating new admin user...');
      await pool.query(
        'INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, TRUE)',
        [crypto.randomUUID(), email, passwordHash]
      );
    }
    console.log('✅ Admin account ready!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  }
}

setup();
