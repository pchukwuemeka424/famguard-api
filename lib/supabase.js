import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

// Check if we're in build phase (Next.js sets this during build)
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

let supabaseClient = null

// Create Supabase client - use placeholders during build if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  if (isBuildPhase) {
    // During build, create a placeholder client to prevent build errors
    // Environment variables should be set in Vercel dashboard for runtime
    supabaseClient = createClient(
      'https://placeholder.supabase.co',
      'placeholder-key',
      {
        auth: {
          persistSession: false
        }
      }
    )
  } else {
    // At runtime, throw error if env vars are missing
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY')
  }
} else {
  // Create Supabase client with real credentials
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false
    }
  })
}

// Export Supabase client for server-side use
export const supabase = supabaseClient

// Helper to get Supabase client (for consistency)
export function getSupabaseClient() {
  return supabase
}
