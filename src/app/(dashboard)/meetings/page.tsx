'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Sparkles, CheckCircle, Target, Calendar, TrendingUp, BookOpen, Copy, Check } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Input from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { toast } from '@/components/ui/Toast'
import { useAgentStore } from '@/store/useAgentStore'
import type { MeetingSummaryResult } from '@/types'

const sentimentConfig = {
  positive: { color: 'var(--success)', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
  neutral: { color: 'var(--text-muted)', bg: 'rgba(136,136,170,0.1)', border: 'rgba(136,136,170,0.2)' },
  negative: { color: 'var(--danger)', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
}

const sentimentEmoji = { positive: '😊', neutral: '😐', negative: '😟' }

const exampleTranscript = `Sarah: Good morning everyone. Let's kick off the Q4 planning meeting.
John: Thanks Sarah. I think our main priorities should be the mobile app launch and scaling the infrastructure.
Sarah: Agreed. John, can you own the infrastructure scaling by November 15th?
John: Absolutely. I'll put together a detailed plan by end of this week.
Mike: For the mobile app, we need to finalize the design by October 25th. I can lead that.
Sarah: Perfect. We also need to decide on the marketing strategy.
John: I motion we go with a phased rollout — beta users first, then public launch.
Sarah: All in favor? Great, that's decided. Mike, please draft the beta user outreach by next Friday.
Mike: Will do. Should we schedule a follow-up to review progress?
Sarah: Yes — let's meet again in two weeks. I'll send the invite.`

export default function MeetingsPage() {
  const { addMeeting, incrementStat, meetings, groqApiKey } = useAgentStore()
  const [title, setTitle] = useState('')
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MeetingSummaryResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'summarize' | 'history'>('summarize')

  const handleSummarize = async () => {
    if (!transcript.trim()) { toast('Please paste a meeting transcript', 'error'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/meeting-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, meeting_title: title || 'Team Meeting', api_key: groqApiKey }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.result)
        addMeeting(data.result)
        incrementStat('meetings_summarized')
        toast('Meeting summarized successfully!')
      } else {
        toast('Failed to summarize meeting', 'error')
      }
    } catch {
      toast('Network error — check your connection', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    const text = `Meeting: ${result.title}\n\nSummary:\n${result.summary}\n\nAction Items:\n${result.action_items.map(a => `• ${a.task} (${a.owner}, ${a.deadline})`).join('\n')}\n\nDecisions:\n${result.decisions.map(d => `• ${d}`).join('\n')}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast('Summary copied to clipboard!')
  }

  const s = result?.sentiment ? sentimentConfig[result.sentiment] : null

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar
        title="Meeting Intelligence"
        subtitle="Transform transcripts into actionable insights instantly"
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('summarize')}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: activeTab === 'summarize' ? 'rgba(255,107,157,0.15)' : 'var(--surface-2)',
                color: activeTab === 'summarize' ? 'var(--accent-pink)' : 'var(--text-muted)',
                border: `1px solid ${activeTab === 'summarize' ? 'rgba(255,107,157,0.3)' : 'var(--border-color)'}`,
                fontFamily: 'var(--font-dm-mono)', fontSize: '10px', cursor: 'pointer',
              }}
            >
              Summarize
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className="px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: activeTab === 'history' ? 'rgba(255,107,157,0.15)' : 'var(--surface-2)',
                color: activeTab === 'history' ? 'var(--accent-pink)' : 'var(--text-muted)',
                border: `1px solid ${activeTab === 'history' ? 'rgba(255,107,157,0.3)' : 'var(--border-color)'}`,
                fontFamily: 'var(--font-dm-mono)', fontSize: '10px', cursor: 'pointer',
              }}
            >
              History ({meetings.length})
            </button>
          </div>
        }
      />

      <div className="p-6 max-w-6xl">
        {activeTab === 'summarize' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Input Panel */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-pink), transparent)' }} />
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,157,0.15)', border: '1px solid rgba(255,107,157,0.25)' }}>
                      <Mic size={16} style={{ color: 'var(--accent-pink)' }} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Meeting Summarizer</h2>
                      <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Powered by Groq LLaMA 3</p>
                    </div>
                  </div>
                  <Badge variant="pink" size="sm">AI Agent</Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                      Meeting Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q4 Planning Sprint"
                      style={{ width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-instrument)', fontSize: '13px', outline: 'none' }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-pink)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                      Transcript or Notes
                    </label>
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder={exampleTranscript}
                      style={{ width: '100%', minHeight: '220px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-instrument)', fontSize: '13px', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--accent-pink)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <motion.button
                      whileHover={!loading && transcript.trim() ? { translateY: -1 } : {}}
                      whileTap={!loading && transcript.trim() ? { scale: 0.98 } : {}}
                      onClick={handleSummarize}
                      disabled={loading || !transcript.trim()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl"
                      style={{
                        background: 'var(--accent-pink)',
                        color: 'white',
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: '13px',
                        border: 'none',
                        cursor: loading || !transcript.trim() ? 'not-allowed' : 'pointer',
                        opacity: loading || !transcript.trim() ? 0.5 : 1,
                        boxShadow: '0 4px 20px rgba(255,107,157,0.3)',
                      }}
                    >
                      <Mic size={14} />
                      {loading ? 'Analyzing…' : 'Summarize Meeting'}
                    </motion.button>
                    <button
                      onClick={() => { setTranscript(''); setTitle(''); setResult(null); }}
                      style={{ padding: '0 16px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                    >
                      Clear
                    </button>
                  </div>
                  <button
                    onClick={() => setTranscript(exampleTranscript)}
                    style={{ width: '100%', padding: '8px', background: 'rgba(255,107,157,0.05)', border: '1px dashed rgba(255,107,157,0.2)', borderRadius: '8px', color: 'var(--accent-pink)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.03em' }}
                  >
                    ↗ Load example transcript
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="rounded-2xl p-6 overflow-y-auto" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', maxHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-60" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-pink), transparent)' }} />
                <div className="flex items-center justify-between mb-5">
                  <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Meeting Intelligence</h2>
                  {result && (
                    <div className="flex items-center gap-2">
                      {s && (
                        <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontFamily: 'var(--font-dm-mono)', fontSize: '10px' }}>
                          {sentimentEmoji[result.sentiment]} {result.sentiment}
                        </span>
                      )}
                      <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)', fontFamily: 'var(--font-dm-mono)', fontSize: '11px', cursor: 'pointer' }}>
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>

                {loading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse" style={{ background: 'rgba(255,107,157,0.15)', border: '1px solid rgba(255,107,157,0.25)' }}>
                      <Sparkles size={20} style={{ color: 'var(--accent-pink)' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>Analyzing meeting with Groq AI…</span>
                  </div>
                )}

                {!loading && !result && (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.2)' }}>
                      <Mic size={24} style={{ color: 'var(--accent-pink)' }} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Awaiting transcript</h3>
                    <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', maxWidth: '260px' }}>Paste meeting notes or a transcript to extract insights, action items, and decisions.</p>
                  </div>
                )}

                <AnimatePresence>
                  {!loading && result && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 overflow-y-auto" style={{ maxHeight: '65vh' }}>
                      {/* Summary */}
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,107,157,0.06)', border: '1px solid rgba(255,107,157,0.15)' }}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <BookOpen size={12} style={{ color: 'var(--accent-pink)' }} />
                          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Summary</span>
                        </div>
                        <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.7 }}>{result.summary}</p>
                      </div>

                      {/* Action Items */}
                      {result.action_items?.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <CheckCircle size={12} style={{ color: 'var(--accent-cyan)' }} />
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Action Items ({result.action_items.length})</span>
                          </div>
                          <div className="space-y-2">
                            {result.action_items.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                                <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(107,255,204,0.15)', border: '1px solid rgba(107,255,204,0.25)' }}>
                                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--accent-cyan)', fontWeight: 700 }}>{i + 1}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{item.task}</p>
                                  <div className="flex gap-3 mt-1 flex-wrap">
                                    {item.owner && <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent)' }}>@{item.owner}</span>}
                                    {item.deadline && <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Due: {item.deadline}</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decisions */}
                      {result.decisions?.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Target size={12} style={{ color: 'var(--accent-amber)' }} />
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Decisions Made</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {result.decisions.map((d, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-full" style={{ background: 'rgba(107,255,204,0.08)', border: '1px solid rgba(107,255,204,0.2)', color: 'var(--accent-cyan)', fontFamily: 'var(--font-instrument)', fontSize: '12px' }}>
                                ✓ {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Next Agenda */}
                      {result.next_meeting_agenda?.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <Calendar size={12} style={{ color: 'var(--accent-pink)' }} />
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent-pink)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Next Meeting Agenda</span>
                          </div>
                          <ul className="space-y-1.5">
                            {result.next_meeting_agenda.map((item, i) => (
                              <li key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                                <span style={{ color: 'var(--accent-pink)', fontSize: '12px' }}>▸</span>
                                <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Key Topics */}
                      {result.key_topics?.length > 0 && (
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <TrendingUp size={12} style={{ color: 'var(--accent)' }} />
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Key Topics</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {result.key_topics.map((t, i) => (
                              <Badge key={i} variant="purple" size="sm">{t}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {meetings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.2)' }}>
                  <Mic size={24} style={{ color: 'var(--accent-pink)' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>No meetings yet</p>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>Summarized meetings will appear here.</p>
                <button onClick={() => setActiveTab('summarize')} style={{ marginTop: '8px', padding: '8px 20px', background: 'var(--accent-pink)', color: 'white', border: 'none', borderRadius: '10px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                  Summarize a Meeting
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {[...meetings].reverse().map((m, i) => {
                  const sc = sentimentConfig[m.sentiment] || sentimentConfig.neutral
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>{m.title}</h3>
                          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{m.timestamp}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontFamily: 'var(--font-dm-mono)', fontSize: '10px' }}>
                          {m.sentiment}
                        </span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '12px' }}>{m.summary}</p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="pink" size="sm">{m.action_items?.length || 0} actions</Badge>
                        <Badge variant="cyan" size="sm">{m.decisions?.length || 0} decisions</Badge>
                        {m.key_topics?.slice(0, 3).map((t, i) => <Badge key={i} variant="purple" size="sm">{t}</Badge>)}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
