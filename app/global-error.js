'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: '600px', width: '100%', background: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong!</h1>
            <div style={{ background: '#fee', color: '#c33', padding: '16px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #fcc' }}>
              <p>{error?.message || 'An unexpected error occurred'}</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={reset}
                style={{ flex: 1, padding: '12px 24px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
              >
                Try again
              </button>
              <a 
                href="/" 
                style={{ flex: 1, padding: '12px 24px', background: '#6c757d', color: 'white', textAlign: 'center', textDecoration: 'none', borderRadius: '4px', display: 'inline-block' }}
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
