import { NextRequest, NextResponse } from 'next/server';
import { generateJSON, apiErrorMessage } from '@/lib/groq';
import type { MeetingSummaryResult } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, meeting_title = 'Meeting' } = body;
    const userApiKey = body.api_key ?? undefined;

    if (!transcript?.trim())
      return NextResponse.json({ success: false, error: 'Meeting transcript is required' }, { status: 400 });

    const prompt = `You are an expert meeting analyst. Analyze this meeting transcript.

Meeting: ${meeting_title}
Transcript:
${transcript}

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "title": "${meeting_title}",
  "summary": "[2-3 sentence executive summary]",
  "action_items": [{"task": "...", "owner": "...", "deadline": "..."}],
  "decisions": ["decision1"],
  "key_topics": ["topic1"],
  "next_meeting_agenda": ["item1"],
  "sentiment": "positive"
}
sentiment must be exactly: positive, neutral, or negative`;

    const result = await generateJSON<MeetingSummaryResult>(prompt, {
      title: meeting_title,
      summary: '',
      action_items: [],
      decisions: [],
      key_topics: [],
      next_meeting_agenda: [],
      sentiment: 'neutral',
      timestamp: new Date().toISOString(),
    }, userApiKey);

    result.timestamp = new Date().toISOString();
    return NextResponse.json({ success: true, result });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: apiErrorMessage(e?.message ?? '') }, { status: 500 });
  }
}
