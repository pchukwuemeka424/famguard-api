# Vercel Deployment Guide

## Prerequisites

1. Install Vercel CLI (if deploying via CLI):
```bash
npm i -g vercel
```

2. Or use Vercel Dashboard at https://vercel.com

## Environment Variables

**CRITICAL:** Set these environment variables in Vercel Dashboard (Settings → Environment Variables):

```
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
USERS_TABLE=users
NODE_ENV=production
```

### Important Notes:
- **Use Connection Pooler format** (port 6543) - NOT direct connection (port 5432)
- **Username format must be:** `postgres.[project-ref]` (e.g., `postgres.bbydsaxduuwbnwqmiant`)
- Get the exact connection string from: Supabase Dashboard > Settings > Database > Connection string (Connection pooling mode)

## Deployment Methods

### Method 1: Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run vercel-build` (or leave empty)
   - Output Directory: (leave empty)
5. **IMPORTANT:** Add environment variables:
   - Click "Environment Variables"
   - Add `DATABASE_URL` with your connection string
   - Add `USERS_TABLE=users`
   - Add `NODE_ENV=production`
6. Click "Deploy"

### Method 2: Vercel CLI

1. Login to Vercel:
```bash
vercel login
```

2. Deploy:
```bash
vercel
```

3. For production:
```bash
vercel --prod
```

**Note:** You still need to add environment variables in Vercel Dashboard even when using CLI.

## Project Structure

```
famGuard/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── routes/               # Express routes
├── views/                # EJS templates
├── public/               # Static files
├── vercel.json           # Vercel configuration
└── package.json
```

## Troubleshooting Database Connection Errors

### Error: "Database connection error. Please check the server configuration."

**Common causes and solutions:**

1. **DATABASE_URL not set in Vercel**
   - Go to Vercel Dashboard > Your Project > Settings > Environment Variables
   - Add `DATABASE_URL` with your connection string
   - Redeploy the application

2. **Wrong connection string format**
   - Must use connection pooler format (port 6543)
   - Username must be `postgres.[project-ref]` not just `postgres`
   - Get the correct string from Supabase Dashboard

3. **Connection string from wrong source**
   - Don't manually construct it
   - Copy it directly from: Supabase Dashboard > Settings > Database > Connection string
   - Select "Connection pooling" mode, not "Direct connection"

4. **Check Vercel logs**
   - Go to Vercel Dashboard > Your Project > Functions
   - Click on a function to see logs
   - Look for database connection errors

### Error: "Authentication failed"

- Verify your password is correct in the connection string
- Check that the project reference in username matches your Supabase project
- Ensure you copied the connection string correctly (no extra spaces or characters)

### Error: "Could not resolve database hostname"

- Use connection pooler format (port 6543) instead of direct connection (port 5432)
- Verify the hostname in your connection string is correct

## Important Notes

1. **Environment Variables**: Must be set in Vercel Dashboard before deployment. They are NOT read from `.env` file in production.

2. **Database Connection**: The connection is created lazily (on first query) which is better for serverless environments.

3. **Static Files**: Static files in `public/` directory are served automatically by Vercel.

4. **View Engine**: EJS templates are compiled at runtime, which works fine with Vercel.

5. **Cold Starts**: First request may be slower due to serverless cold starts.

6. **Connection Pooling**: Uses max 1 connection per function instance (optimal for serverless).

## Post-Deployment

After deployment, your app will be available at:
- `https://your-project-name.vercel.app`

You can also set up a custom domain in Vercel Dashboard.

## Verifying Deployment

1. Visit your deployed URL
2. Check `/check-database` route to verify database connection
3. Check Vercel function logs for any errors
4. Test the `/delete-account` route to ensure everything works

## Getting Help

If you continue to have issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure your connection string uses the pooler format
4. Test the connection string locally first
