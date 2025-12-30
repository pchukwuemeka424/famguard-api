'use client'

export default function DatabaseCheckClient({ tables, usersTableExists, emailColumnExists, USERS_TABLE, error }) {
  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h1>Database Check</h1>
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Database Check</h1>

        <div style={{ marginBottom: '20px' }}>
          <h2>Compatibility Status</h2>
          <p>
            <strong>Users Table Exists:</strong>{' '}
            {usersTableExists ? '✓ Yes' : '✗ No'}
          </p>
          <p>
            <strong>Email Column Exists:</strong>{' '}
            {emailColumnExists ? '✓ Yes' : '✗ No'}
          </p>
          <p>
            <strong>Configured Table Name:</strong> {USERS_TABLE}
          </p>
        </div>

        <h2>Database Tables ({tables.length})</h2>

        {tables.map((table) => (
          <div key={table.name} className="card" style={{ marginTop: '20px' }}>
            <h3>{table.name}</h3>
            <p>
              <strong>Row Count:</strong> {table.count}
            </p>

            {table.columns.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <h4>Columns:</h4>
                <table style={{ width: '100%', marginTop: '8px', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Nullable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns.map((col, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '8px' }}>{col.column_name}</td>
                        <td style={{ padding: '8px' }}>{col.data_type}</td>
                        <td style={{ padding: '8px' }}>{col.is_nullable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {table.sample.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <h4>Sample Data (first 5 rows):</h4>
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
                  {JSON.stringify(table.sample, null, 2)}
                </pre>
              </div>
            )}

            {table.error && (
              <div className="alert alert-error" style={{ marginTop: '16px' }}>
                Error: {table.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

