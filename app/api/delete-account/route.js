import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const USERS_TABLE = process.env.USERS_TABLE || 'users'

export async function POST(request) {
  // Validate environment variables at runtime
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in Vercel project settings.' },
      { status: 500 }
    )
  }

  try {
    const { email } = await request.json()

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Please enter an email address.' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Check if account exists using Supabase
    const { data: checkData, error: checkError } = await supabase
      .from(USERS_TABLE)
      .select('id, email')
      .eq('email', trimmedEmail)
      .limit(1)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" which is expected if account doesn't exist
      console.error('Database error checking account:', checkError)
      throw checkError
    }

    if (!checkData) {
      return NextResponse.json(
        { error: 'No account found with this email address.' },
        { status: 404 }
      )
    }

    // Delete the account using Supabase
    const { error: deleteError } = await supabase
      .from(USERS_TABLE)
      .delete()
      .eq('email', trimmedEmail)

    if (deleteError) {
      console.error('Database error deleting account:', deleteError)
      throw deleteError
    }

    return NextResponse.json({
      success: 'Account successfully deleted.',
    })
  } catch (err) {
    console.error('Database error:', err)

    let errorMessage = 'Database error: ' + (err.message || 'Unknown error')

    if (err.message?.includes('relation') && err.message?.includes('does not exist')) {
      errorMessage = `Database table '${USERS_TABLE}' does not exist. Please create it first.`
    } else if (err.message?.includes('JWT')) {
      errorMessage = 'Database connection error: Invalid Supabase credentials. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.'
    } else if (err.message?.includes('Failed to fetch') || err.message?.includes('Network')) {
      errorMessage = 'Database connection error: Could not connect to Supabase. Please check your NEXT_PUBLIC_SUPABASE_URL.'
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
