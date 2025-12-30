'use client'

export default function FixConnectionPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Fix Database Connection</h1>
        
        <div className="alert alert-error" style={{ marginBottom: '24px' }}>
          <strong>Error:</strong> Database authentication failed. The region in your DATABASE_URL is likely incorrect.
        </div>

        <h2>Step-by-Step Fix</h2>

        <div style={{ marginTop: '20px', lineHeight: '1.8' }}>
          <h3>Step 1: Get Connection String from Supabase</h3>
          <ol>
            <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">Supabase Dashboard</a></li>
            <li>Select your project: <code>bbydsaxduuwbnwqmiant</code></li>
            <li>Click <strong>Settings</strong> (gear icon) in the left sidebar</li>
            <li>Click <strong>Database</strong> in the settings menu</li>
            <li>Scroll down to <strong>Connection string</strong> section</li>
            <li><strong>IMPORTANT:</strong> Click the <strong>"Connection pooling"</strong> tab (NOT "Direct connection")</li>
            <li>Select <strong>"Transaction"</strong> mode</li>
            <li><strong>Copy the ENTIRE connection string</strong> - it will look like:
              <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px' }}>
{`postgresql://postgres.bbydsaxduuwbnwqmiant:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`}
              </pre>
            </li>
          </ol>

          <h3>Step 2: Update Your .env File</h3>
          <ol>
            <li>Open the <code>.env</code> file in your project root</li>
            <li>Find the line that starts with <code>DATABASE_URL=</code></li>
            <li>Replace it with the connection string you copied from Supabase</li>
            <li>Save the file</li>
          </ol>

          <h3>Step 3: Restart Next.js Server</h3>
          <ol>
            <li>Stop the current server (press <code>Ctrl+C</code> in the terminal)</li>
            <li>Run <code>npm run dev</code> again</li>
            <li>The connection should now work!</li>
          </ol>

          <h3>Current Connection String Format</h3>
          <p>Your current connection string uses region: <code>us-east-1</code></p>
          <p>This might be wrong. The connection string from Supabase will have the correct region for your project.</p>

          <div className="alert alert-info" style={{ marginTop: '24px' }}>
            <strong>Note:</strong> The region in the connection string (like <code>us-east-1</code>, <code>eu-west-1</code>, etc.) must match your Supabase project's actual region. Using the wrong region causes "Tenant or user not found" errors.
          </div>
        </div>
      </div>
    </div>
  )
}

