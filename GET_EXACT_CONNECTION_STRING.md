# How to Get the EXACT Connection String from Supabase

## ⚠️ Important: Don't Manually Construct the Connection String

The "Tenant or user not found" error usually means the connection string region or format is incorrect. **Always copy the connection string directly from Supabase Dashboard.**

## Step-by-Step Instructions

### 1. Go to Supabase Dashboard
- Visit: https://supabase.com/dashboard
- Login to your account
- Select your project: `bbydsaxduuwbnwqmiant`

### 2. Navigate to Database Settings
- Click on **Settings** (gear icon) in the left sidebar
- Click on **Database** in the settings menu

### 3. Get Connection String
- Scroll down to the **Connection string** section
- **IMPORTANT:** Select **"Connection pooling"** tab (NOT "Direct connection")
- Select **"Transaction"** mode (or "Session" if Transaction doesn't work)
- **Copy the ENTIRE connection string** - don't modify anything

### 4. The Connection String Should Look Like:
```
postgresql://postgres.bbydsaxduuwbnwqmiant:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Key Points:**
- Username: `postgres.bbydsaxduuwbnwqmiant` (includes project ref)
- Port: `6543` (pooler port)
- Hostname: `aws-0-[REGION].pooler.supabase.com` (region will be specific to your project)
- Password: Your actual password (shown in Supabase)

### 5. Update Your .env File

Replace the `DATABASE_URL` in your `.env` file with the EXACT string you copied:

```env
DATABASE_URL=postgresql://postgres.bbydsaxduuwbnwqmiant:eYHNPishBvzReZ6P@aws-0-[ACTUAL-REGION].pooler.supabase.com:6543/postgres
```

**Important:** 
- Replace `[ACTUAL-REGION]` with the region shown in your Supabase connection string
- Don't use `us-east-1` unless that's what Supabase shows
- Copy the entire string exactly as shown

### 6. For Vercel Deployment

1. Go to Vercel Dashboard > Your Project > Settings > Environment Variables
2. Update `DATABASE_URL` with the EXACT connection string from Supabase
3. Save and redeploy

## Common Regions

Your region might be one of these (but check Supabase to be sure):
- `us-east-1` (US East - Virginia)
- `us-west-1` (US West - California)
- `eu-west-1` (Europe - Ireland)
- `ap-southeast-1` (Asia Pacific - Singapore)
- `ap-northeast-1` (Asia Pacific - Tokyo)

## Why This Matters

The region in the connection string must match your Supabase project's actual region. Using the wrong region (like `us-east-1` when your project is in `eu-west-1`) will cause "Tenant or user not found" errors.

## Verification

After updating:
1. Restart your local server: `npm start`
2. Check console for "✓ Database connected"
3. Visit `/check-database` to verify connection
4. If on Vercel, check function logs for connection status

## Still Having Issues?

If you still get "Tenant or user not found" after copying the exact string:
1. Verify your password is correct
2. Check for extra spaces or characters in the connection string
3. Ensure you're using "Connection pooling" mode, not "Direct connection"
4. Try resetting your database password in Supabase Dashboard
5. Check Vercel logs for more detailed error messages

