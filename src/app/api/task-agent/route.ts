import { NextRequest, NextResponse } from 'next/server';
import { generateJSON, apiErrorMessage } from '@/lib/groq';
import type { Task, TaskAgentResult } from '@/types';

const store: Task[] = [];

export async function GET() {
  return NextResponse.json({ success: true, tasks: store });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, existing_tasks } = body;
    const userApiKey = body.api_key ?? undefined;

    if (!input?.trim())
      return NextResponse.json({ success: false, error: 'Task input is required' }, { status: 400 });

    const current = existing_tasks ?? store;
    const prompt = `You are an intelligent task manager AI.

User request: "${input}"
Current tasks (${current.length}): ${current.length > 0 ? JSON.stringify(current.slice(0, 5)) : 'none'}

Return ONLY a valid JSON object (no markdown, no code blocks):
{
  "action": "create",
  "tasks": [{
    "id": ${Date.now()},
    "title": "task title",
    "description": "brief description",
    "priority": "high",
    "status": "pending",
    "due_date": null,
    "tags": ["tag"],
    "estimated_hours": 2
  }],
  "message": "friendly response",
  "productivity_tip": "one actionable tip"
}
priority: high/medium/low, status: pending/in_progress/completed`;

    const result = await generateJSON<TaskAgentResult>(prompt, {
      action: 'create',
      tasks: [],
      message: '',
      productivity_tip: '',
    }, userApiKey);

    for (const t of result.tasks ?? []) {
      const idx = store.findIndex(x => x.id === t.id);
      if (idx >= 0) store[idx] = { ...store[idx], ...t };
      else { if (!t.id) (t as any).id = Date.now(); store.push(t as Task); }
    }

    return NextResponse.json({ success: true, result, all_tasks: store });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: apiErrorMessage(e?.message ?? '') }, { status: 500 });
  }
}
