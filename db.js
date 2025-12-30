require('dotenv').config();
const postgres = require('postgres');

// Get connection string from .env
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('⚠️  DATABASE_URL is not set in environment variables');
    // Don't throw error at module load - let it fail gracefully when query is called
}

// Lazy connection - only create when needed (better for serverless)
let sql = null;

function getConnection() {
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set. Please configure it in your environment variables.');
    }
    
    if (!sql) {
        console.log('Creating database connection...');
        sql = postgres(connectionString, {
            ssl: {
                rejectUnauthorized: false
            },
            max: 1, // Use 1 connection for serverless (Vercel)
            idle_timeout: 20,
            connect_timeout: 30,
            max_lifetime: 60 * 30 // 30 minutes
        });
        
        // Test connection
        sql`SELECT 1`
            .then(() => {
                console.log('✓ Database connected');
            })
            .catch((err) => {
                console.error('✗ Database connection error:', err.message);
                // Don't throw - connection will be retried on next query
            });
    }
    
    return sql;
}

// Query helper function
async function query(text, params) {
    try {
        const connection = getConnection();
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
            result = await connection.unsafe(queryText);
        } else {
            result = await connection.unsafe(text);
        }
        
        return {
            rows: Array.isArray(result) ? result : [result],
            rowCount: Array.isArray(result) ? result.length : (result ? 1 : 0)
        };
    } catch (error) {
        console.error('Query error:', error.message);
        
        // Provide helpful error messages
        if (error.message.includes('DATABASE_URL is not set')) {
            throw new Error('Database connection error: DATABASE_URL environment variable is not configured. Please set it in your Vercel project settings.');
        }
        
        if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            throw new Error('Database connection error: Could not resolve database hostname. Please check your DATABASE_URL and ensure you are using the connection pooler format (port 6543).');
        }
        
        if (error.message.includes('Tenant or user not found') || error.message.includes('password authentication failed')) {
            const url = new URL(connectionString);
            const isPooler = url.hostname.includes('pooler');
            const username = url.username;
            
            let errorMsg = 'Database connection error: Authentication failed.\n\n';
            errorMsg += 'Possible issues:\n';
            errorMsg += '1. Wrong region in connection string (us-east-1 might not be correct)\n';
            errorMsg += '2. Username format might be incorrect\n';
            errorMsg += '3. Connection string might need to be copied directly from Supabase Dashboard\n\n';
            errorMsg += 'Current connection string format:\n';
            errorMsg += `- Hostname: ${url.hostname}\n`;
            errorMsg += `- Username: ${username}\n`;
            errorMsg += `- Port: ${url.port}\n\n`;
            errorMsg += 'To fix:\n';
            errorMsg += '1. Go to Supabase Dashboard > Settings > Database\n';
            errorMsg += '2. Select "Connection pooling" mode\n';
            errorMsg += '3. Copy the EXACT connection string (don\'t modify it)\n';
            errorMsg += '4. Update DATABASE_URL in your .env file or Vercel environment variables';
            
            throw new Error(errorMsg);
        }
        
        throw error;
    }
}

// Graceful shutdown (for non-serverless environments)
if (typeof process !== 'undefined') {
    process.on('SIGINT', async () => {
        if (sql) {
            await sql.end();
        }
        process.exit(0);
    });

    process.on('SIGTERM', async () => {
        if (sql) {
            await sql.end();
        }
        process.exit(0);
    });
}

module.exports = {
    get sql() {
        return getConnection();
    },
    query
};
