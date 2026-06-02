import { NextRequest, NextResponse } from 'next/server'

// This handles the OAuth callback redirect from Supabase
// Supabase handles the token exchange automatically via the SSR package
export async function GET(req: NextRequest) {
  const { origin, searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}`)
  }

  if (code) {
    // For Supabase SSR, the session is set via cookie automatically
    // Just redirect to dashboard - the session will be available
    return NextResponse.redirect(`${origin}/dashboard`)
  }

  return NextResponse.redirect(`${origin}/login`)
}
