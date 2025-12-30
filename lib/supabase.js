import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

// Always create a client - use placeholders if env vars are missing to allow build to succeed
// Environment variables should be set in Vercel dashboard for runtime
// If env vars are missing at runtime, API calls will fail gracefully with appropriate error messages
const supabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: false
    }
  }
)

// Export Supabase client for server-side use
export const supabase = supabaseClient

// Helper to get Supabase client (for consistency)
export function getSupabaseClient() {
  return supabase
}
