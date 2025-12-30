'use client'

export default function SetupPolicyClient({ errors, successes, warnings, info, USERS_TABLE }) {
  return (
    <div className="container">
      <div className="card">
        <h1>Setup Row Level Security Policy</h1>
        <p>Configure database policies for the {USERS_TABLE} table.</p>

        {errors.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#c33' }}>Errors</h2>
            {errors.map((error, idx) => (
              <div key={idx} className="alert alert-error">
                {error}
              </div>
            ))}
          </div>
        )}

        {successes.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#3c3' }}>Success</h2>
            {successes.map((success, idx) => (
              <div key={idx} className="alert alert-success">
                {success}
              </div>
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#cc3' }}>Warnings</h2>
            {warnings.map((warning, idx) => (
              <div key={idx} className="alert alert-info">
                {warning}
              </div>
            ))}
          </div>
        )}

        {info.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h2>Information</h2>
            {info.map((item, idx) => (
              <div key={idx} className="alert alert-info">
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

