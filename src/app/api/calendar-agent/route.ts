import { NextRequest, NextResponse } from 'next/server';
import { generateJSON, apiErrorMessage } from '@/lib/groq';
import type { CalendarEvent, CalendarAgentResult } from '@/types';

const store: CalendarEvent[] = [];

export async function GET() {
  return NextResponse.json({ success: true, events: store });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { request: userRequest, existing_events } = body;
    const userApiKey = body.api_key ?? undefined;

    if (!userRequest?.trim())
      return NextResponse.json({ success: false, error: 'Calendar request is required' }, { status: 400 });

    const current = existing_events ?? store;
    const today = new Date().toISOString().split('T')[0];

    const prompt = `You are a smart calendar assistant. Today: ${today}

User request: "${userRequest}"
Existing events: ${current.length > 0 ? JSON.stringify(current.slice(0, 5)) : 'none'}

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "action": "schedule",
  "events": [{
    "id": ${Date.now()},
    "title": "event title",
    "date": "YYYY-MM-DD",
    "start_time": "HH:MM",
    "end_time": "HH:MM",
    "description": "description",
    "attendees": [],
    "location": "",
    "reminder_minutes": 15
  }],
  "conflicts": [],
  "suggestions": ["tip"],
  "message": "friendly confirmation"
}`;

    const result = await generateJSON<CalendarAgentResult>(prompt, {
      action: 'view',
      events: [],
      conflicts: [],
      suggestions: [],
      message: '',
    }, userApiKey);

    for (const ev of result.events ?? []) {
      const idx = store.findIndex(x => x.id === ev.id);
      if (idx >= 0) store[idx] = { ...store[idx], ...ev };
      else { if (!ev.id) (ev as any).id = Date.now(); store.push(ev as CalendarEvent); }
    }

    return NextResponse.json({ success: true, result, all_events: store });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: apiErrorMessage(e?.message ?? '') }, { status: 500 });
  }
}
