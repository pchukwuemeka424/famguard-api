require('dotenv').config();
const postgres = require('postgres');

// Get connection string from .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set in .env file');
}

console.log('Connecting to database...');

// Create postgres connection
const sql = postgres(connectionString, {
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idle_timeout: 20,
    connect_timeout: 30
});

// Test connection
sql`SELECT 1`
    .then(() => {
        console.log('✓ Database connected');
    })
    .catch((err) => {
        console.error('✗ Database connection error:', err.message);
    });

// Query helper function
async function query(text, params) {
    try {
        let result;
        
        if (params && params.length > 0) {
            // Replace $1, $2, etc. with actual values
            let queryText = text;
            for (let i = params.length - 1; i >= 0; i--) {
                const placeholder = `$${i + 1}`;
                const value = params[i];
                
                let escapedValue;
                if (value === null || value === undefined) {
                    escapedValue = 'NULL';
                } else if (typeof value === 'string') {
                    escapedValue = `'${value.replace(/'/g, "''")}'`;
                } else if (typeof value === 'number') {
                    escapedValue = value.toString();
                } else if (typeof value === 'boolean') {
                    escapedValue = value ? 'TRUE' : 'FALSE';
                } else {
                    escapedValue = `'${String(value).replace(/'/g, "''")}'`;
                }
                
                queryText = queryText.split(placeholder).join(escapedValue);
            }
            result = await sql.unsafe(queryText);
        } else {
            result = await sql.unsafe(text);
        }
        
        return {
            rows: Array.isArray(result) ? result : [result],
            rowCount: Array.isArray(result) ? result.length : (result ? 1 : 0)
        };
    } catch (error) {
        console.error('Query error:', error.message);
        throw error;
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    await sql.end();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await sql.end();
    process.exit(0);
});

module.exports = {
    sql,
    query
};
