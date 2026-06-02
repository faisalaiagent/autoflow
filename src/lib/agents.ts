// ─── AutoFlow — AI Agent Logic (Gemini 2.0 Flash) ─────────────────────────────
// Preserves all business logic from original Flask app.py

import { generateJSON } from './gemini'
import type {
  EmailAgentResponse,
  MeetingAgentResponse,
  TaskAgentResponse,
  CalendarAgentResponse,
  Task,
  CalendarEvent,
} from '@/types'

// ══════════════════════════════════════════════════════════════════════════════
//  AGENT 1 — Email Reply Agent
// ══════════════════════════════════════════════════════════════════════════════

export async function emailReplyAgent(
  emailContent: string,
  tone: string = 'professional',
  context: string = ''
): Promise<EmailAgentResponse> {
  const prompt = `You are an intelligent email reply assistant.

Original Email:
${emailContent}

Tone: ${tone}
Additional Context: ${context || 'None'}

Generate a complete, polished email reply. Return ONLY valid JSON (no markdown, no fences):
{
  "subject": "Re: <original subject>",
  "body": "<full email body>",
  "keyPoints": ["point1", "point2"],
  "suggestedFollowup": "<optional follow-up action>"
}`

  return generateJSON<EmailAgentResponse>(prompt, {
    subject: 'Re: Your Email',
    body: 'Unable to generate reply. Please try again.',
    key_points: [],
    suggested_followup: '',
  })
}

// ══════════════════════════════════════════════════════════════════════════════
//  AGENT 2 — Meeting Summary Agent
// ══════════════════════════════════════════════════════════════════════════════

export async function meetingSummaryAgent(
  transcript: string,
  meetingTitle: string = 'Meeting'
): Promise<MeetingAgentResponse> {
  const prompt = `You are an expert meeting notes assistant.

Meeting Title: ${meetingTitle}
Transcript/Notes:
${transcript}

Analyze and return ONLY valid JSON (no markdown, no fences):
{
  "summary": "<2-3 sentence overview>",
  "actionItems": [
    {"task": "...", "owner": "...", "deadline": "..."}
  ],
  "decisions": ["decision1", "decision2"],
  "keyTopics": ["topic1", "topic2"],
  "nextMeetingAgenda": ["agenda item 1", "agenda item 2"],
  "sentiment": "positive|neutral|negative"
}`

  return generateJSON<MeetingAgentResponse>(prompt, {
    summary: 'Unable to summarize meeting.',
    actionItems: [],
    decisions: [],
    keyTopics: [],
    nextMeetingAgenda: [],
    sentiment: 'neutral',
  })
}

// ══════════════════════════════════════════════════════════════════════════════
//  AGENT 3 — Task Manager Agent
// ══════════════════════════════════════════════════════════════════════════════

export async function taskManagerAgent(
  userInput: string,
  existingTasks: Partial<Task>[] = []
): Promise<TaskAgentResponse> {
  const tasksJson = JSON.stringify(existingTasks, null, 2)

  const prompt = `You are an intelligent task management assistant.

User Request: ${userInput}

Current Tasks:
${tasksJson}

Based on the request, return ONLY valid JSON (no markdown, no fences):
{
  "action": "create|update|prioritize|analyze|complete",
  "tasks": [
    {
      "title": "...",
      "description": "...",
      "priority": "HIGH|MEDIUM|LOW",
      "status": "PENDING|IN_PROGRESS|COMPLETED",
      "dueDate": "YYYY-MM-DD or null",
      "tags": ["tag1"],
      "estimatedHours": null
    }
  ],
  "message": "<helpful message to user>",
  "productivityTip": "<one actionable tip>"
}`

  return generateJSON<TaskAgentResponse>(prompt, {
    action: 'analyze',
    tasks: existingTasks as Partial<Task>[],
    message: 'Unable to process task request.',
    productivityTip: '',
  })
}

// ══════════════════════════════════════════════════════════════════════════════
//  AGENT 4 — Calendar Assistant Agent
// ══════════════════════════════════════════════════════════════════════════════

export async function calendarAssistantAgent(
  userRequest: string,
  existingEvents: Partial<CalendarEvent>[] = []
): Promise<CalendarAgentResponse> {
  const currentTime = new Date().toISOString()
  const eventsJson = JSON.stringify(existingEvents, null, 2)

  const prompt = `You are a smart calendar scheduling assistant.

Current DateTime: ${currentTime}
User Request: ${userRequest}

Existing Events:
${eventsJson}

Return ONLY valid JSON (no markdown, no fences):
{
  "action": "schedule|reschedule|cancel|view|remind",
  "events": [
    {
      "title": "...",
      "date": "YYYY-MM-DD",
      "startTime": "HH:MM",
      "endTime": "HH:MM",
      "description": "...",
      "attendees": ["name1"],
      "location": "...",
      "reminderMinutes": 15
    }
  ],
  "conflicts": [],
  "suggestions": ["suggestion1"],
  "message": "<response to user>"
}`

  return generateJSON<CalendarAgentResponse>(prompt, {
    action: 'view',
    events: [],
    conflicts: [],
    suggestions: [],
    message: 'Unable to process calendar request.',
  })
}
