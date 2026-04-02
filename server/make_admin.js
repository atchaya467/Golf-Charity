import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from .env.production
dotenv.config({ path: path.join(__dirname, '../.env.production') });

async function setupAdmin() {
  const email = 'admin@gmail.com';
  const password = 'admin123';

  console.log(`\n--- 🔑 Setting up Admin: ${email} ---\n`);

  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
    database: process.env.DB_NAME || 'defaultdb',
    port: process.env.DB_PORT || 25060,
    ssl: { rejectUnauthorized: false }
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to Aiven MySQL!');

    const passwordHash = await bcrypt.hash(password, 12);

    // Check if user exists
    const [rows] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
      // Update existing user
      console.log('Updating existing user to Admin with password "admin"...');
      await connection.query(
        'UPDATE users SET password_hash = ?, is_admin = TRUE WHERE email = ?',
        [passwordHash, email]
      );
      console.log('🌟 SUCCESS! User updated.');
    } else {
      // Create new user
      console.log('Creating NEW Admin user with password "admin"...');
      const id = crypto.randomUUID();
      await connection.query(
        'INSERT INTO users (id, email, password_hash, is_admin) VALUES (?, ?, ?, TRUE)',
        [id, email, passwordHash]
      );
      console.log('🌟 SUCCESS! Admin user created.');
    }

    await connection.end();
  } catch (err) {
    console.error('\n❌ FAILED!');
    console.error('Error:', err.message);
  }
  console.log('\n-----------------------------------\n');
}

setupAdmin();
