'use client'

export default function Error({ error, reset }) {
  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong!</h1>
        <div className="alert alert-error" style={{ marginBottom: '20px' }}>
          <p>{error?.message || 'An unexpected error occurred'}</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={reset}
            className="btn"
            style={{ flex: 1 }}
          >
            Try again
          </button>
          <a href="/" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', display: 'inline-block' }}>
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}
