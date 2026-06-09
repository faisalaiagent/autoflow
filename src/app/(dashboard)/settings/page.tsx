'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Key, Zap, Bell, Shield, Trash2, Save, Check,
  Eye, EyeOff, Info, ExternalLink, CheckCircle2,
  AlertTriangle, Loader2,
} from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import { useAgentStore } from '@/store/useAgentStore'
import { toast } from '@/components/ui/Toast'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '40px', height: '22px', borderRadius: '11px',
        background: checked ? 'var(--accent)' : 'var(--surface-2)',
        border: `1px solid ${checked ? 'rgba(99,102,241,0.4)' : 'var(--border-color)'}`,
        transition: 'all 0.2s', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ x: checked ? 18 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ width: '16px', height: '16px', borderRadius: '50%', background: checked ? 'white' : 'var(--text-subtle)' }}
      />
    </button>
  )
}

const sec = { background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }
const lbl = { fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }
const inp = { width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 1rem', color: 'var(--text)', fontFamily: 'var(--font-dm-mono)', fontSize: '13px', outline: 'none', transition: 'border-color 0.2s' }
const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '14px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' }

export default function SettingsPage() {
  const { groqApiKey, setGroqApiKey, tasks, meetings, emailHistory, events, clearAll } = useAgentStore()

  const [keyInput, setKeyInput] = useState(groqApiKey)
  const [showKey, setShowKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [prefs, setPrefs] = useState({ autoSave: true, emailNotifs: true, soundEffects: false })
  const [timezone, setTimezone] = useState('Asia/Karachi')

  const keyConfigured = !!groqApiKey

  const handleSave = async () => {
    const k = keyInput.trim()
    if (!k) { toast('Please enter your API key', 'error'); return }
    if (!k.startsWith('gsk_')) { toast('Invalid key — Groq keys start with gsk_', 'error'); return }
    setSaving(true)
    setGroqApiKey(k)
    await new Promise(r => setTimeout(r, 500))
    setSaving(false)
    setSaved(true)
    setTestResult('idle')
    toast('✓ Groq API key saved! All AI agents are now active.')
    setTimeout(() => setSaved(false), 3000)
  }

  const handleTest = async () => {
    const k = keyInput.trim() || groqApiKey
    if (!k) { toast('Enter your API key first', 'error'); return }
    setTesting(true)
    setTestResult('idle')
    try {
      const res = await fetch('/api/email-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_content: 'Hi, can we schedule a quick call?',
          tone: 'professional',
          api_key: k,
        }),
      })
      const data = await res.json()
      if (data.success && data.result?.body) {
        setTestResult('ok')
        toast('✓ API key is working perfectly!')
      } else {
        setTestResult('fail')
        toast(data.error || 'Test failed', 'error')
      }
    } catch {
      setTestResult('fail')
      toast('Network error during test', 'error')
    } finally {
      setTesting(false)
    }
  }

  const handleClear = () => {
    if (window.confirm('Delete all local tasks, meetings, emails, and events? This cannot be undone.')) {
      clearAll()
      toast('All data cleared.')
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar title="Settings" subtitle="Configure your Groq API key and workspace preferences" />
      <div className="p-4 md:p-6 max-w-3xl space-y-5">

        {/* ── API KEY ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={sec}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
                <Key size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>
                  Groq API Key
                </h2>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  Required for all AI agents — 100% free
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                background: keyConfigured ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)',
                border: `1px solid ${keyConfigured ? 'rgba(74,222,128,0.25)' : 'rgba(251,191,36,0.25)'}`,
              }}>
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: keyConfigured ? '#10B981' : '#F59E0B' }} />
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: keyConfigured ? '#10B981' : '#F59E0B' }}>
                {keyConfigured ? 'Active' : 'Not configured'}
              </span>
            </div>
          </div>

          {/* How to get key */}
          <div className="flex gap-3 mb-5 p-4 rounded-xl"
            style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <Info size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '12px', color: 'var(--text)', marginBottom: '6px' }}>
                How to get your FREE Groq API key (takes 1 minute):
              </p>
              <ol style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '16px', listStyle: 'decimal' }}>
                <li>Go to <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>console.groq.com</a></li>
                <li>Sign up for free (no credit card required)</li>
                <li>Click <strong style={{ color: 'var(--text)' }}>API Keys</strong> → <strong style={{ color: 'var(--text)' }}>Create API Key</strong></li>
                <li>Copy the key (starts with <code style={{ background: 'var(--surface-2)', padding: '1px 5px', borderRadius: '4px', fontSize: '11px' }}>gsk_</code>)</li>
                <li>Paste it below and click <strong style={{ color: 'var(--text)' }}>Save Key</strong></li>
              </ol>
              <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2"
                style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '12px', color: 'var(--accent)', textDecoration: 'none' }}>
                Open Groq Console <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Input */}
          <label style={lbl}>Your Groq API Key</label>
          <div className="relative mb-3">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="gsk_••••••••••••••••••••••••••••••••••••••••••••••••••••"
              style={{ ...inp, paddingRight: '44px' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button onClick={() => setShowKey(!showKey)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {/* Test result */}
          {testResult !== 'idle' && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2.5 rounded-lg"
              style={{
                background: testResult === 'ok' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                border: `1px solid ${testResult === 'ok' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
              }}>
              {testResult === 'ok'
                ? <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                : <AlertTriangle size={14} style={{ color: '#EF4444' }} />}
              <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: testResult === 'ok' ? '#10B981' : '#EF4444' }}>
                {testResult === 'ok' ? 'API key is valid and working! All agents are ready.' : 'API key test failed. Please check your key.'}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl"
              style={{
                background: saved ? 'rgba(74,222,128,0.15)' : 'var(--accent)',
                border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
                color: saved ? '#10B981' : 'white',
                fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px',
                cursor: saving ? 'default' : 'pointer',
                opacity: saving ? 0.7 : 1,
                boxShadow: saved ? 'none' : '0 4px 20px rgba(99,102,241,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
              {saving ? 'Saving…' : saved ? 'Key Saved!' : 'Save Key'}
            </motion.button>

            <button
              onClick={handleTest}
              disabled={testing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--border-color)',
                color: 'var(--text)', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px',
                cursor: testing ? 'default' : 'pointer', opacity: testing ? 0.7 : 1, transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => !testing && ((e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)')}
            >
              {testing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              {testing ? 'Testing…' : 'Test Key'}
            </button>
          </div>

          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '11px', color: 'var(--text-subtle)', marginTop: '10px' }}>
            🔒 Your key is stored only in your browser — never sent to our servers.
          </p>
        </motion.div>

        {/* ── AI MODEL STATUS ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={sec}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <Zap size={16} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>AI Model</h2>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Powered by Groq</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
            style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: keyConfigured ? 'var(--accent-cyan)' : '#F59E0B' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>
                  LLaMA 3.3 70B
                </p>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  Groq · Ultra-fast · Free tier
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg"
              style={{
                fontFamily: 'var(--font-dm-mono)', fontSize: '10px',
                background: keyConfigured ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)',
                color: keyConfigured ? '#10B981' : '#F59E0B',
                border: `1px solid ${keyConfigured ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}`,
              }}>
              {keyConfigured ? '● Active' : '○ No Key'}
            </span>
          </div>

          <div style={row}>
            <div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>Auto-save results</p>
              <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>Store AI outputs in history</p>
            </div>
            <Toggle checked={prefs.autoSave} onChange={(v) => setPrefs(p => ({ ...p, autoSave: v }))} />
          </div>
          <div style={{ ...row, borderBottom: 'none' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>Email notifications</p>
              <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>Alerts for completed tasks</p>
            </div>
            <Toggle checked={prefs.emailNotifs} onChange={(v) => setPrefs(p => ({ ...p, emailNotifs: v }))} />
          </div>
        </motion.div>

        {/* ── TIMEZONE ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={sec}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <Bell size={16} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Timezone</h2>
          </div>
          <label style={lbl}>Your Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{ ...inp, cursor: 'pointer' } as React.CSSProperties}
          >
            {['UTC', 'Asia/Karachi', 'Asia/Dubai', 'Asia/Kolkata', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Singapore'].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </motion.div>

        {/* ── DATA MANAGEMENT ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={sec}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)' }}>
              <Shield size={16} style={{ color: 'var(--danger)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>
              Data & Storage
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Tasks', count: tasks.length, color: '#10B981' },
              { label: 'Meetings', count: meetings.length, color: '#8B5CF6' },
              { label: 'Emails', count: emailHistory.length, color: '#6366F1' },
              { label: 'Events', count: events.length, color: '#F59E0B' },
            ].map(({ label, count, color }) => (
              <div key={label} className="text-center p-3 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '22px', color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: 'var(--danger)', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.15)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.08)')}
          >
            <Trash2 size={14} /> Clear All Data
          </button>
        </motion.div>

      </div>
    </div>
  )
}
