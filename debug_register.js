import pool from './server/db.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function testRegister() {
  const email = 'arunmozhivasa@gmail.com';
  const password = 'password123';
  
  try {
    console.log(`Checking if user exists: ${email}`);
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('User already exists in DB.');
    } else {
      console.log('User does not exist. Attempting insert...');
      const id = crypto.randomUUID();
      const password_hash = await bcrypt.hash(password, 12);
      
      await pool.query(
        'INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)',
        [id, email, password_hash]
      );
      console.log('Insert successful!');
    }
  } catch (err) {
    console.error('Registration Test Failed:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    if (err.sql) console.error('SQL State:', err.sqlState);
  } finally {
    process.exit(0);
  }
}

testRegister();
