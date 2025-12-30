# FamGuard - Account Management System

Node.js application for managing FamGuard user accounts with Supabase PostgreSQL database.

## Features

- Delete user accounts by email
- Privacy policy page
- Database inspection tools
- Row Level Security (RLS) policy setup

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
USERS_TABLE=users
PORT=3000
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Routes

- `/` - Redirects to delete account page
- `/delete-account` - Delete user account by email
- `/privacy-policy` - Privacy policy page
- `/check-database` - Database inspection tool
- `/setup-policy` - Setup RLS policies for user deletion

## Project Structure

```
famGuard/
├── api/
│   └── index.js      # Vercel serverless function entry point
├── config.js          # Database configuration
├── db.js             # Database connection pool
├── server.js         # Main Express server (local development)
├── vercel.json       # Vercel configuration
├── package.json      # Dependencies
├── routes/           # Express routes
│   ├── deleteAccount.js
│   ├── privacyPolicy.js
│   ├── checkDatabase.js
│   └── setupPolicy.js
├── views/            # EJS templates
│   ├── delete_account.ejs
│   └── privacy_policy.ejs
└── public/            # Static files
    └── logo.png
```

## Technologies

- Node.js
- Express.js
- PostgreSQL (via pg)
- EJS (templating)
- dotenv (environment variables)

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment. See `VERCEL_DEPLOY.md` for detailed instructions.

Quick deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel Dashboard

### Environment Variables for Vercel

Set these in Vercel Dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `USERS_TABLE` - Database table name (default: users)
- `NODE_ENV` - Set to `production`

## License

ISC

