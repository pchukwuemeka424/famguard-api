require('dotenv').config()
const postgres = require('postgres')

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in .env file')
  process.exit(1)
}

console.log('Testing database connection...\n')

// Parse connection string
try {
  const url = new URL(connectionString)
  console.log('Connection String Analysis:')
  console.log(`  Hostname: ${url.hostname}`)
  console.log(`  Username: ${url.username}`)
  console.log(`  Port: ${url.port}`)
  console.log(`  Is Pooler: ${url.hostname.includes('pooler') ? 'Yes ✓' : 'No ✗'}`)
  
  const region = url.hostname.match(/aws-0-([^.]+)\.pooler/)?.[1] || 'unknown'
  console.log(`  Region: ${region}`)
  console.log('')
  
  if (region === 'us-east-1') {
    console.log('⚠️  WARNING: Using region "us-east-1"')
    console.log('   This might be incorrect. Get the exact connection string from Supabase Dashboard.\n')
  }
} catch (err) {
  console.error('❌ Invalid connection string format')
  process.exit(1)
}

// Test connection
const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  max: 1,
  connect_timeout: 10
})

sql`SELECT 1 as test`
  .then((result) => {
    console.log('✅ Connection successful!')
    console.log('Test query result:', result)
    sql.end()
    process.exit(0)
  })
  .catch((err) => {
    console.error('❌ Connection failed!\n')
    console.error('Error:', err.message)
    console.error('')
    
    if (err.message.includes('Tenant or user not found') || err.message.includes('password authentication failed')) {
      console.error('🔍 This is an authentication error.')
      console.error('')
      console.error('Most likely causes:')
      console.error('1. Wrong region in connection string')
      console.error('2. Incorrect password')
      console.error('3. Username format issue')
      console.error('')
      console.error('✅ Solution:')
      console.error('1. Go to Supabase Dashboard > Settings > Database')
      console.error('2. Select "Connection pooling" tab')
      console.error('3. Copy the EXACT connection string')
      console.error('4. Update DATABASE_URL in your .env file')
    }
    
    sql.end()
    process.exit(1)
  })

