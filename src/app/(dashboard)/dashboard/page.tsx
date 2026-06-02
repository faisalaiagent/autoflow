'use client'
import { motion } from 'framer-motion'
import { Mail, Video, CheckSquare, Calendar, TrendingUp, Sparkles, ArrowRight, Clock } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import Card from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAgentStore } from '@/store/useAgentStore'
import { formatRelativeTime, getStatusColor, priorityColor, cn } from '@/lib/utils'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const agentCards = [
  {
    href: '/email',
    icon: Mail,
    label: 'Email Agent',
    description: 'Generate polished replies with tone control',
    accent: 'iris',
    gradient: 'from-iris-400/20 to-iris-400/5',
    border: 'border-iris-400/20',
  },
  {
    href: '/meetings',
    icon: Video,
    label: 'Meeting Intelligence',
    description: 'Summaries, action items & decisions',
    accent: 'rose',
    gradient: 'from-rose-500/15 to-rose-500/5',
    border: 'border-rose-500/20',
  },
  {
    href: '/tasks',
    icon: CheckSquare,
    label: 'Task Manager',
    description: 'Natural language task creation & tracking',
    accent: 'jade',
    gradient: 'from-jade-500/15 to-jade-500/5',
    border: 'border-jade-500/20',
  },
  {
    href: '/calendar',
    icon: Calendar,
    label: 'AI Calendar',
    description: 'Schedule & manage events conversationally',
    accent: 'amber',
    gradient: 'from-amber-500/15 to-amber-500/5',
    border: 'border-amber-500/20',
  },
]

const iconColors: Record<string, string> = {
  iris: 'text-iris-400',
  rose: 'text-rose-500',
  jade: 'text-jade-500',
  amber: 'text-amber-500',
}

// Mock chart data (replace with real data from analytics)
const weeklyData = [
  { day: 'Mon', emails: 3, tasks: 5, meetings: 1 },
  { day: 'Tue', emails: 7, tasks: 8, meetings: 2 },
  { day: 'Wed', emails: 2, tasks: 12, meetings: 3 },
  { day: 'Thu', emails: 5, tasks: 6, meetings: 1 },
  { day: 'Fri', emails: 9, tasks: 15, meetings: 4 },
  { day: 'Sat', emails: 1, tasks: 3, meetings: 0 },
  { day: 'Sun', emails: 0, tasks: 2, meetings: 0 },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function DashboardPage() {
  const { stats, tasks, events } = useAgentStore()


  const statCards = [
    { label: 'Emails Processed', value: stats.emails_processed, icon: Mail, color: 'iris' },
    { label: 'Meetings Summarized', value: stats.meetings_summarized, icon: Video, color: 'rose' },
    { label: 'Tasks Created', value: stats.tasks_total, icon: CheckSquare, color: 'jade' },
    { label: 'Events Scheduled', value: stats.events_scheduled, icon: Calendar, color: 'amber' },
  ]

  return (
    <div className="min-h-screen">
      <TopBar
        title={`Welcome back 👋`}
        subtitle="Here's what your AI agents have been doing"
      />

      <div className="p-6 max-w-7xl mx-auto space-y-8">

        {/* Stat cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((s) => (
            <motion.div key={s.label} variants={item}>
              <Card className="p-5 bg-surface">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    s.color === 'iris' && 'bg-iris-400/10',
                    s.color === 'rose' && 'bg-rose-500/10',
                    s.color === 'jade' && 'bg-jade-500/10',
                    s.color === 'amber' && 'bg-amber-500/10',
                  )}>
                    <s.icon className={cn('w-5 h-5', iconColors[s.color])} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-jade-500" />
                </div>
                <p className="text-3xl font-display font-bold text-text">{s.value}</p>
                <p className="text-xs text-text-muted mt-1">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Agent launcher */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="xl:col-span-1 grid grid-cols-1 gap-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-iris-400" />
              <h2 className="text-sm font-display font-semibold text-text">AI Agents</h2>
            </div>
            {agentCards.map((a) => (
              <motion.div key={a.href} variants={item}>
                <Link href={a.href}>
                  <div className={cn(
                    'group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200',
                    'bg-gradient-to-r cursor-pointer hover:scale-[1.01]',
                    a.gradient, a.border,
                    'hover:shadow-lg hover:shadow-black/20'
                  )}>
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                      a.accent === 'iris' && 'bg-iris-400/15',
                      a.accent === 'rose' && 'bg-rose-500/15',
                      a.accent === 'jade' && 'bg-jade-500/15',
                      a.accent === 'amber' && 'bg-amber-500/15',
                    )}>
                      <a.icon className={cn('w-5 h-5', iconColors[a.accent])} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text">{a.label}</p>
                      <p className="text-xs text-text-muted truncate">{a.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-text group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Activity chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:col-span-2"
          >
            <Card className="p-5 h-full bg-surface">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-sm font-display font-semibold text-text">Weekly Activity</h2>
                  <p className="text-xs text-text-muted mt-0.5">AI agent usage this week</p>
                </div>
                <Badge variant="iris" size="sm">7 days</Badge>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b7cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b7cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4dd6a3" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4dd6a3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#5a5a82', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#5a5a82', fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#111128', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12 }}
                    labelStyle={{ color: '#e8e8f4' }}
                    itemStyle={{ color: '#9090b8' }}
                  />
                  <Area type="monotone" dataKey="emails" stroke="#8b7cf6" fill="url(#colorEmails)" strokeWidth={2} name="Emails" />
                  <Area type="monotone" dataKey="tasks" stroke="#4dd6a3" fill="url(#colorTasks)" strokeWidth={2} name="Tasks" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Recent tasks + upcoming events */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent tasks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-5 bg-surface">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-display font-semibold text-text">Recent Tasks</h2>
                <Link href="/tasks" className="text-xs text-iris-400 hover:text-iris-300 transition-colors flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-raised hover:bg-surface-overlay transition-colors">
                      <div className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        task.priority === 'high' && 'bg-red-400',
                        task.priority === 'medium' && 'bg-amber-400',
                        task.priority === 'low' && 'bg-jade-500',
                      )} />
                      <span className={cn('text-sm flex-1 truncate', task.status === 'completed' && 'line-through text-text-muted')}>
                        {task.title}
                      </span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono border"
                        style={{
                          borderColor: getStatusColor(task.status),
                          color: getStatusColor(task.status),
                        }}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No tasks yet. Go create some!</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Upcoming events */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card className="p-5 bg-surface">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-display font-semibold text-text">Upcoming Events</h2>
                <Link href="/calendar" className="text-xs text-iris-400 hover:text-iris-300 transition-colors flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {events.length > 0 ? (
                <div className="space-y-2">
                  {events.slice(0, 3).map((ev) => (
                    <div key={ev.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-raised border-l-2 border-iris-400/50 hover:bg-surface-overlay transition-colors">
                      <Clock className="w-4 h-4 text-iris-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text truncate">{ev.title}</p>
                        <p className="text-xs text-text-muted">{ev.date} · {ev.start_time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">No upcoming events. Schedule one!</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
