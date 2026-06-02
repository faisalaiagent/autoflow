'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, CalendarEvent } from '@/types';

interface AgentStore {
  // Tasks (persisted across navigation)
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  
  // Calendar Events
  events: CalendarEvent[];
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  
  // Stats
  stats: {
    emailsProcessed: number;
    meetingsSummarized: number;
    tasksTotal: number;
    tasksCompleted: number;
    eventsScheduled: number;
  };
  incrementStat: (key: keyof AgentStore['stats']) => void;
  setStats: (stats: Partial<AgentStore['stats']>) => void;
  
  // UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
      updateTask: (id, updates) =>
        set((s) => ({
         tasks: s.tasks.map((t) => (String(t.id) === String(id) ? { ...t, ...updates } : t)),
        })),

      events: [],
      setEvents: (events) => set({ events }),
      addEvent: (event) => set((s) => ({ events: [...s.events, event] })),

      stats: {
        emailsProcessed: 0,
        meetingsSummarized: 0,
        tasksTotal: 0,
        tasksCompleted: 0,
        eventsScheduled: 0,
      },
      incrementStat: (key) =>
        set((s) => ({ stats: { ...s.stats, [key]: s.stats[key] + 1 } })),
      setStats: (newStats) =>
        set((s) => ({ stats: { ...s.stats, ...newStats } })),

      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: 'autoflow-store' }
  )
);
