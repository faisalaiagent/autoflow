import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import { CalendarEvent, CalendarAgentResult } from '@/types';

function apiError(code: string) {
  if (code === 'NO_API_KEY') return 'No Gemini API key found. Please add your key in Settings → API Configuration.';
  if (code === 'INVALID_API_KEY') return 'Invalid Gemini API key. Please check your key in Settings.';
  return 'Failed to process calendar request. Please try again.';
}

const calendarStore: CalendarEvent[] = [];

export async function GET() {
  return NextResponse.json({ success: true, events: calendarStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { request: userRequest, existing_events } = body;
    const userApiKey = body.api_key || req.headers.get('x-api-key') || undefined;

    if (!userRequest?.trim()) {
      return NextResponse.json({ success: false, error: 'Calendar request is required' }, { status: 400 });
    }

    const currentEvents = existing_events ?? calendarStore;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const prompt = `You are a smart AI calendar scheduling assistant. Today is ${dateStr}.

User Request: "${userRequest}"

Existing Events (${currentEvents.length}):
${currentEvents.length > 0 ? JSON.stringify(currentEvents.slice(0, 10), null, 2) : 'None yet'}

Return ONLY valid JSON (no markdown, no extra text):
{
  "action": "schedule",
  "events": [
    {
      "id": ${Date.now()},
      "title": "[event title]",
      "date": "[YYYY-MM-DD]",
      "start_time": "[HH:MM]",
      "end_time": "[HH:MM]",
      "description": "[description]",
      "attendees": [],
      "location": "",
      "reminder_minutes": 15
    }
  ],
  "conflicts": [],
  "suggestions": ["[scheduling tip]"],
  "message": "[friendly confirmation]"
}`;

    const fallback: CalendarAgentResult = {
      action: 'view',
      events: [],
      conflicts: [],
      suggestions: [],
      message: '',
    };

    const result = await generateJSON<CalendarAgentResult>(prompt, fallback, userApiKey);

    for (const ev of result.events ?? []) {
      const idx = calendarStore.findIndex(x => x.id === ev.id);
      if (idx >= 0) calendarStore[idx] = { ...calendarStore[idx], ...ev };
      else { if (!ev.id) ev.id = Date.now(); calendarStore.push(ev as CalendarEvent); }
    }

    return NextResponse.json({ success: true, result, all_events: calendarStore });
  } catch (error: any) {
    console.error('[calendar-agent]', error?.message);
    return NextResponse.json({ success: false, error: apiError(error?.message ?? '') }, { status: 500 });
  }
}
