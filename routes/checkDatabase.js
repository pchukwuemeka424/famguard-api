const express = require('express');
const router = express.Router();
const { query } = require('../db');
require('dotenv').config();

const USERS_TABLE = process.env.USERS_TABLE || 'users';

// GET database check page
router.get('/', async (req, res) => {
    try {
        // Get all tables
        const tablesResult = await query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name
        `);
        
        const tables = tablesResult.rows;
        
        // Get table details
        const tableDetails = [];
        for (const table of tables) {
            const tableName = table.table_name;
            
            try {
                // Get row count
                const countResult = await query(`SELECT COUNT(*) as count FROM "${tableName}"`);
                const count = parseInt(countResult.rows[0]?.count || 0);
                
                // Get columns
                const columnsResult = await query(`
                    SELECT 
                        column_name,
                        data_type,
                        character_maximum_length,
                        is_nullable,
                        column_default
                    FROM information_schema.columns
                    WHERE table_schema = 'public' 
                    AND table_name = $1
                    ORDER BY ordinal_position
                `, [tableName]);
                
                // Get sample data
                const sampleResult = await query(`SELECT * FROM "${tableName}" LIMIT 5`);
                
                tableDetails.push({
                    name: tableName,
                    count,
                    columns: columnsResult.rows || [],
                    sample: sampleResult.rows || []
                });
            } catch (tableErr) {
                console.error(`Error getting details for table ${tableName}:`, tableErr.message);
                tableDetails.push({
                    name: tableName,
                    count: 0,
                    columns: [],
                    sample: [],
                    error: tableErr.message
                });
            }
        }
        
        // Check compatibility
        const usersTableExists = tables.some(t => 
            t.table_name.toLowerCase() === 'users' || t.table_name.toLowerCase() === 'user'
        );
        
        let emailColumnExists = false;
        if (usersTableExists) {
            const usersTable = tableDetails.find(t => 
                t.name.toLowerCase() === 'users' || t.name.toLowerCase() === 'user'
            );
            if (usersTable) {
                emailColumnExists = usersTable.columns.some(c => 
                    c.column_name.toLowerCase() === 'email'
                );
            }
        }
        
        res.render('check_database', {
            tables: tableDetails,
            usersTableExists,
            emailColumnExists,
            USERS_TABLE
        });
    } catch (err) {
        console.error('Database check error:', err);
        
        let errorMessage = err.message;
        if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
            errorMessage = 'Database connection error. Please check your DATABASE_URL and ensure you are using the connection pooler format (port 6543).';
        }
        
        res.render('check_database', {
            error: errorMessage,
            tables: [],
            usersTableExists: false,
            emailColumnExists: false,
            USERS_TABLE
        });
    }
});

module.exports = router;
