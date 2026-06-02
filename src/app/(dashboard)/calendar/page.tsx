'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, AlertTriangle, Lightbulb, Send, Sparkles } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import { Badge } from '@/components/ui/Badge'
import { toast } from '@/components/ui/Toast'
import { useAgentStore } from '@/store/useAgentStore'
import { formatTime } from '@/lib/utils'
import type { CalendarEvent } from '@/types'

const suggestions = [
  'Schedule a team standup every Monday at 9 AM',
  'Book a 1-hour client review for next Friday at 2 PM',
  'Add a product demo on December 10th at 3 PM',
  'Reschedule my 2 PM meeting to 4 PM tomorrow',
  'Show me all my upcoming events',
  'Schedule a deep work block tomorrow 10 AM–12 PM',
]

const eventColors = ['#7c6bff', '#ff6b9d', '#6bffcc', '#ffb86b']

export default function CalendarPage() {
  const { events, addEvent, incrementStat, geminiApiKey } = useAgentStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ message: string; suggestions: string[]; conflicts: string[] } | null>(null)

  const handleRequest = async () => {
    if (!input.trim()) { toast('Please enter a scheduling request', 'error'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/calendar-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request: input, existing_events: events, api_key: geminiApiKey }),
      })
      const data = await res.json()
      if (data.success) {
        const newEvents = data.all_events || []
        newEvents.forEach((ev: any) => addEvent(ev))
        setResult({ message: data.result.message, suggestions: data.result.suggestions || [], conflicts: data.result.conflicts || [] })
        incrementStat('events_scheduled')
        toast('Calendar updated!')
        setInput('')
      } else {
        toast('Failed to process request', 'error')
      }
    } catch {
      toast('Network error', 'error')
    } finally {
      setLoading(false)
    }
  }

  const sortedEvents = [...events].sort((a, b) => {
    const da = `${a.date} ${a.start_time}`
    const db = `${b.date} ${b.start_time}`
    return da > db ? 1 : -1
  })

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar title="AI Calendar" subtitle="Smart scheduling in plain English" actions={
        <Badge variant="amber" size="sm">{events.length} events</Badge>
      } />
      <div className="p-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Input */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-amber), transparent)' }} />
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,184,107,0.15)', border: '1px solid rgba(255,184,107,0.25)' }}>
                    <Calendar size={16} style={{ color: 'var(--accent-amber)' }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Calendar Assistant</h2>
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Smart scheduling in plain English</p>
                  </div>
                </div>
                <Badge variant="amber" size="sm">AI Agent</Badge>
              </div>
              <div className="space-y-3">
                <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                  What would you like to schedule?
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleRequest() }}
                  placeholder="e.g. Schedule a team sync for tomorrow at 10 AM with the engineering team"
                  style={{ width: '100%', minHeight: '110px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-instrument)', fontSize: '13px', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-amber)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-subtle)' }}>⌘ + Enter to submit</p>
                <motion.button
                  whileHover={!loading && input.trim() ? { translateY: -1 } : {}}
                  onClick={handleRequest}
                  disabled={loading || !input.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl"
                  style={{ background: 'var(--accent-amber)', color: '#080810', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', opacity: loading || !input.trim() ? 0.5 : 1, boxShadow: '0 4px 20px rgba(255,184,107,0.25)' }}
                >
                  <Send size={14} />
                  {loading ? 'Processing…' : 'Send to Calendar AI'}
                </motion.button>
              </div>
            </div>

            {/* Quick prompts */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-1.5 mb-3">
                <Lightbulb size={13} style={{ color: 'var(--accent-amber)' }} />
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quick Prompts</span>
              </div>
              <div className="space-y-1.5">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="w-full text-left px-3 py-2 rounded-lg" style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={(e) => { (e.currentTarget.style.borderColor = 'rgba(255,184,107,0.3)'); (e.currentTarget.style.color = 'var(--text)') }}
                    onMouseLeave={(e) => { (e.currentTarget.style.borderColor = 'var(--border-color)'); (e.currentTarget.style.color = 'var(--text-muted)') }}
                  >
                    ↗ {s}
                  </button>
                ))}
              </div>
            </div>

            {/* AI response */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  {result.message && (
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,184,107,0.05)', border: '1px solid rgba(255,184,107,0.15)' }}>
                      <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>🗓️ {result.message}</p>
                    </div>
                  )}
                  {result.conflicts?.length > 0 && (
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)' }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <AlertTriangle size={12} style={{ color: 'var(--danger)' }} />
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--danger)', textTransform: 'uppercase' }}>Conflicts Detected</span>
                      </div>
                      {result.conflicts.map((c, i) => <p key={i} style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>• {c}</p>)}
                    </div>
                  )}
                  {result.suggestions?.length > 0 && (
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(107,255,204,0.05)', border: '1px solid rgba(107,255,204,0.15)' }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Lightbulb size={12} style={{ color: 'var(--accent-cyan)' }} />
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>Suggestions</span>
                      </div>
                      {result.suggestions.map((s, i) => <p key={i} style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>💡 {s}</p>)}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Events List */}
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-amber), transparent)' }} />
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Scheduled Events</h2>
              <Badge variant="amber" size="sm">{events.length} total</Badge>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse" style={{ background: 'rgba(255,184,107,0.15)', border: '1px solid rgba(255,184,107,0.25)' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-amber)' }} />
                </div>
              </div>
            )}

            {!loading && events.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,184,107,0.1)', border: '1px solid rgba(255,184,107,0.2)' }}>
                  <Calendar size={24} style={{ color: 'var(--accent-amber)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>No events yet</h3>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>Use plain English to schedule your first event.</p>
              </div>
            )}

            {events.length > 0 && (
              <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
                {sortedEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--surface-2)', borderLeft: `3px solid ${eventColors[i % eventColors.length]}`, borderTop: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', borderRadius: '0 12px 12px 0', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-3)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{event.title}</h3>
                      {event.reminder_minutes && <Badge variant="amber" size="sm">🔔 {event.reminder_minutes}m</Badge>}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar size={11} style={{ color: 'var(--accent-amber)' }} />
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-amber)' }}>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                          {formatTime(event.start_time)} – {formatTime(event.end_time)}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={11} style={{ color: 'var(--text-subtle)' }} />
                          <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-subtle)' }}>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users size={11} style={{ color: 'var(--text-subtle)' }} />
                          <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-subtle)' }}>{event.attendees.join(', ')}</span>
                        </div>
                      )}
                      {event.description && <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{event.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
