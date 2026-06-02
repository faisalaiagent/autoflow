import { useState } from 'react';
import axios from 'axios';
import { useAgentStore } from '@/store/useAgentStore';
import {
  EmailReplyRequest, EmailReplyResult,
  MeetingSummaryRequest, MeetingSummaryResult,
  TaskAgentResult, CalendarAgentResult,
} from '@/types';

export function useEmailAgent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailReplyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { incrementStat, addEmail } = useAgentStore();

  const generate = async (payload: EmailReplyRequest) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/email-agent', payload);
      if (data.success) {
        setResult(data.result);
        incrementStat('emails_processed');
        addEmail({
          id: Date.now().toString(),
          original_preview: payload.email_content.slice(0, 100),
          reply_preview: data.result.body.slice(0, 100),
          tone: payload.tone,
          created_at: new Date().toISOString(),
        });
      }
    } catch {
      setError('Failed to generate reply. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, result, error, reset: () => setResult(null) };
}

export function useMeetingAgent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MeetingSummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { incrementStat, addMeeting } = useAgentStore();

  const summarize = async (payload: MeetingSummaryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/meeting-agent', payload);
      if (data.success) {
        setResult(data.result);
        incrementStat('meetings_summarized');
        addMeeting(data.result);
      }
    } catch {
      setError('Failed to summarize meeting.');
    } finally {
      setLoading(false);
    }
  };

  return { summarize, loading, result, error, reset: () => setResult(null) };
}

export function useTaskAgent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TaskAgentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { tasks, addTask, incrementStat, geminiApiKey } = useAgentStore();

  const process = async (input: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/task-agent', { input, existing_tasks: tasks });
      if (data.success) {
        setResult(data.result);
        const newTasks = data.all_tasks || []; newTasks.forEach((t: any) => { if (!tasks.find((x:any) => x.id === t.id)) addTask(t); });
        incrementStat('tasks_total');
      }
    } catch {
      setError('Failed to process task.');
    } finally {
      setLoading(false);
    }
  };

  return { process, loading, result, tasks, error };
}

export function useCalendarAgent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CalendarAgentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { events, addEvent, incrementStat, geminiApiKey } = useAgentStore();

  const request = async (userRequest: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post('/api/calendar-agent', {
        request: userRequest,
        existing_events: events,
      });
      if (data.success) {
        setResult(data.result);
        const newEvents = data.all_events || []; newEvents.forEach((ev: any) => addEvent(ev));
        incrementStat('events_scheduled');
      }
    } catch {
      setError('Failed to process calendar request.');
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, result, events, error };
}
