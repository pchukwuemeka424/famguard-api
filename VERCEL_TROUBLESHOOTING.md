# Vercel Database Connection Troubleshooting

## Error: "Authentication failed. Please check your DATABASE_URL credentials in Vercel settings."

This error means Vercel cannot authenticate with your Supabase database. Follow these steps:

## Step 1: Verify Environment Variables in Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify `DATABASE_URL` exists and is set correctly

## Step 2: Get the EXACT Connection String from Supabase

**DO NOT manually construct the connection string.** Always copy it directly from Supabase:

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project: `bbydsaxduuwbnwqmiant`
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. **Select "Connection pooling" tab** (NOT "Direct connection")
6. Select **"Transaction"** mode
7. **Copy the ENTIRE connection string** - don't modify anything

The connection string should look like:
```
postgresql://postgres.bbydsaxduuwbnwqmiant:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

## Step 3: Update Vercel Environment Variables

1. In Vercel Dashboard → Settings → Environment Variables
2. Find `DATABASE_URL` or click **"Add New"**
3. **Key:** `DATABASE_URL`
4. **Value:** Paste the EXACT connection string from Supabase (step 2)
5. **Environment:** Select all (Production, Preview, Development)
6. Click **Save**

## Step 4: Redeploy

After updating environment variables:

1. Go to **Deployments** tab in Vercel
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## Step 5: Verify the Connection String Format

Your connection string must have:

✅ **Correct Format:**
- Username: `postgres.bbydsaxduuwbnwqmiant` (includes project ref)
- Port: `6543` (pooler port)
- Hostname: `aws-0-[REGION].pooler.supabase.com` (pooler hostname)
- Password: Your actual password

❌ **Wrong Formats:**
- Username: `postgres` (missing project ref) → Will cause "Tenant or user not found"
- Port: `5432` (direct connection) → May cause DNS errors
- Hostname: `db.bbydsaxduuwbnwqmiant.supabase.co` → Direct connection, not pooler

## Common Issues

### Issue 1: Connection String Not Set in Vercel
**Symptom:** Error about DATABASE_URL not being configured

**Solution:**
- Go to Vercel → Settings → Environment Variables
- Add `DATABASE_URL` with your connection string
- Make sure to select all environments (Production, Preview, Development)
- Redeploy

### Issue 2: Wrong Region
**Symptom:** "Tenant or user not found" error

**Solution:**
- Get the connection string directly from Supabase Dashboard
- Don't guess the region - copy it exactly
- The region in the hostname must match your Supabase project's region

### Issue 3: Password with Special Characters
**Symptom:** Authentication fails even with correct password

**Solution:**
- If your password has special characters, they may need URL encoding
- Better: Reset your database password in Supabase to one without special characters
- Or: Use the connection string from Supabase Dashboard (it handles encoding automatically)

### Issue 4: Using Direct Connection Instead of Pooler
**Symptom:** DNS errors or connection timeouts

**Solution:**
- Always use "Connection pooling" mode from Supabase
- Port should be `6543`, not `5432`
- Hostname should include `pooler`, not `db.`

## Testing the Connection

After updating:

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on a function to see logs
   - Look for "✓ Database connected" or error messages

2. **Test the Application:**
   - Visit your Vercel URL
   - Try accessing `/check-database` route
   - Check if database operations work

3. **Verify Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Verify `DATABASE_URL` is set
   - Check that it matches the format from Supabase

## Quick Checklist

- [ ] `DATABASE_URL` is set in Vercel environment variables
- [ ] Connection string is copied directly from Supabase Dashboard
- [ ] Using "Connection pooling" mode (port 6543)
- [ ] Username includes project ref: `postgres.bbydsaxduuwbnwqmiant`
- [ ] All environments are selected (Production, Preview, Development)
- [ ] Application has been redeployed after updating variables

## Still Having Issues?

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Functions
   - Look for detailed error messages
   - The logs will show the exact error

2. **Verify Supabase Project:**
   - Ensure your Supabase project is active
   - Check that the database is accessible
   - Verify your password is correct

3. **Test Locally First:**
   - Update your local `.env` file with the connection string
   - Run `npm start` locally
   - If it works locally but not on Vercel, it's an environment variable issue

4. **Reset Database Password:**
   - Go to Supabase Dashboard → Settings → Database
   - Reset your database password
   - Get a new connection string with the new password
   - Update Vercel environment variables

## Getting Help

If you continue to have issues:
1. Check Vercel function logs for specific error messages
2. Verify the connection string format matches exactly what Supabase shows
3. Ensure you're using the pooler format (port 6543)
4. Make sure the region in the connection string matches your Supabase project

