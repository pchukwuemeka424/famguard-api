import { supabase } from '@/lib/supabase'
import SetupPolicyClient from './SetupPolicyClient'

const USERS_TABLE = process.env.USERS_TABLE || 'users'

async function getSetupPolicyData() {
  const errors = []
  const successes = []
  const warnings = []
  const info = []

  try {
    // Check if users table exists
    const { data, error } = await supabase
      .from(USERS_TABLE)
      .select('*')
      .limit(1)

    const tableExists = !error || error.code !== 'PGRST116'

    if (!tableExists) {
      errors.push(`Table '${USERS_TABLE}' does not exist. Please create it first or update USERS_TABLE in your environment variables.`)
    } else {
      info.push(`Table '${USERS_TABLE}' found.`)

      // Note: RLS and policy management requires direct database access
      // For Supabase, you would typically manage RLS policies through:
      // 1. Supabase Dashboard > Authentication > Policies
      // 2. SQL Editor in Supabase Dashboard
      // 3. Or use Supabase Management API
      
      warnings.push('RLS policy setup requires direct database access. Please use Supabase Dashboard > Authentication > Policies to configure Row Level Security policies.')
      info.push('To enable RLS and create delete policies, go to Supabase Dashboard > Authentication > Policies and configure them there.')
    }
  } catch (err) {
    console.error('Setup policy error:', err)

    let errorMessage = err.message || 'Unknown error'
    if (err.message?.includes('JWT') || err.message?.includes('Invalid API key')) {
      errorMessage = 'Database connection error: Invalid Supabase credentials. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.'
    } else if (err.message?.includes('Failed to fetch') || err.message?.includes('Network')) {
      errorMessage = 'Database connection error: Could not connect to Supabase. Please check your NEXT_PUBLIC_SUPABASE_URL.'
    }

    errors.push(`Database error: ${errorMessage}`)
  }

  return {
    errors,
    successes,
    warnings,
    info,
    USERS_TABLE
  }
}

export default async function SetupPolicyPage() {
  try {
    const data = await getSetupPolicyData()
    return <SetupPolicyClient {...data} />
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
