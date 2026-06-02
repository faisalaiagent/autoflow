# ⚡ AutoFlow AI — Modern AI Workflow Automation Platform

A production-ready, SaaS-grade AI workflow automation platform built with **Next.js 15**, **Gemini 2.5 Flash**, **Supabase**, and **TypeScript**.

## 🤖 AI Agents

| Agent | Capability |
|-------|-----------|
| ✉️ **Email Reply Bot** | Paste any email → polished reply with tone control |
| 🎙️ **Meeting Summary Bot** | Transcript → summary, action items, decisions, sentiment |
| ✅ **Task Manager Agent** | Natural language → create, prioritize, complete tasks |
| 📅 **Calendar Assistant** | Plain English → schedule, reschedule, manage events |

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **AI**: Google Gemini 2.5 Flash via `@google/generative-ai`
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **State Management**: Zustand with localStorage persistence
- **UI**: Tailwind CSS + Framer Motion + Recharts
- **Fonts**: Syne + DM Mono + Instrument Sans

## 📁 Project Structure

```
src/
├── app/
│   ├── (landing)/          # Public landing page
│   ├── auth/               # Login & Signup pages
│   ├── dashboard/          # Protected dashboard
│   │   ├── page.tsx        # Overview + stats
│   │   ├── email/          # Email agent
│   │   ├── meeting/        # Meeting agent
│   │   ├── tasks/          # Task manager
│   │   ├── calendar/       # Calendar AI
│   │   ├── analytics/      # Charts & insights
│   │   └── settings/       # Configuration
│   └── api/
│       ├── email-agent/    # POST /api/email-agent
│       ├── meeting-agent/  # POST /api/meeting-agent
│       ├── task-agent/     # POST + GET /api/task-agent
│       ├── calendar-agent/ # POST + GET /api/calendar-agent
│       └── stats/          # GET /api/stats
├── components/
│   ├── layout/             # DashboardSidebar, DashboardTopbar
│   └── ui/                 # AgentCard, AIButton, AIInput, Badge, etc.
├── hooks/                  # useEmailAgent, useMeetingAgent, etc.
├── lib/                    # gemini.ts, supabase, utils
├── store/                  # Zustand stores (useAgentStore)
└── types/                  # TypeScript interfaces
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd autoflow
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
# Required: Get from https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Supabase for persistent storage & auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Run the development server
```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

## 🗄️ Supabase Setup (Optional)

Without Supabase, the app works perfectly with **localStorage persistence** (data stays in your browser).

To enable cloud persistence:

1. Create a project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:

```sql
-- Enable auth
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to auto-create profile on signup
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

3. Add your Supabase credentials to `.env.local`
4. Enable Google OAuth in Supabase Dashboard → Authentication → Providers

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Set environment variables in the Vercel dashboard:
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Docker
```bash
docker build -t autoflow .
docker run -p 3000:3000 --env-file .env.local autoflow
```

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/email-agent` | Generate email reply |
| `POST` | `/api/meeting-agent` | Summarize meeting transcript |
| `POST` | `/api/task-agent` | Manage tasks with AI |
| `GET`  | `/api/task-agent` | Get all tasks |
| `POST` | `/api/calendar-agent` | Schedule/manage events |
| `GET`  | `/api/calendar-agent` | Get all events |
| `GET`  | `/api/stats` | Dashboard statistics |
| `POST` | `/api/send-email` | Send via SMTP (optional) |

### Example: Email Agent
```bash
curl -X POST http://localhost:3000/api/email-agent \
  -H "Content-Type: application/json" \
  -d '{
    "email_content": "Hi, can we reschedule our meeting to Thursday?",
    "tone": "professional",
    "context": "Client is important, be flexible"
  }'
```

### Example: Task Agent
```bash
curl -X POST http://localhost:3000/api/task-agent \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Create a high priority task to review the Q4 budget by Friday",
    "existing_tasks": []
  }'
```

## 🔒 Security Notes

- **Never commit** your `.env.local` file
- Each user supplies their own `GEMINI_API_KEY`
- Supabase Row Level Security ensures data isolation
- All AI prompts are sanitized before sending to Gemini
- SMTP credentials are never stored — passed per-request only

## 📊 Features Overview

### Dashboard
- Live stats: emails processed, meetings summarized, tasks managed, events scheduled
- Task completion rate with progress visualization
- Agent quick-access cards
- Recent tasks activity feed

### Analytics Page
- Agent usage bar chart
- Weekly activity line chart
- Task status donut chart
- Meeting sentiment analysis
- Task priority distribution bars
- Completion rate radial gauge

### Settings Page
- Gemini API key configuration
- Default email tone preference
- Timezone selection for calendar
- Toggle: AI streaming, auto-save, compact mode, notifications
- Data management: view counts, clear localStorage

## 🛣️ Roadmap

- [ ] Google Calendar sync
- [ ] Gmail integration
- [ ] Slack notifications
- [ ] Streaming AI responses
- [ ] Team workspaces
- [ ] Webhook integrations
- [ ] Export to PDF/CSV
- [ ] Custom AI personas per agent

---

Built with ❤️ · Next.js 15 · Gemini 2.5 Flash · Supabase · Tailwind CSS
