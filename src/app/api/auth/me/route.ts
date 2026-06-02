import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Verify with Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
      // Demo mode — return a mock user when Supabase isn't configured
      return NextResponse.json({
        user: {
          id: 'demo-user',
          email: 'demo@autoflow.ai',
          name: 'Demo User',
          plan: 'FREE',
          aiUsageCount: 0,
          aiUsageLimit: 100,
        },
      })
    }

    const supabase = getSupabaseServerClient()
    const { data: { user: supaUser }, error } = await supabase.auth.getUser(token)
    if (error || !supaUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
      user: {
        id: supaUser.id,
        email: supaUser.email,
        name: supaUser.user_metadata?.full_name || supaUser.email,
        avatarUrl: supaUser.user_metadata?.avatar_url,
        plan: 'FREE',
        aiUsageCount: 0,
        aiUsageLimit: 100,
      },
    })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
