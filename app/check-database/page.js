import { supabase } from '@/lib/supabase'
import DatabaseCheckClient from './DatabaseCheckClient'

const USERS_TABLE = process.env.USERS_TABLE || 'users'

async function getDatabaseInfo() {
  try {
    // Use Supabase to get table information
    // Note: Supabase doesn't directly expose information_schema, so we'll use a simpler approach
    // For production, you might want to create a database function or use postgres for this
    
    // Try to query the users table to check if it exists
    const { data: usersData, error: usersError } = await supabase
      .from(USERS_TABLE)
      .select('*')
      .limit(1)

    const usersTableExists = !usersError || usersError.code !== 'PGRST116'
    
    // Get sample data from users table if it exists
    let emailColumnExists = false
    let sampleData = []
    let rowCount = 0

    if (usersTableExists && !usersError) {
      // Get count (approximate)
      const { count } = await supabase
        .from(USERS_TABLE)
        .select('*', { count: 'exact', head: true })
      
      rowCount = count || 0

      // Get sample data
      const { data: sample } = await supabase
        .from(USERS_TABLE)
        .select('*')
        .limit(5)

      sampleData = sample || []

      // Check if email column exists by checking sample data
      if (sampleData.length > 0 && sampleData[0].email !== undefined) {
        emailColumnExists = true
      }
    }

    // For other tables, we'd need to use postgres or create a database function
    // For now, we'll show what we can with Supabase
    const tableDetails = [{
      name: USERS_TABLE,
      count: rowCount,
      columns: usersTableExists ? [
        { column_name: 'id', data_type: 'uuid', is_nullable: 'NO' },
        { column_name: 'email', data_type: 'text', is_nullable: 'YES' },
        // Add other columns as needed
      ] : [],
      sample: sampleData
    }]

    return {
      tables: tableDetails,
      usersTableExists,
      emailColumnExists,
      USERS_TABLE,
      error: usersError && usersError.code !== 'PGRST116' ? usersError.message : null
    }
  } catch (err) {
    console.error('Database check error:', err)

    let errorMessage = err.message || 'Unknown error'
    if (err.message?.includes('JWT') || err.message?.includes('Invalid API key')) {
      errorMessage = 'Database connection error: Invalid Supabase credentials. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.'
    } else if (err.message?.includes('Failed to fetch') || err.message?.includes('Network')) {
      errorMessage = 'Database connection error: Could not connect to Supabase. Please check your NEXT_PUBLIC_SUPABASE_URL.'
    }

    return {
      tables: [],
      usersTableExists: false,
      emailColumnExists: false,
      USERS_TABLE,
      error: errorMessage
    }
  }
}

export default async function CheckDatabasePage() {
  try {
    const data = await getDatabaseInfo()
    return <DatabaseCheckClient {...data} />
  } catch (error) {
    console.error('Page error:', error)
    return (
      <div className="container">
        <div className="card">
          <h1>Error</h1>
          <div className="alert alert-error">
            <p>An error occurred while loading this page: {error.message || 'Unknown error'}</p>
          </div>
        </div>
      </div>
    )
  }
}
