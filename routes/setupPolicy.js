const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { USERS_TABLE } = require('../config');

// GET setup policy page
router.get('/', async (req, res) => {
    const errors = [];
    const successes = [];
    const warnings = [];
    const info = [];
    
    try {
        // Check if users table exists
        const tableCheck = await query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = $1
            )
        `, [USERS_TABLE]);
        
        const tableExists = tableCheck.rows[0].exists;
        
        if (!tableExists) {
            errors.push(`Table '${USERS_TABLE}' does not exist. Please create it first or update USERS_TABLE in config.js`);
        } else {
            info.push(`Table '${USERS_TABLE}' found.`);
            
            // Check if RLS is enabled
            const rlsCheck = await query(`
                SELECT relrowsecurity FROM pg_class WHERE relname = $1
            `, [USERS_TABLE]);
            
            const rlsEnabled = rlsCheck.rows[0]?.relrowsecurity || false;
            
            if (!rlsEnabled) {
                try {
                    await query(`ALTER TABLE ${USERS_TABLE} ENABLE ROW LEVEL SECURITY`);
                    successes.push(`Row Level Security (RLS) has been enabled on the '${USERS_TABLE}' table.`);
                } catch (err) {
                    errors.push(`Failed to enable RLS: ${err.message}`);
                }
            } else {
                info.push(`Row Level Security (RLS) is already enabled on the '${USERS_TABLE}' table.`);
            }
            
            // Check if delete policy already exists
            const policyCheck = await query(`
                SELECT EXISTS (
                    SELECT 1 FROM pg_policies 
                    WHERE schemaname = 'public' 
                    AND tablename = $1 
                    AND policyname = 'allow_delete_by_email'
                )
            `, [USERS_TABLE]);
            
            const policyExists = policyCheck.rows[0].exists;
            
            if (policyExists) {
                try {
                    await query(`DROP POLICY IF EXISTS allow_delete_by_email ON ${USERS_TABLE}`);
                    warnings.push("Existing policy 'allow_delete_by_email' was removed.");
                } catch (err) {
                    errors.push(`Failed to drop existing policy: ${err.message}`);
                }
            }
            
            // Create delete policy
            try {
                await query(`
                    CREATE POLICY allow_delete_by_email ON ${USERS_TABLE}
                    FOR DELETE
                    USING (true)
                `);
                successes.push("Delete policy 'allow_delete_by_email' created successfully. This allows deletion of any user record (for account deletion functionality).");
            } catch (err) {
                errors.push(`Failed to create delete policy: ${err.message}`);
            }
        }
    } catch (err) {
        errors.push(`Database error: ${err.message}`);
    }
    
    res.render('setup_policy', {
        errors,
        successes,
        warnings,
        info,
        USERS_TABLE
    });
});

module.exports = router;

