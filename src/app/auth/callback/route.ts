import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    try {
      // Use plain supabase-js on server — no cookie/SSR complexity
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        return NextResponse.redirect(`${origin}/dashboard`)
      }
      console.error('[auth/callback] error:', error.message)
    } catch (e: any) {
      console.error('[auth/callback] exception:', e?.message)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
