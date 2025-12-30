require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set in environment variables. Please check your .env file.');
}

console.log('Connecting to database using postgres package...');
console.log('Connection string:', connectionString.replace(/:[^:@]+@/, ':****@')); // Hide password

// Parse connection string to extract components
const url = new URL(connectionString);
const isPooler = url.hostname.includes('pooler');

// Create postgres connection
// For connection pooler, use different format
const sql = postgres(connectionString, {
    ssl: {
        rejectUnauthorized: false
    },
    onnotice: () => {}, // Suppress notices
    connection: {
        application_name: 'famguard-api'
    },
    // Additional options for pooler connections
    max: 10, // Maximum number of connections
    idle_timeout: 20, // Idle timeout in seconds
    connect_timeout: 10 // Connection timeout in seconds
});

// Test connection
sql`SELECT 1`
    .then(() => {
        console.log('✓ Successfully connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('✗ Database connection error:', err.message);
    });

// Get database connection
async function getDatabaseConnection() {
    return sql;
}

// Execute query helper (for compatibility with existing code)
// Converts $1, $2 parameterized queries to postgres template literal format
async function query(text, params) {
    const start = Date.now();
    try {
        let result;
        
        if (params && params.length > 0) {
            // Convert $1, $2, etc. to postgres template literal format
            // Build template parts and values array
            const parts = [];
            const values = [];
            let lastIndex = 0;
            
            // Find all $1, $2, etc. placeholders
            const placeholderRegex = /\$(\d+)/g;
            let match;
            
            while ((match = placeholderRegex.exec(text)) !== null) {
                const placeholderIndex = parseInt(match[1]) - 1; // Convert $1 to index 0
                
                // Add text before placeholder
                parts.push(text.substring(lastIndex, match.index));
                
                // Add parameter value
                if (placeholderIndex < params.length) {
                    values.push(params[placeholderIndex]);
                } else {
                    throw new Error(`Parameter $${match[1]} is out of range`);
                }
                
                lastIndex = match.index + match[0].length;
            }
            
            // Add remaining text
            parts.push(text.substring(lastIndex));
            
            // Execute using postgres template literal syntax
            // The postgres library requires tagged template literals, which can't be created dynamically
            // We use sql.unsafe() with proper parameter substitution
            // Build the query string with parameter placeholders replaced safely
            let queryText = text;
            // Replace placeholders in reverse order to avoid $10 being replaced before $1
            for (let i = values.length - 1; i >= 0; i--) {
                const placeholder = `$${i + 1}`;
                const value = values[i];
                // Properly escape and format the value based on type
                let escapedValue;
                if (value === null || value === undefined) {
                    escapedValue = 'NULL';
                } else if (typeof value === 'string') {
                    // Escape single quotes by doubling them (PostgreSQL standard)
                    escapedValue = `'${value.replace(/'/g, "''")}'`;
                } else if (typeof value === 'number') {
                    escapedValue = value.toString();
                } else if (typeof value === 'boolean') {
                    escapedValue = value ? 'TRUE' : 'FALSE';
                } else {
                    // For other types, convert to string and escape
                    escapedValue = `'${String(value).replace(/'/g, "''")}'`;
                }
                // Replace all occurrences of this placeholder
                queryText = queryText.split(placeholder).join(escapedValue);
            }
            result = await sql.unsafe(queryText);
        } else {
            // Direct query without parameters
            result = await sql.unsafe(text);
        }
        
        const duration = Date.now() - start;
        console.log('Executed query', { text: text.substring(0, 100), duration, rows: result.length });
        
        return {
            rows: Array.isArray(result) ? result : [result],
            rowCount: Array.isArray(result) ? result.length : (result ? 1 : 0)
        };
    } catch (error) {
        console.error('Query error', { text: text.substring(0, 100), error: error.message });
        throw error;
    }
}

module.exports = {
    sql,
    getDatabaseConnection,
    query
};
