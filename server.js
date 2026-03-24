import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const app = new Hono();
const port = parseInt(process.env.PORT || '3000');

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use('*', cors());

// Serve index.html as the root
app.get('/', serveStatic({ path: './index.html' }));

// Serve other static files
app.use('*', serveStatic({ root: './' }));

// Get PLC data
app.get('/api/data', async (c) => {
  try {
    const result = await pool.query('SELECT * FROM plc_data WHERE id = 1');
    return c.json(result.rows[0] || {});
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Database error' }, 500);
  }
});

// Save PLC data
app.post('/api/save', async (c) => {
  const data = await c.req.json();
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  if (fields.length === 0) {
    return c.json({ error: 'No data provided' }, 400);
  }

  try {
    // Generate SET clause for UPDATE
    const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ');
    const query = `UPDATE plc_data SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`;
    
    await pool.query(query, values);
    return c.json({ message: 'Saved successfully!' });
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Database error: ' + err.message }, 500);
  }
});

console.log(`PLC Backend (Hono) running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
