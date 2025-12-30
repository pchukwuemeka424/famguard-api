# Migration from PHP to Node.js

## Summary

The FamGuard project has been successfully migrated from PHP to Node.js/Express.

## Changes Made

### 1. Core Files Created
- `package.json` - Node.js dependencies and scripts
- `server.js` - Main Express server
- `config.js` - Database configuration (replaces config.php)
- `db.js` - PostgreSQL connection pool (replaces PDO)
- `.env` - Environment variables (replaces hardcoded config)

### 2. Routes Created (replaces PHP files)
- `routes/deleteAccount.js` - Replaces `delete_account.php`
- `routes/privacyPolicy.js` - Replaces `privacy_policy.php`
- `routes/checkDatabase.js` - Replaces `check_database.php`
- `routes/setupPolicy.js` - Replaces `setup_delete_policy.php`

### 3. Views Created (EJS templates)
- `views/delete_account.ejs` - Delete account form
- `views/privacy_policy.ejs` - Privacy policy page
- `views/check_database.ejs` - Database inspector
- `views/setup_policy.ejs` - Policy setup page

### 4. Static Files
- `public/logo.png` - Logo image (moved from root)

## URL Changes

| Old PHP URL | New Node.js URL |
|------------|----------------|
| `/delete_account.php` | `/delete-account` |
| `/privacy_policy.php` | `/privacy-policy` |
| `/check_database.php` | `/check-database` |
| `/setup_delete_policy.php` | `/setup-policy` |

## Installation & Running

1. Install dependencies:
```bash
npm install
```

2. Start server:
```bash
npm start
# or for development
npm run dev
```

3. Access at: `http://localhost:3000`

## Database

The database connection uses the same Supabase PostgreSQL database. No database changes required.

## Notes

- All PHP syntax has been converted to JavaScript/Node.js
- PDO has been replaced with `pg` (node-postgres)
- PHP templates converted to EJS templates
- All functionality preserved

