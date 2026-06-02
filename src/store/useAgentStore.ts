import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, MeetingSummaryResult, EmailHistoryItem, CalendarEvent } from '@/types';

interface Stats {
  emails_processed: number;
  meetings_summarized: number;
  tasks_total: number;
  events_scheduled: number;
}

interface AgentStoreState {
  // API Key
  groqApiKey: string;
  setGroqApiKey: (key: string) => void;

  // Stats
  stats: Stats;
  incrementStat: (key: keyof Stats) => void;

  // Data
  tasks: Task[];
  meetings: MeetingSummaryResult[];
  emailHistory: EmailHistoryItem[];
  events: CalendarEvent[];

  addTask: (task: Task) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  addMeeting: (meeting: MeetingSummaryResult) => void;
  addEmail: (email: EmailHistoryItem) => void;
  addEvent: (event: CalendarEvent) => void;
  clearAll: () => void;
}

export const useAgentStore = create<AgentStoreState>()(
  persist(
    (set) => ({
      groqApiKey: '',
      setGroqApiKey: (key) => set({ groqApiKey: key }),

      stats: { emails_processed: 0, meetings_summarized: 0, tasks_total: 0, events_scheduled: 0 },
      incrementStat: (key) =>
        set((s) => ({ stats: { ...s.stats, [key]: s.stats[key] + 1 } })),

      tasks: [],
      meetings: [],
      emailHistory: [],
      events: [],

      addTask: (task) =>
        set((s) => ({
          tasks: [task, ...s.tasks].slice(0, 100),
          stats: { ...s.stats, tasks_total: s.stats.tasks_total + 1 },
        })),
      updateTask: (id, updates) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
      addMeeting: (meeting) =>
        set((s) => ({
          meetings: [meeting, ...s.meetings].slice(0, 50),
          stats: { ...s.stats, meetings_summarized: s.stats.meetings_summarized + 1 },
        })),
      addEmail: (email) =>
        set((s) => ({
          emailHistory: [email, ...s.emailHistory].slice(0, 50),
          stats: { ...s.stats, emails_processed: s.stats.emails_processed + 1 },
        })),
      addEvent: (event) =>
        set((s) => ({
          events: [...s.events, event].slice(0, 100),
          stats: { ...s.stats, events_scheduled: s.stats.events_scheduled + 1 },
        })),
      clearAll: () =>
        set({
          tasks: [],
          meetings: [],
          emailHistory: [],
          events: [],
          stats: { emails_processed: 0, meetings_summarized: 0, tasks_total: 0, events_scheduled: 0 },
        }),
    }),
    {
      name: 'autoflow-agent-store-v2',
      partialize: (s) => ({
        groqApiKey: s.groqApiKey,
        stats: s.stats,
        tasks: s.tasks,
        meetings: s.meetings,
        emailHistory: s.emailHistory,
        events: s.events,
      }),
    }
  )
);
