import { NextRequest, NextResponse } from 'next/server';
import { generateJSON } from '@/lib/gemini';
import { Task, TaskAgentResult } from '@/types';

function apiError(code: string) {
  if (code === 'NO_API_KEY') return 'No Gemini API key found. Please add your key in Settings → API Configuration.';
  if (code === 'INVALID_API_KEY') return 'Invalid Gemini API key. Please check your key in Settings.';
  return 'Failed to process task request. Please try again.';
}

// In-memory store (server-side, per-instance)
const tasksStore: Task[] = [];

export async function GET() {
  return NextResponse.json({ success: true, tasks: tasksStore });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, existing_tasks } = body;
    const userApiKey = body.api_key || req.headers.get('x-api-key') || undefined;

    if (!input?.trim()) {
      return NextResponse.json({ success: false, error: 'Task input is required' }, { status: 400 });
    }

    const currentTasks = existing_tasks ?? tasksStore;

    const prompt = `You are an intelligent task management AI assistant.

User Request: "${input}"

Existing Tasks (${currentTasks.length} total):
${currentTasks.length > 0 ? JSON.stringify(currentTasks.slice(0, 10), null, 2) : 'None yet'}

Process this request and return ONLY valid JSON (no markdown, no extra text):
{
  "action": "create",
  "tasks": [
    {
      "id": ${Date.now()},
      "title": "[task title]",
      "description": "[brief description]",
      "priority": "high",
      "status": "pending",
      "due_date": null,
      "tags": ["tag1"],
      "estimated_hours": 2
    }
  ],
  "message": "[friendly response to user]",
  "productivity_tip": "[one actionable productivity tip]"
}
Priority must be: high, medium, or low. Status must be: pending, in_progress, or completed.`;

    const fallback: TaskAgentResult = {
      action: 'create',
      tasks: [],
      message: 'Task processed.',
      productivity_tip: '',
    };

    const result = await generateJSON<TaskAgentResult>(prompt, fallback, userApiKey);

    // Merge into store
    for (const t of result.tasks ?? []) {
      const idx = tasksStore.findIndex(x => x.id === t.id);
      if (idx >= 0) tasksStore[idx] = { ...tasksStore[idx], ...t };
      else { if (!t.id) t.id = Date.now(); tasksStore.push(t as Task); }
    }

    return NextResponse.json({ success: true, result, all_tasks: tasksStore });
  } catch (error: any) {
    console.error('[task-agent]', error?.message);
    return NextResponse.json({ success: false, error: apiError(error?.message ?? '') }, { status: 500 });
  }
}
