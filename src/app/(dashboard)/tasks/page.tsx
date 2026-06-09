'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, Lightbulb, Circle, CheckCircle2, Clock, Sparkles } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import { Badge } from '@/components/ui/Badge'
import { toast } from '@/components/ui/Toast'
import { useAgentStore } from '@/store/useAgentStore'
import { priorityColor } from '@/lib/utils'
import type { Task } from '@/types'

const statusIcon = { pending: Circle, in_progress: Clock, completed: CheckCircle2 }
const priorityBadge: Record<string, 'red' | 'amber' | 'cyan'> = { high: 'red', medium: 'amber', low: 'cyan' }

const suggestions = [
  'Create a high priority task: Review Q4 budget by Friday',
  'Add task: Fix authentication bug — urgent',
  'Prioritize all my pending tasks',
  'Mark the API redesign as completed',
  'What should I work on today?',
  'Create a task list for product launch',
]

export default function TasksPage() {
  const { tasks, addTask, updateTask, incrementStat, groqApiKey } = useAgentStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [agentMessage, setAgentMessage] = useState<{ message: string; tip: string } | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')

  const handleProcess = async () => {
    if (!input.trim()) { toast('Please describe what you want to do', 'error'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/task-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, existing_tasks: tasks, api_key: groqApiKey }),
      })
      const data = await res.json()
      if (data.success) {
        const newTasks = data.all_tasks || []
        newTasks.forEach((t: any) => { if (!tasks.find(x => x.id === t.id)) addTask(t) })
        setAgentMessage({ message: data.result.message, tip: data.result.productivity_tip })
        incrementStat('tasks_total')
        toast('Task agent executed!')
        setInput('')
      } else {
        toast('Failed to process task', 'error')
      }
    } catch {
      toast('Network error', 'error')
    } finally {
      setLoading(false)
    }
  }

  const toggleComplete = (task: Task) => {
    updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' })
  }

  const filtered = tasks.filter(t => filter === 'all' || t.status === filter)
  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar title="Task Manager" subtitle="Natural language task automation powered by AI" />
      <div className="p-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Input */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)' }} />
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <CheckSquare size={16} style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Task Agent</h2>
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Natural language commands</p>
                  </div>
                </div>
                <Badge variant="cyan" size="sm">AI Agent</Badge>
              </div>
              <div className="space-y-3">
                <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                  What do you want to do?
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleProcess() }}
                  placeholder="e.g. Create a high priority task to review the client proposal by Thursday"
                  style={{ width: '100%', minHeight: '110px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-instrument)', fontSize: '13px', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-cyan)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-subtle)' }}>⌘ + Enter to submit</p>
                <motion.button
                  whileHover={!loading && input.trim() ? { translateY: -1 } : {}}
                  onClick={handleProcess}
                  disabled={loading || !input.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl"
                  style={{ background: 'var(--accent-cyan)', color: '#0F172A', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', opacity: loading || !input.trim() ? 0.5 : 1, boxShadow: '0 4px 20px rgba(16,185,129,0.25)' }}
                >
                  <CheckSquare size={14} />
                  {loading ? 'Processing…' : 'Run Task Agent'}
                </motion.button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-1.5 mb-3">
                <Lightbulb size={13} style={{ color: 'var(--accent-amber)' }} />
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Try these prompts</span>
              </div>
              <div className="space-y-1.5">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="w-full text-left px-3 py-2 rounded-lg transition-all" style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                    onMouseEnter={(e) => { (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'); (e.currentTarget.style.color = 'var(--text)') }}
                    onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'var(--border-color)'); (e.currentTarget.style.color = 'var(--text-muted)') }}
                  >
                    ↗ {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent response */}
            <AnimatePresence>
              {agentMessage && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-2xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>🤖 {agentMessage.message}</p>
                  {agentMessage.tip && <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-cyan)', marginTop: '8px' }}>💡 {agentMessage.tip}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Task Board */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)' }} />
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Task Board</h2>
              <Badge variant="cyan" size="sm">{tasks.length} total</Badge>
            </div>

            {/* Filter tabs */}
            {tasks.length > 0 && (
              <div className="flex gap-1.5 mb-4 flex-wrap">
                {(['all', 'pending', 'in_progress', 'completed'] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: '4px 10px', borderRadius: '6px', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', background: filter === f ? 'rgba(16,185,129,0.15)' : 'var(--surface-2)', color: filter === f ? 'var(--accent-cyan)' : 'var(--text-muted)', border: `1px solid ${filter === f ? 'rgba(16,185,129,0.3)' : 'var(--border-color)'}` }}>
                    {f.replace('_', ' ')} ({counts[f]})
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                </div>
              </div>
            )}

            {!loading && tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <CheckSquare size={24} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>No tasks yet</h3>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>Use natural language to create your first task.</p>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '500px' }}>
                {[...filtered].reverse().map((task, i) => {
                  const StatusIcon = statusIcon[task.status] ?? Circle
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', opacity: task.status === 'completed' ? 0.55 : 1, transition: 'all 0.15s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.25)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                    >
                      <button onClick={() => toggleComplete(task)} style={{ color: task.status === 'completed' ? 'var(--success)' : 'var(--text-subtle)', flexShrink: 0, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                        <StatusIcon size={16} />
                      </button>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: priorityColor(task.priority) }} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)', fontWeight: 500, textDecoration: task.status === 'completed' ? 'line-through' : 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</p>
                        {task.due_date && <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-subtle)' }}>Due {task.due_date}</p>}
                      </div>
                      <Badge variant={priorityBadge[task.priority] ?? 'neutral'} size="sm">{task.priority}</Badge>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
