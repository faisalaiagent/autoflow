// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

// ─── Email Agent ─────────────────────────────────────────────────────────────
export type EmailTone = 'professional' | 'friendly' | 'formal' | 'concise' | 'empathetic';

export interface EmailReplyRequest {
  email_content: string;
  tone: EmailTone;
  context?: string;
}

export interface EmailReplyResult {
  subject: string;
  body: string;
  key_points: string[];
  suggested_followup?: string;
}

export interface EmailHistoryItem {
  id: string;
  original_preview: string;
  reply_preview: string;
  tone: EmailTone;
  created_at: string;
}

// ─── Meeting Agent ────────────────────────────────────────────────────────────
export interface ActionItem {
  task: string;
  owner: string;
  deadline: string;
}

export interface MeetingSummaryRequest {
  transcript: string;
  meeting_title: string;
}

export interface MeetingSummaryResult {
  title: string;
  summary: string;
  action_items: ActionItem[];
  decisions: string[];
  key_topics: string[];
  next_meeting_agenda: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: string;
}

// ─── Task Agent ───────────────────────────────────────────────────────────────
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date?: string | null;
  tags?: string[];
  estimated_hours?: number | null;
}

export interface TaskAgentResult {
  action: 'create' | 'update' | 'prioritize' | 'analyze' | 'complete';
  tasks: Task[];
  message: string;
  productivity_tip: string;
}

// ─── Calendar Agent ───────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  description?: string;
  attendees?: string[];
  location?: string;
  reminder_minutes?: number;
}

export interface CalendarAgentResult {
  action: 'schedule' | 'reschedule' | 'cancel' | 'view' | 'remind';
  events: CalendarEvent[];
  conflicts: string[];
  suggestions: string[];
  message: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface DashboardStats {
  emails_processed: number;
  meetings_summarized: number;
  tasks_total: number;
  tasks_completed: number;
  events_scheduled: number;
  recent_emails: EmailHistoryItem[];
  recent_tasks: Task[];
  upcoming_events: CalendarEvent[];
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  error?: string;
  all_tasks?: Task[];
  all_events?: CalendarEvent[];
}

// ─── Agent Response Types (aliases for (dashboard) route group compat) ────────
export type EmailAgentResponse = EmailReplyResult;

export interface MeetingAgentResponse {
  summary: string;
  actionItems: ActionItem[];
  decisions: string[];
  keyTopics: string[];
  nextMeetingAgenda: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface TaskAgentResponse {
  action: string;
  tasks: Partial<Task>[];
  message: string;
  productivityTip: string;
}

export interface CalendarAgentResponse {
  action: string;
  events: Partial<CalendarEvent>[];
  conflicts: string[];
  suggestions: string[];
  message: string;
}

// ─── Meeting type for (dashboard) store ─────────────────────────────────────
export type Meeting = MeetingSummaryResult;
export type EmailHistory = EmailHistoryItem;
