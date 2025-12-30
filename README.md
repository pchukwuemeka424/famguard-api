# FamGuard - Account Management System

Node.js application for managing FamGuard user accounts with Supabase PostgreSQL database.

## Features

- Delete user accounts by email
- Privacy policy page
- Database inspection tools
- Row Level Security (RLS) policy setup
- Automatic connection pooler support
- Improved error handling and logging

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
USERS_TABLE=users
PORT=3000
NODE_ENV=development
```

**Important:** Use the **connection pooler** format (port 6543) instead of direct connection (port 5432) to avoid DNS errors. See `GET_CONNECTION_STRING.md` for detailed instructions.

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
- `/health` - Health check endpoint

## Project Structure

```
famGuard/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── db.js                 # Simple database connection using .env
├── server.js             # Main Express server (local development)
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── routes/               # Express routes
│   ├── deleteAccount.js
│   ├── privacyPolicy.js
│   ├── checkDatabase.js
│   └── setupPolicy.js
├── views/                # EJS templates
│   ├── delete_account.ejs
│   ├── privacy_policy.ejs
│   ├── check_database.ejs
│   └── setup_policy.ejs
└── public/               # Static files
    └── logo.png
```

## Technologies

- Node.js
- Express.js
- PostgreSQL (via postgres package)
- EJS (templating)
- dotenv (environment variables)

## Database Connection

The application uses a simple database connection that reads from `.env`:
- Reads `DATABASE_URL` from `.env` file
- Simple and straightforward connection setup
- Basic error handling and graceful shutdown

**Make sure your `.env` file has the correct `DATABASE_URL`.** See `GET_CONNECTION_STRING.md` for detailed instructions on getting the correct connection string from Supabase.

## Error Handling

The application includes improved error handling:
- User-friendly error messages
- Detailed logging for debugging
- Graceful error recovery
- Connection retry logic

## Deployment

### Vercel Deployment

This project is configured for Vercel deployment. See `VERCEL_DEPLOY.md` for detailed instructions.

Quick deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel Dashboard

### Environment Variables for Vercel

Set these in Vercel Dashboard:
- `DATABASE_URL` - PostgreSQL connection string (use pooler format!)
- `USERS_TABLE` - Database table name (default: users)
- `NODE_ENV` - Set to `production`

## Troubleshooting

### Database Connection Errors

If you see `getaddrinfo ENOTFOUND` errors:
1. Ensure you're using the connection pooler format (port 6543)
2. Check your `.env` file has the correct `DATABASE_URL`
3. Verify your Supabase project is active
4. See `GET_CONNECTION_STRING.md` for detailed help

### Common Issues

- **DNS errors**: Use connection pooler instead of direct connection
- **Authentication failed**: Check your password in the connection string
- **Table not found**: Ensure your database has the required tables

## License

ISC
