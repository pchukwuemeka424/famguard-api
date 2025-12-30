# Database Connection String Configuration

## Your Supabase Connection Details

**Project Reference:** `bbydsaxduuwbnwqmiant`  
**Password:** `eYHNPishBvzReZ6P`

## Connection String Formats

### ✅ Connection Pooler (Recommended for Vercel/Production)

Use this format for Vercel deployments and production:

```
postgresql://postgres.bbydsaxduuwbnwqmiant:eYHNPishBvzReZ6P@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important Notes:**
- Username format: `postgres.bbydsaxduuwbnwqmiant` (includes project ref)
- Port: `6543` (pooler port)
- Hostname: `aws-0-us-east-1.pooler.supabase.com` (pooler hostname)

**If the region is different**, replace `us-east-1` with your actual region. Common regions:
- `us-east-1` (US East)
- `us-west-1` (US West)
- `eu-west-1` (Europe)
- `ap-southeast-1` (Asia Pacific)

To find your exact region and connection string:
1. Go to Supabase Dashboard
2. Select your project
3. Go to Settings > Database
4. Scroll to "Connection string"
5. Select "Connection pooling" mode
6. Copy the connection string

### ❌ Direct Connection (Local Development Only)

For local development only (may cause DNS errors on Vercel):

```
postgresql://postgres:eYHNPishBvzReZ6P@db.bbydsaxduuwbnwqmiant.supabase.co:5432/postgres
```

**Note:** This format often causes `ENOTFOUND` errors on Vercel. Use pooler format instead.

## Setting Up Environment Variables

### For Local Development (.env file)

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres.bbydsaxduuwbnwqmiant:eYHNPishBvzReZ6P@aws-0-us-east-1.pooler.supabase.com:6543/postgres
USERS_TABLE=users
PORT=3000
NODE_ENV=development
```

### For Vercel Deployment

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:

**DATABASE_URL:**
```
postgresql://postgres.bbydsaxduuwbnwqmiant:eYHNPishBvzReZ6P@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**USERS_TABLE:**
```
users
```

**NODE_ENV:**
```
production
```

5. Save and redeploy your application

## Verifying the Connection

After setting up the connection string:

1. **Local:** Run `npm start` and check console for "✓ Database connected"
2. **Vercel:** Check function logs in Vercel Dashboard
3. **Test:** Visit `/check-database` route to verify connection

## Troubleshooting

### Error: "getaddrinfo ENOTFOUND"
- **Solution:** Use connection pooler format (port 6543) instead of direct connection (port 5432)

### Error: "Tenant or user not found"
- **Solution:** Ensure username is `postgres.bbydsaxduuwbnwqmiant` (with project ref), not just `postgres`

### Error: "Authentication failed"
- **Solution:** Verify password is correct: `eYHNPishBvzReZ6P`
- Check for extra spaces or special characters in connection string

### Error: "Database connection error. Please check the server configuration"
- **Solution:** Verify `DATABASE_URL` is set in Vercel environment variables
- Ensure you're using the pooler format
- Redeploy after updating environment variables

