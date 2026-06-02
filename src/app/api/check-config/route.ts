import { NextResponse } from 'next/server';

export async function GET() {
  const hasGroq = !!process.env.GROQ_API_KEY;
  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  return NextResponse.json({ hasGroq, hasSupabase, ok: hasGroq });
}
