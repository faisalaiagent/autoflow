import { NextRequest, NextResponse } from 'next/server'

// OAuth redirect handled by /auth/callback/route.ts
// This route kept for backward compatibility
export async function GET(req: NextRequest) {
  const { origin } = new URL(req.url)
  return NextResponse.redirect(`${origin}/dashboard`)
}
