const { Pool } = require('pg');
const { getDatabaseConfig } = require('./config');

// Create PostgreSQL connection pool
const pool = new Pool(getDatabaseConfig());

// Test connection
pool.on('connect', () => {
    console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Get database connection
async function getDatabaseConnection() {
    return pool;
}

// Execute query helper
async function query(text, params) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Query error', { text, error: error.message });
        throw error;
    }
}

module.exports = {
    pool,
    getDatabaseConnection,
    query
};

