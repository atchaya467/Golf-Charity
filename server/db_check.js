import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Handling __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
  console.log('\n--- 🛠️ Database Connection Check ---\n');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Password Length:', process.env.DB_PASS ? (process.env.DB_PASS.length + ' characters') : '0 (Empty)');
  console.log('Name:', process.env.DB_NAME);
  
  try {
    const connection = await mysql.createConnection({
      host:     process.env.DB_HOST     || 'localhost',
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
      database: process.env.DB_NAME     || 'digital_heroes',
      port:     process.env.DB_PORT     || 3306,
      ssl:      process.env.DB_HOST && !process.env.DB_HOST.includes('localhost') ? { rejectUnauthorized: false } : null,
    });
    console.log('\n✅ Successfully connected to the database!');
    
    const [rows] = await connection.query('SHOW TABLES');
    const tableNames = rows.map((r) => Object.values(r)[0]);
    console.log('Found ' + tableNames.length + ' tables: ' + tableNames.join(', '));
    
    if (tableNames.includes('users')) {
      const [userRows] = await connection.query('SELECT COUNT(*) as count FROM users');
      console.log('👥 Total Users in Database:', userRows[0].count);
    }
    
    if (tableNames.includes('charities')) {
      const [charityRows] = await connection.query('SELECT COUNT(*) as count FROM charities');
      console.log('💚 Total Charities in Database:', charityRows[0].count);
    }
    
    if (!tableNames.includes('users')) {
      console.warn('\n⚠️ WARNING: The "users" table is missing! Please run database/schema.sql.');
    }
    
    await connection.end();
  } catch (err) {
    console.error('\n❌ Connection FAILED!');
    console.error('Error Code:   ', err.code);
    console.error('Error Message:', err.message);
    
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Tip: The database "' + process.env.DB_NAME + '" does not exist. Please create it manually.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Tip: Access denied. Double-check your Password in the .env file.');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Tip: Connection refused. Is your MySQL server running?');
    }
  }
  console.log('\n------------------------------------\n');
}

check();
