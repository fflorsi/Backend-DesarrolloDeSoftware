import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_HOST_USER || 'dsw',
  password: process.env.DB_HOST_PASSWORD || 'dsw',
  database: process.env.DB_HOST_NAME || 'heroclash4geeks',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})