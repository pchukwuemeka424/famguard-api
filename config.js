/**
 * Database Configuration
 * 
 * Note: For production, use environment variables
 */

require('dotenv').config();

// Parse database URL into connection parameters
function getDatabaseConfig() {
    // Read from .env file (loaded via dotenv.config() above)
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
        throw new Error('DATABASE_URL is not set in environment variables. Please check your .env file.');
    }
    
    console.log('Using DATABASE_URL from .env file');
    
    try {
        const url = new URL(databaseUrl);
        
        // Handle connection pooler format: postgres.[project-ref]@host
        let username = url.username;
        if (username.includes('.')) {
            // Connection pooler format: postgres.projectref
            username = username.split('.')[0]; // Extract 'postgres' part
        }
        
        return {
            host: url.hostname,
            port: parseInt(url.port) || 5432,
            database: url.pathname.slice(1) || 'postgres', // Remove leading '/'
            user: username,
            password: url.password,
            // Add SSL for Supabase
            ssl: {
                rejectUnauthorized: false
            }
        };
    } catch (error) {
        console.error('Error parsing DATABASE_URL:', error.message);
        throw new Error('Invalid DATABASE_URL format');
    }
}

// Database table name
const USERS_TABLE = process.env.USERS_TABLE || 'users';

module.exports = {
    getDatabaseConfig,
    USERS_TABLE
};

