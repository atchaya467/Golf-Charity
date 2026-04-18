import pool from './server/db.js';

async function test() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ DB Query Success:', rows[0].result);
    process.exit(0);
  } catch (err) {
    console.error('❌ DB Query Failed:', err);
    process.exit(1);
  }
}

test();
