const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 12345678,
  port: 5432,
  idleTimeoutMillis: 30000,
});

pool.connect();
console.log("Port is: ", process.env.DB_PORT)
pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err.message);
});

module.exports = pool;
