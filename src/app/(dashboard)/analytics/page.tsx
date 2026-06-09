'use client'
import { useAgentStore } from '@/store/useAgentStore'
import TopBar from '@/components/shared/TopBar'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts'
import { Zap, Target, Mic, Calendar, TrendingUp, CheckSquare, Award, Mail } from 'lucide-react'
import { useMemo } from 'react'

const COLORS = { email: '#6366F1', meeting: '#8B5CF6', task: '#10B981', calendar: '#F59E0B' }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(22,22,37,0.95)', border: '1px solid rgba(99,102,241,0.25)', backdropFilter: 'blur(12px)', borderRadius: '10px', padding: '8px 12px' }}>
      {label && <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>}
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: entry.color }}>{entry.name}: {entry.value}</p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const { stats, tasks, meetings, events } = useAgentStore()

  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length
  const pendingTasks = tasks.filter(t => t.status === 'pending').length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
  const totalActions = stats.emails_processed + stats.meetings_summarized + stats.tasks_total + stats.events_scheduled

  const agentUsage = [
    { name: 'Email Bot', value: stats.emails_processed, fill: COLORS.email },
    { name: 'Meeting Bot', value: stats.meetings_summarized, fill: COLORS.meeting },
    { name: 'Task Agent', value: stats.tasks_total, fill: COLORS.task },
    { name: 'Calendar AI', value: stats.events_scheduled, fill: COLORS.calendar },
  ]

  const taskStatusData = [
    { name: 'Completed', value: completedTasks, fill: '#10B981' },
    { name: 'In Progress', value: inProgressTasks, fill: '#6366F1' },
    { name: 'Pending', value: pendingTasks, fill: '#F59E0B' },
  ]

  const sentimentData = useMemo(() => {
    const counts = { positive: 0, neutral: 0, negative: 0 }
    meetings.forEach(m => { if (m.sentiment in counts) counts[m.sentiment as keyof typeof counts]++ })
    return [
      { name: 'Positive', value: counts.positive, fill: '#10B981' },
      { name: 'Neutral', value: counts.neutral, fill: '#8888aa' },
      { name: 'Negative', value: counts.negative, fill: '#EF4444' },
    ]
  }, [meetings])

  const tasksByPriority = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, fill: '#EF4444' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, fill: '#F59E0B' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, fill: '#10B981' },
  ]

  const weeklyData = useMemo(() => {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      emails: stats.emails_processed > 0 ? Math.floor(Math.random() * 3) : 0,
      tasks: stats.tasks_total > 0 ? Math.floor(Math.random() * 4) + 1 : 0,
      meetings: stats.meetings_summarized > 0 ? Math.floor(Math.random() * 2) : 0,
    }))
  }, [stats])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar title="Analytics" subtitle="Track your AI agent performance and productivity metrics" />
      <div className="p-6 max-w-6xl space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total AI Actions', value: totalActions, icon: Zap, color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
            { label: 'Task Completion', value: `${completionRate}%`, icon: Target, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
            { label: 'Meetings Analyzed', value: meetings.length, icon: Mic, color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
            { label: 'Events Scheduled', value: events.length, icon: Calendar, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
          ].map((kpi, i) => {
            const Icon = kpi.icon
            return (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: kpi.bg, border: `1px solid ${kpi.color}25` }}>
                    <Icon size={16} style={{ color: kpi.color }} />
                  </div>
                  <TrendingUp size={12} style={{ color: 'var(--text-subtle)' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '26px', color: kpi.color, lineHeight: 1 }}>{kpi.value}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{kpi.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-5">
              <Award size={14} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Agent Usage</h3>
            </div>
            {totalActions === 0 ? (
              <div className="flex items-center justify-center h-48" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--font-dm-mono)', fontSize: '12px' }}>No data yet — start using the agents</div>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={agentUsage} barSize={28}>
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-subtle)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {agentUsage.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={14} style={{ color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Weekly Activity</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-dm-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-subtle)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="emails" stroke={COLORS.email} strokeWidth={2} dot={false} name="Emails" />
                <Line type="monotone" dataKey="tasks" stroke={COLORS.task} strokeWidth={2} dot={false} name="Tasks" />
                <Line type="monotone" dataKey="meetings" stroke={COLORS.meeting} strokeWidth={2} dot={false} name="Meetings" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Task Status */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-4"><CheckSquare size={14} style={{ color: 'var(--accent-cyan)' }} /><h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Task Status</h3></div>
            {tasks.length === 0 ? <div className="flex items-center justify-center h-36" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>No tasks yet</div> : (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={taskStatusData} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                      {taskStatusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {taskStatusData.map(({ name, value, fill }) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: fill }} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{name}</span></div>
                      <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '12px', color: fill }}>{value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Meeting Sentiment */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-4"><Mic size={14} style={{ color: 'var(--accent-pink)' }} /><h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Meeting Sentiment</h3></div>
            {meetings.length === 0 ? <div className="flex items-center justify-center h-36" style={{ color: 'var(--text-subtle)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>No meetings yet</div> : (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={62} paddingAngle={3} dataKey="value">
                      {sentimentData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {sentimentData.map(({ name, value, fill }) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: fill }} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{name}</span></div>
                      <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '12px', color: fill }}>{value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Completion Radial */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl p-5 flex flex-col" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-2"><Target size={14} style={{ color: 'var(--accent-cyan)' }} /><h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Completion Rate</h3></div>
            <div className="relative flex items-center justify-center" style={{ height: '160px', width: '100%' }}>
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="55%" outerRadius="80%" data={[{ value: completionRate, fill: '#10B981' }]} startAngle={90} endAngle={90 - (completionRate / 100) * 360}>
                  <RadialBar dataKey="value" fill="#10B981" background={{ fill: 'rgba(16,185,129,0.08)' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '28px', color: 'var(--accent-cyan)', lineHeight: 1 }}>{completionRate}%</span>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Complete</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[{ label: 'Done', value: completedTasks, color: '#10B981' }, { label: 'Active', value: inProgressTasks, color: '#6366F1' }, { label: 'Queued', value: pendingTasks, color: '#F59E0B' }].map(({ label, value, color }) => (
                <div key={label} className="text-center px-2 py-1.5 rounded-lg" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '16px', color }}>{value}</div>
                  <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Priority Distribution */}
        {tasks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-5"><Mail size={14} style={{ color: 'var(--accent)' }} /><h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Task Priority Distribution</h3></div>
            <div className="space-y-3">
              {tasksByPriority.map(({ name, value, fill }) => {
                const pct = tasks.length > 0 ? Math.round((value / tasks.length) * 100) : 0
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{name} Priority</span>
                      <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '12px', color: fill }}>{value} tasks ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: fill }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
