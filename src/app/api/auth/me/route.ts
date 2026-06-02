import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '') ?? ''
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const supabase = getSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'User',
        avatar_url: user.user_metadata?.avatar_url ?? null,
        created_at: user.created_at,
      }
    })
  } catch (e: any) {
    console.error('[api/auth/me]', e?.message)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
