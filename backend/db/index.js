const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Desarrollo123$',
  database: 'db-zip',
  port: 5432,
});

module.exports = pool;
