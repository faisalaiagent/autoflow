import { NextRequest, NextResponse } from 'next/server';
import { generateJSON, apiErrorMessage } from '@/lib/groq';
import type { EmailReplyResult } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email_content = body.email_content ?? body.emailContent ?? '';
    const tone = body.tone ?? 'professional';
    const context = body.context ?? '';
    const userApiKey = body.api_key ?? undefined;

    if (!email_content.trim())
      return NextResponse.json({ success: false, error: 'Email content is required' }, { status: 400 });

    const prompt = `You are an expert email reply assistant. Write a complete ${tone} email reply.

Original Email:
${email_content}
${context ? `\nContext: ${context}` : ''}

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "subject": "Re: [subject]",
  "body": "[complete polished reply]",
  "key_points": ["point1", "point2"],
  "suggested_followup": "[one follow-up action]"
}`;

    const result = await generateJSON<EmailReplyResult>(prompt, {
      subject: 'Re: Your Email',
      body: '',
      key_points: [],
      suggested_followup: '',
    }, userApiKey);

    return NextResponse.json({ success: true, result });
  } catch (e: any) {
    const msg = apiErrorMessage(e?.message ?? '');
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
