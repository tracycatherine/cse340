const { Pool } = require("pg")
require("dotenv").config()

let pool;

// Check if we're using a remote database URL or local connection
if (process.env.DATABASE_URL) {
  // For remote databases (like Render)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  // For local development
  pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'cse340',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5433,
    ssl: false
  })
}

// Test the connection
pool.on('connect', () => {
  console.log('Connected to the database successfully')
})

pool.on('error', (err) => {
  console.error('Database connection error:', err)
})

module.exports = pool