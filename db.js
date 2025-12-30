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
        
        if (error.message.includes('Tenant or user not found') || error.message.includes('password authentication failed') || error.message.includes('Authentication failed')) {
            try {
                const url = new URL(connectionString);
                const isPooler = url.hostname.includes('pooler');
                const username = url.username;
                const port = url.port;
                
                let errorMsg = 'Database connection error: Authentication failed.\n\n';
                errorMsg += '🔍 Connection String Analysis:\n';
                errorMsg += `- Hostname: ${url.hostname}\n`;
                errorMsg += `- Username: ${username}\n`;
                errorMsg += `- Port: ${port}\n`;
                errorMsg += `- Is Pooler: ${isPooler ? 'Yes ✓' : 'No ✗'}\n\n`;
                
                // Check for common issues
                const issues = [];
                if (!isPooler) {
                    issues.push('❌ Not using connection pooler (should use port 6543)');
                }
                if (port !== '6543' && isPooler) {
                    issues.push(`❌ Wrong port (should be 6543, got ${port})`);
                }
                if (!username.includes('.')) {
                    issues.push('❌ Username missing project ref (should be postgres.[project-ref])');
                }
                if (username === 'postgres') {
                    issues.push('❌ Username is just "postgres" - needs to be "postgres.[project-ref]"');
                }
                
                if (issues.length > 0) {
                    errorMsg += '⚠️  Issues Found:\n';
                    issues.forEach(issue => errorMsg += `${issue}\n`);
                    errorMsg += '\n';
                }
                
                errorMsg += '✅ How to Fix:\n';
                errorMsg += '1. Go to Supabase Dashboard > Settings > Database\n';
                errorMsg += '2. Select "Connection pooling" tab (NOT "Direct connection")\n';
                errorMsg += '3. Select "Transaction" mode\n';
                errorMsg += '4. Copy the EXACT connection string (don\'t modify it)\n';
                errorMsg += '5. For Vercel: Go to Settings > Environment Variables\n';
                errorMsg += '6. Update DATABASE_URL with the copied string\n';
                errorMsg += '7. Redeploy your application\n';
                
                throw new Error(errorMsg);
            } catch (urlError) {
                // If we can't parse the URL, provide generic error
                throw new Error('Database connection error: Authentication failed. Please verify your DATABASE_URL is correctly set in Vercel environment variables. Get the exact connection string from Supabase Dashboard > Settings > Database > Connection string (Connection pooling mode).');
            }
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
