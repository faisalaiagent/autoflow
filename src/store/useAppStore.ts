import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Task, Meeting, EmailHistory, CalendarEvent, DashboardStats } from '@/types'

interface AppState {
  // Auth
  user: User | null
  accessToken: string | null
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
  logout: () => void

  // Dashboard
  stats: DashboardStats | null
  setStats: (stats: DashboardStats) => void

  // Tasks
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void

  // Meetings
  meetings: Meeting[]
  setMeetings: (meetings: Meeting[]) => void
  addMeeting: (meeting: Meeting) => void

  // Emails
  emailHistory: EmailHistory[]
  setEmailHistory: (emails: EmailHistory[]) => void
  addEmail: (email: EmailHistory) => void

  // Calendar
  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  addEvent: (event: CalendarEvent) => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeAgent: 'email' | 'meeting' | 'task' | 'calendar' | null
  setActiveAgent: (agent: 'email' | 'meeting' | 'task' | 'calendar' | null) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => set({ user: null, accessToken: null, tasks: [], meetings: [], emailHistory: [], events: [], stats: null }),

      // Dashboard
      stats: null,
      setStats: (stats) => set({ stats }),

      // Tasks
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
      updateTask: (id, updates) =>
  set((s) => ({
    tasks: s.tasks.map((t) =>
      String(t.id) === String(id)
        ? { ...t, ...updates }    : t ),  })),

      // Meetings
      meetings: [],
      setMeetings: (meetings) => set({ meetings }),
      addMeeting: (meeting) => set((s) => ({ meetings: [meeting, ...s.meetings] })),

      // Emails
      emailHistory: [],
      setEmailHistory: (emailHistory) => set({ emailHistory }),
      addEmail: (email) => set((s) => ({ emailHistory: [email, ...s.emailHistory] })),

      // Calendar
      events: [],
      setEvents: (events) => set({ events }),
      addEvent: (event) => set((s) => ({ events: [...s.events, event] })),

      // UI
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      activeAgent: null,
      setActiveAgent: (agent) => set({ activeAgent: agent }),
    }),
    {
      name: 'autoflow-store',
      partialize: (s) => ({ user: s.user, accessToken: s.accessToken, sidebarOpen: s.sidebarOpen }),
    }
  )
)
