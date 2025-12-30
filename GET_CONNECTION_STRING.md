# How to Get the Correct Supabase Connection String

## Steps to Get Connection String from Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `bbydsaxduuwbnwqmiant`

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click on **Database** in the settings menu

3. **Get Connection String**
   - Scroll down to **Connection string** section
   - You'll see two options:

   ### Option A: Connection Pooling (Recommended)
   - Select **Connection pooling** mode
   - Choose **Transaction** mode (for most use cases)
   - Copy the connection string
   - Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
   - **Use this for:** Serverless, Vercel, production environments

   ### Option B: Direct Connection
   - Select **Direct connection** mode
   - Copy the connection string
   - Format: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`
   - **Use this for:** Local development, long-lived connections

4. **Update .env file**
   - Replace the `DATABASE_URL` in your `.env` file with the copied connection string
   - Make sure to include your actual password

## Common Issues

### DNS Error (ENOTFOUND)
- **Solution:** Use Connection Pooling instead of Direct Connection
- Connection pooler uses a different hostname that's more reliable

### IPv6 Issues
- **Solution:** Use Connection Pooling (Supavisor) which supports both IPv4 and IPv6

### Region-Specific Connection
- The connection pooler URL includes your region (e.g., `us-east-1`, `eu-west-1`)
- Make sure you're using the correct region for your project

## Example Connection Strings

### Connection Pooler (Port 6543)
```
postgresql://postgres.bbydsaxduuwbnwqmiant:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Direct Connection (Port 5432)
```
postgresql://postgres:YOUR_PASSWORD@db.bbydsaxduuwbnwqmiant.supabase.co:5432/postgres
```

## After Updating

1. Update `.env` file with the correct connection string
2. Restart your server: `npm run dev`
3. Check the console for connection logs

