const express = require('express');
const router = express.Router();
const { query } = require('../db');
require('dotenv').config();

const USERS_TABLE = process.env.USERS_TABLE || 'users';

// GET delete account page
router.get('/', (req, res) => {
    res.render('delete_account', {
        error: '',
        success: '',
        email: ''
    });
});

// POST delete account
router.post('/', async (req, res) => {
    const email = (req.body.email || '').trim();
    let error = '';
    let success = '';
    
    if (!email) {
        error = 'Please enter an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error = 'Please enter a valid email address.';
    } else {
        try {
            // Check if account exists
            const checkResult = await query(
                `SELECT id, email FROM ${USERS_TABLE} WHERE email = $1 LIMIT 1`,
                [email]
            );
            
            if (checkResult.rows.length === 0) {
                error = 'No account found with this email address.';
            } else {
                // Delete the account
                const deleteResult = await query(
                    `DELETE FROM ${USERS_TABLE} WHERE email = $1`,
                    [email]
                );
                
                if (deleteResult.rowCount > 0) {
                    success = 'Account successfully deleted.';
                } else {
                    error = 'Failed to delete account. Please try again.';
                }
            }
        } catch (err) {
            console.error('Database error:', err);
            
            // Provide user-friendly error messages
            if (err.message.includes('ENOTFOUND') || err.message.includes('getaddrinfo')) {
                error = 'Database connection error. Please check the server configuration.';
            } else if (err.message.includes('relation') && err.message.includes('does not exist')) {
                error = `Database table '${USERS_TABLE}' does not exist. Please create it first.`;
            } else {
                error = 'Database error: ' + err.message;
            }
        }
    }
    
    res.render('delete_account', {
        error,
        success,
        email: success ? '' : email
    });
});

module.exports = router;
