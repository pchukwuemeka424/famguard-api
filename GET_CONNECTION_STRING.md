# How to Get the Correct Supabase Connection String

## ⚠️ Important: Use Connection Pooler

**The application now automatically converts direct connections to pooler connections**, but for best results, use the pooler connection string directly in your `.env` file.

## Steps to Get Connection String from Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `bbydsaxduuwbnwqmiant`

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon) in the left sidebar
   - Click on **Database** in the settings menu

3. **Get Connection String**
   - Scroll down to **Connection string** section
   - **IMPORTANT: Select "Connection pooling" mode** (not Direct connection)
   - Choose **Transaction** mode (for most use cases)
   - Copy the connection string

## Connection String Formats

### ✅ Connection Pooler (Recommended - Port 6543)
**Use this format for production and development:**
```
postgresql://postgres.bbydsaxduuwbnwqmiant:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**⚠️ CRITICAL: Username Format**
- **MUST be:** `postgres.[project-ref]` (e.g., `postgres.bbydsaxduuwbnwqmiant`)
- **NOT:** `postgres` (this will cause "Tenant or user not found" error)
- The project reference (e.g., `bbydsaxduuwbnwqmiant`) must match your Supabase project

**Why use pooler?**
- More reliable DNS resolution
- Better for serverless environments (Vercel, etc.)
- Handles connection pooling automatically
- Works with both IPv4 and IPv6

### ❌ Direct Connection (Port 5432) - Not Recommended
**Avoid this format as it may cause DNS errors:**
```
postgresql://postgres:YOUR_PASSWORD@db.bbydsaxduuwbnwqmiant.supabase.co:5432/postgres
```

**Why avoid direct connection?**
- May cause `ENOTFOUND` or `getaddrinfo` errors
- Less reliable in some network environments
- Not ideal for serverless deployments

## Update Your .env File

1. Create or edit `.env` file in the project root
2. Add your connection string:
   ```env
   DATABASE_URL=postgresql://postgres.bbydsaxduuwbnwqmiant:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   USERS_TABLE=users
   PORT=3000
   ```
3. Replace `YOUR_PASSWORD` with your actual database password
4. Replace the region (`us-east-1`) with your project's region if different

## Common Issues and Solutions

### Error: `getaddrinfo ENOTFOUND db.bbydsaxduuwbnwqmiant.supabase.co`
**Solution:** Use the connection pooler format (port 6543) instead of direct connection (port 5432)

### Error: `Tenant or user not found` or `password authentication failed`
**Solution:** 
1. **Check username format** - Must be `postgres.[project-ref]` NOT just `postgres`
   - ✅ Correct: `postgresql://postgres.bbydsaxduuwbnwqmiant:password@...`
   - ❌ Wrong: `postgresql://postgres:password@...`
2. **Verify project reference** - The part after `postgres.` must match your Supabase project reference
3. **Get connection string from Supabase Dashboard** - Don't manually construct it, copy it directly from:
   - Supabase Dashboard > Settings > Database > Connection string
   - Select "Connection pooling" mode
   - Copy the entire string
4. **Check password** - Ensure your password is correct and URL-encoded if it contains special characters

### Error: Connection timeout
**Solution:** 
- Check your internet connection
- Verify the connection string is correct
- Ensure your IP is not blocked in Supabase dashboard
- Try a different region if available

### Error: Authentication failed
**Solution:**
- Verify your password is correct
- Check if your password contains special characters that need URL encoding
- Reset your database password in Supabase dashboard if needed

## After Updating

1. Update `.env` file with the correct connection string (pooler format)
2. Restart your server: `npm run dev` or `npm start`
3. Check the console for connection logs
4. Visit `/check-database` to verify the connection

## Testing the Connection

The application will automatically:
- Test the connection on startup
- Convert direct connections to pooler format if needed
- Provide helpful error messages if connection fails

You can also test manually by visiting:
- `http://localhost:3000/check-database` - View database tables and structure
- `http://localhost:3000/health` - Check server health status
