'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Copy, Trash2, Sparkles, Clock, CheckCircle, Settings, Key } from 'lucide-react'
import Link from 'next/link'
import TopBar from '@/components/shared/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { toast } from '@/components/ui/Toast'
import { useAgentStore } from '@/store/useAgentStore'
import { formatRelativeTime } from '@/lib/utils'
import type { EmailAgentResponse } from '@/types'

const toneOptions = [
  { value: 'professional', label: '💼 Professional' },
  { value: 'friendly', label: '😊 Friendly' },
  { value: 'formal', label: '🎩 Formal' },
  { value: 'casual', label: '👋 Casual' },
  { value: 'assertive', label: '💪 Assertive' },
]

export default function EmailPage() {
  const { geminiApiKey, emailHistory, addEmail, incrementStat } = useAgentStore()
  const [emailContent, setEmailContent] = useState('')
  const [tone, setTone] = useState('professional')
  const [context, setContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<EmailAgentResponse | null>(null)

  const handleGenerate = async () => {
    if (!emailContent.trim()) { toast('Please paste an email first', 'error'); return }
    if (!geminiApiKey) { toast('Add your Gemini API key in Settings first', 'error'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/email-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_content: emailContent, tone, context, api_key: geminiApiKey }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.result)
        addEmail({ id: Date.now().toString(), original_preview: emailContent.slice(0, 100), reply_preview: data.result.body.slice(0, 100), tone: tone as any, created_at: new Date().toISOString() })
        toast('✓ Email reply generated!')
      } else {
        toast(data.error || 'Failed to generate reply', 'error')
      }
    } catch {
      toast('Network error — check your connection', 'error')
    } finally {
      setLoading(false)
    }
  }

  const copyReply = () => {
    if (result?.body) { navigator.clipboard.writeText(result.body); toast('Copied to clipboard!') }
  }
  const clearForm = () => { setEmailContent(''); setContext(''); setResult(null) }

  return (
    <div className="min-h-screen">
      <TopBar title="Email Agent" subtitle="Generate polished email replies with AI" />

      {/* No API key warning */}
      {!geminiApiKey && (
        <div className="mx-4 md:mx-6 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <Key size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', flex: 1 }}>
            Add your Gemini API key to start generating replies.
          </p>
          <Link href="/settings" style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '12px', color: '#fbbf24', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <Settings size={12} /> Open Settings
          </Link>
        </div>
      )}

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Input Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Card className="p-6 bg-surface h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-iris-400/15 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-iris-400" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-text">Compose Reply</h2>
                  <p className="text-xs text-text-muted">Paste the email you received below</p>
                </div>
              </div>
              <div className="space-y-4">
                <Textarea label="Original Email" placeholder="Paste the email you want to reply to..." value={emailContent} onChange={e => setEmailContent(e.target.value)} className="min-h-[200px]" />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="Tone" options={toneOptions} value={tone} onChange={e => setTone(e.target.value)} />
                  <Input label="Context (optional)" placeholder="Any extra context..." value={context} onChange={e => setContext(e.target.value)} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="iris" onClick={handleGenerate} loading={loading} className="flex-1" disabled={!geminiApiKey}>
                    <Sparkles className="w-4 h-4" />
                    {loading ? 'Generating…' : 'Generate Reply'}
                  </Button>
                  <Button variant="ghost" onClick={clearForm} size="md"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Output Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Card className="p-6 bg-surface h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-jade-500/15 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-jade-500" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-text">Generated Reply</h2>
                    <p className="text-xs text-text-muted">AI-crafted response ready to send</p>
                  </div>
                </div>
                {result && (
                  <Button variant="jade" size="sm" onClick={copyReply}>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </Button>
                )}
              </div>
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <div className="p-3 rounded-xl bg-surface-raised border border-border">
                      <p className="text-xs font-mono text-text-muted mb-1">SUBJECT</p>
                      <p className="text-sm font-semibold text-text">{result.subject}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-raised border border-border">
                      <p className="text-xs font-mono text-text-muted mb-2">REPLY BODY</p>
                      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">{result.body}</p>
                    </div>
                    {result.key_points?.length > 0 && (
                      <div className="p-4 rounded-xl bg-iris-400/5 border border-iris-400/15">
                        <p className="text-xs font-mono text-iris-400 mb-2 uppercase tracking-wide">Key Points</p>
                        <ul className="space-y-1.5">
                          {result.key_points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                              <span className="text-iris-400 mt-0.5">▸</span> {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.suggested_followup && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                        <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-text-secondary">{result.suggested_followup}</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-64 text-text-muted">
                    <Mail className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">Your AI-generated reply will appear here</p>
                    <p className="text-xs mt-1 opacity-60">Paste an email and click Generate</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* Email history */}
        {emailHistory.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
            <Card className="p-6 bg-surface">
              <h2 className="font-display font-semibold text-text mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-muted" /> Email History
              </h2>
              <div className="space-y-2">
                {emailHistory.slice(0, 5).map((email) => (
                  <div key={email.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-raised hover:bg-surface-overlay transition-colors">
                    <Mail className="w-4 h-4 text-iris-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text truncate">{email.original_preview || 'Email reply'}</p>
                      <p className="text-xs text-text-muted">{formatRelativeTime(email.created_at)}</p>
                    </div>
                    <Badge variant="iris" size="sm">{email.tone}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
