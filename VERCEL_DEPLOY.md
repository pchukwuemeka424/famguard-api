# Vercel Deployment Guide

## Prerequisites

1. Install Vercel CLI (if deploying via CLI):
```bash
npm i -g vercel
```

2. Or use Vercel Dashboard at https://vercel.com

## Environment Variables

Set these environment variables in Vercel Dashboard (Settings → Environment Variables):

```
DATABASE_URL=postgresql://postgres:eYHNPishBvzReZ6P@db.bbydsaxduuwbnwqmiant.supabase.co:5432/postgres
USERS_TABLE=users
NODE_ENV=production
```

## Deployment Methods

### Method 1: Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run vercel-build` (or leave empty)
   - Output Directory: (leave empty)
5. Add environment variables
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

## Important Notes

1. **Environment Variables**: Make sure to add all environment variables in Vercel Dashboard before deploying.

2. **Database Connection**: The PostgreSQL connection pool will work in Vercel's serverless environment, but connections may be reused across invocations.

3. **Static Files**: Static files in `public/` directory are served automatically by Vercel.

4. **View Engine**: EJS templates are compiled at runtime, which works fine with Vercel.

5. **Cold Starts**: First request may be slower due to serverless cold starts.

## Troubleshooting

- If you get database connection errors, check that `DATABASE_URL` is set correctly
- If routes don't work, verify `vercel.json` routing configuration
- Check Vercel function logs in the dashboard for errors

## Post-Deployment

After deployment, your app will be available at:
- `https://your-project-name.vercel.app`

You can also set up a custom domain in Vercel Dashboard.

