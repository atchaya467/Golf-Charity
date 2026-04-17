import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log('🚀 Starting Cloud Database Migration...');
  
  try {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon, but filter out empty strings and comments
    const queries = schemaSql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    console.log(`\nFound ${queries.length} queries to execute.`);

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const snippet = query.substring(0, 50).replace(/\n/g, ' ') + '...';
      console.log(`[${i + 1}/${queries.length}] Executing: ${snippet}`);
      
      await pool.query(query);
    }

    console.log('\n✅ Migration successful! All tables and seed data created.');
  } catch (err) {
    console.error('\n❌ Migration failed!');
    console.error('Error:', err.message);
    if (err.sql) console.error('Last attempted SQL:', err.sql.substring(0, 100));
  } finally {
    process.exit(0);
  }
}

migrate();
