import { NextResponse } from 'next/server';

export async function GET() {
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return NextResponse.json({ hasGemini, hasSupabase, ok: hasGemini });
}
