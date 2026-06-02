import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import { EmailReplyResult } from '@/types';

function apiError(code: string) {
  if (code === 'NO_API_KEY')
    return 'No Gemini API key found. Please add your key in Settings → API Configuration.';
  if (code === 'INVALID_API_KEY')
    return 'Invalid Gemini API key. Please check your key in Settings → API Configuration.';
  if (code === 'PARSE_ERROR')
    return 'AI response could not be parsed. Please try again.';
  return 'Failed to generate reply. Please try again.';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email_content = body.email_content ?? body.emailContent ?? '';
    const tone = body.tone ?? 'professional';
    const context = body.context ?? '';
    // Get API key: from body (user-supplied) or env var
    const userApiKey = body.api_key || req.headers.get('x-api-key') || undefined;

    if (!email_content.trim()) {
      return NextResponse.json({ success: false, error: 'Email content is required' }, { status: 400 });
    }

    const prompt = `You are an expert professional email reply assistant.

Original Email:
${email_content}

Tone: ${tone}
${context ? `Additional Context: ${context}` : ''}

Write a complete, polished ${tone} email reply. Return ONLY valid JSON (absolutely no markdown, no extra text):
{
  "subject": "Re: [original subject]",
  "body": "[complete reply text]",
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
  } catch (error: any) {
    const code = error?.message ?? 'UNKNOWN';
    console.error('[email-agent]', code);
    return NextResponse.json({ success: false, error: apiError(code) }, { status: 500 });
  }
}
