/**
 * Database Configuration
 * 
 * Note: For production, use environment variables
 */

require('dotenv').config();

// Parse database URL into connection parameters
function getDatabaseConfig() {
    const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:eYHNPishBvzReZ6P@db.bbydsaxduuwbnwqmiant.supabase.co:5432/postgres';
    const url = new URL(databaseUrl);
    
    return {
        host: url.hostname,
        port: url.port || 5432,
        database: url.pathname.slice(1), // Remove leading '/'
        user: url.username,
        password: url.password
    };
}

// Database table name
const USERS_TABLE = process.env.USERS_TABLE || 'users';

module.exports = {
    getDatabaseConfig,
    USERS_TABLE
};

