import { NextResponse } from 'next/server';

export async function GET() {
  // In production, fetch from Supabase
  return NextResponse.json({
    success: true,
    stats: {
      emails_processed: 0,
      meetings_summarized: 0,
      tasks_total: 0,
      tasks_completed: 0,
      events_scheduled: 0,
      recent_emails: [],
      recent_tasks: [],
      upcoming_events: [],
    },
  });
}
