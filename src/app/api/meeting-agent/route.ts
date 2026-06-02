import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import { MeetingSummaryResult } from '@/types';

function apiError(code: string) {
  if (code === 'NO_API_KEY') return 'No Gemini API key found. Please add your key in Settings → API Configuration.';
  if (code === 'INVALID_API_KEY') return 'Invalid Gemini API key. Please check your key in Settings.';
  return 'Failed to summarize meeting. Please try again.';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, meeting_title = 'Meeting' } = body;
    const userApiKey = body.api_key || req.headers.get('x-api-key') || undefined;

    if (!transcript?.trim()) {
      return NextResponse.json({ success: false, error: 'Meeting transcript is required' }, { status: 400 });
    }

    const prompt = `You are an expert meeting analyst and executive assistant.

Meeting Title: ${meeting_title}
Transcript:
${transcript}

Analyze this meeting thoroughly. Return ONLY valid JSON (no markdown, no extra text):
{
  "title": "${meeting_title}",
  "summary": "[2-3 sentence executive summary]",
  "action_items": [{"task": "[task]", "owner": "[name]", "deadline": "[date or timeframe]"}],
  "decisions": ["[decision 1]", "[decision 2]"],
  "key_topics": ["[topic 1]", "[topic 2]"],
  "next_meeting_agenda": ["[agenda item 1]", "[agenda item 2]"],
  "sentiment": "positive"
}
Use sentiment values: positive, neutral, or negative only.`;

    const fallback: MeetingSummaryResult = {
      title: meeting_title,
      summary: '',
      action_items: [],
      decisions: [],
      key_topics: [],
      next_meeting_agenda: [],
      sentiment: 'neutral',
      timestamp: new Date().toISOString(),
    };

    const result = await generateJSON<MeetingSummaryResult>(prompt, fallback, userApiKey);
    result.timestamp = new Date().toISOString();

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('[meeting-agent]', error?.message);
    return NextResponse.json({ success: false, error: apiError(error?.message ?? '') }, { status: 500 });
  }
}
