import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load carefully from .env.production
dotenv.config({ path: path.join(__dirname, '../.env.production') });

async function migrate() {
  console.log('\n--- ☁️ Aiven Cloud Migration ---\n');
  
  const config = {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER     || 'avnadmin',
    password: process.env.DB_PASSWORD || process.env.DB_PASS,
    database: process.env.DB_NAME     || 'defaultdb',
    port:     process.env.DB_PORT     || 25060,
    ssl:      { rejectUnauthorized: false } // Required for Aiven
  };

  if (!config.host || !config.password) {
    console.error('❌ ERROR: Aiven details are missing in .env.production!');
    console.log('Please fill in DB_HOST and DB_PASS first.');
    process.exit(1);
  }

  console.log('Connecting to:', config.host);

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to Aiven MySQL!');

    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon but ignore ones inside strings
    const statements = sql
      .split(/;(?=(?:[^']*'[^']*')*[^']*$)/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    console.log(`🚀 Running ${statements.length} SQL statements...`);

    for (const statement of statements) {
      await connection.query(statement);
    }

    console.log('\n🌟 SUCCESS! Your Aiven Database is now BUILT and ready.');
    console.log('You can now click "Deploy" in Vercel.');

    await connection.end();
  } catch (err) {
    console.error('\n❌ MIGRATION FAILED!');
    console.error('Error:', err.message);
    console.log('\n💡 Tip: Make sure your Aiven "IP Filter" is set to 0.0.0.0/0');
  }
  console.log('\n-----------------------------------\n');
}

migrate();
