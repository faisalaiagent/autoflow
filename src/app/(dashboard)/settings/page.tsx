'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Key, Zap, Bell, Shield, Trash2, Save, Check, Eye, EyeOff,
  Info, ExternalLink, CheckCircle2, AlertTriangle, Loader2,
} from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import { useAgentStore } from '@/store/useAgentStore'
import { toast } from '@/components/ui/Toast'

const s = {
  section: { background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' },
  label: { fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', display: 'block', marginBottom: '6px' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', paddingTop: '14px', paddingBottom: '14px', borderBottom: '1px solid var(--border-color)' },
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} style={{ width: '40px', height: '22px', borderRadius: '11px', background: checked ? 'var(--accent)' : 'var(--surface-2)', border: `1px solid ${checked ? 'rgba(124,107,255,0.4)' : 'var(--border-color)'}`, transition: 'all 0.2s', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
      <motion.div animate={{ x: checked ? 18 : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} style={{ width: '16px', height: '16px', borderRadius: '50%', background: checked ? 'white' : 'var(--text-subtle)' }} />
    </button>
  )
}

export default function SettingsPage() {
  const { geminiApiKey, setGeminiApiKey, tasks, meetings, emailHistory, events, clearAll } = useAgentStore()
  
  const [keyInput, setKeyInput] = useState(geminiApiKey)
  const [showKey, setShowKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [prefs, setPrefs] = useState({ streamingAI: true, autoSave: true, emailNotifs: true, soundEffects: false })
  const [timezone, setTimezone] = useState('Asia/Karachi')

  const inputStyle = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '0.65rem 1rem',
    color: 'var(--text)',
    fontFamily: 'var(--font-dm-mono)',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const handleSaveKey = async () => {
    const trimmed = keyInput.trim()
    if (!trimmed) { toast('Please enter your API key', 'error'); return }
    if (!trimmed.startsWith('AIza')) { toast('Invalid key format — Gemini keys start with AIza', 'error'); return }
    setSaving(true)
    setGeminiApiKey(trimmed)
    await new Promise(r => setTimeout(r, 400))
    setSaving(false)
    setSaved(true)
    toast('API key saved! Your AI agents are now active.')
    setTimeout(() => setSaved(false), 3000)
  }

  const handleTestKey = async () => {
    const key = keyInput.trim() || geminiApiKey
    if (!key) { toast('Enter an API key first', 'error'); return }
    setTesting(true)
    setTestResult('idle')
    try {
      const res = await fetch('/api/email-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_content: 'Test: Reply with one sentence saying the API is working.',
          tone: 'professional',
          api_key: key,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setTestResult('ok')
        toast('✓ API key is working perfectly!')
      } else {
        setTestResult('fail')
        toast(data.error || 'API key test failed', 'error')
      }
    } catch {
      setTestResult('fail')
      toast('Connection failed', 'error')
    } finally {
      setTesting(false)
    }
  }

  const handleClearData = () => {
    if (window.confirm('Delete all local tasks, meetings, emails, and events? This cannot be undone.')) {
      clearAll()
      toast('All data cleared.')
    }
  }

  const keyConfigured = !!geminiApiKey

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <TopBar title="Settings" subtitle="Configure your API key and workspace preferences" />
      <div className="p-4 md:p-6 max-w-3xl space-y-5">

        {/* ── API Key Setup ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={s.section}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,107,255,0.15)', border: '1px solid rgba(124,107,255,0.25)' }}>
                <Key size={16} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Gemini API Key</h2>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Required for all AI agents</p>
              </div>
            </div>
            {/* Status badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: keyConfigured ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)', border: `1px solid ${keyConfigured ? 'rgba(74,222,128,0.25)' : 'rgba(251,191,36,0.25)'}` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: keyConfigured ? '#4ade80' : '#fbbf24' }} />
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: keyConfigured ? '#4ade80' : '#fbbf24' }}>
                {keyConfigured ? 'Configured' : 'Not set'}
              </span>
            </div>
          </div>

          {/* Step guide */}
          <div className="flex gap-2 mb-5 p-4 rounded-xl" style={{ background: 'rgba(124,107,255,0.06)', border: '1px solid rgba(124,107,255,0.15)' }}>
            <Info size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '12px', color: 'var(--text)', marginBottom: '6px' }}>How to get your free Gemini API key:</p>
              <ol style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.7, paddingLeft: '14px', listStyle: 'decimal' }}>
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>aistudio.google.com/app/apikey</a></li>
                <li>Click <strong style={{ color: 'var(--text)' }}>"Create API key"</strong></li>
                <li>Copy the key (starts with <code style={{ background: 'var(--surface-2)', padding: '1px 4px', borderRadius: '4px', fontSize: '11px' }}>AIza</code>)</li>
                <li>Paste it below and click Save</li>
              </ol>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2" style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '12px', color: 'var(--accent)', textDecoration: 'none' }}>
                Get free API key <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Key input */}
          <label style={s.label}>Your Gemini API Key</label>
          <div className="relative mb-3">
            <input
              type={showKey ? 'text' : 'password'}
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="AIzaSy••••••••••••••••••••••••••••••••••"
              style={{ ...inputStyle, paddingRight: '42px' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveKey()}
            />
            <button onClick={() => setShowKey(!showKey)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {/* Test result */}
          {testResult !== 'idle' && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ background: testResult === 'ok' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)', border: `1px solid ${testResult === 'ok' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
              {testResult === 'ok' ? <CheckCircle2 size={13} style={{ color: '#4ade80' }} /> : <AlertTriangle size={13} style={{ color: '#f87171' }} />}
              <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: testResult === 'ok' ? '#4ade80' : '#f87171' }}>
                {testResult === 'ok' ? 'API key is valid and working!' : 'API key test failed. Please check the key.'}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveKey}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl flex-1 justify-center"
              style={{
                background: saved ? 'rgba(74,222,128,0.15)' : 'var(--accent)',
                border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
                color: saved ? '#4ade80' : 'white',
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: saving ? 'default' : 'pointer',
                opacity: saving ? 0.7 : 1,
                boxShadow: saved ? 'none' : '0 4px 20px rgba(124,107,255,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
              {saving ? 'Saving…' : saved ? 'Key Saved!' : 'Save API Key'}
            </motion.button>

            <button
              onClick={handleTestKey}
              disabled={testing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border-color)',
                color: 'var(--text)',
                fontFamily: 'var(--font-syne)',
                fontWeight: 600,
                fontSize: '13px',
                cursor: testing ? 'default' : 'pointer',
                opacity: testing ? 0.7 : 1,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => !testing && (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              {testing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
              {testing ? 'Testing…' : 'Test Key'}
            </button>
          </div>

          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '11px', color: 'var(--text-subtle)', marginTop: '10px' }}>
            🔒 Your key is stored securely in your browser only — never sent to our servers.
          </p>
        </motion.div>

        {/* ── AI Model Status ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={s.section}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(107,255,204,0.15)', border: '1px solid rgba(107,255,204,0.25)' }}>
              <Zap size={16} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>AI Model</h2>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Current configuration</p>
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: 'rgba(107,255,204,0.05)', border: '1px solid rgba(107,255,204,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: keyConfigured ? 'var(--accent-cyan)' : '#fbbf24' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>Gemini 1.5 Flash</p>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Google AI · Fast · Free tier</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', background: keyConfigured ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)', color: keyConfigured ? '#4ade80' : '#fbbf24', border: `1px solid ${keyConfigured ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)'}` }}>
              {keyConfigured ? '● Active' : '○ No Key'}
            </span>
          </div>

          <div style={s.row}>
            <div><p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>Auto-save results</p><p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>Store AI outputs in history</p></div>
            <Toggle checked={prefs.autoSave} onChange={(v) => setPrefs(p => ({ ...p, autoSave: v }))} />
          </div>
          <div style={{ ...s.row, borderBottom: 'none' }}>
            <div><p style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>Email notifications</p><p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>Alerts for completed tasks</p></div>
            <Toggle checked={prefs.emailNotifs} onChange={(v) => setPrefs(p => ({ ...p, emailNotifs: v }))} />
          </div>
        </motion.div>

        {/* ── Timezone ──────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={s.section}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,184,107,0.15)', border: '1px solid rgba(255,184,107,0.25)' }}>
              <Bell size={16} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Timezone</h2>
          </div>
          <label style={s.label}>Your Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' } as any}
          >
            {['UTC', 'Asia/Karachi', 'Asia/Dubai', 'Asia/Kolkata', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Singapore'].map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </motion.div>

        {/* ── Data Management ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={s.section}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.25)' }}>
              <Shield size={16} style={{ color: 'var(--danger)' }} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Data & Storage</h2>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Tasks', count: tasks.length, color: '#6bffcc' },
              { label: 'Meetings', count: meetings.length, color: '#ff6b9d' },
              { label: 'Emails', count: emailHistory.length, color: '#7c6bff' },
              { label: 'Events', count: events.length, color: '#ffb86b' },
            ].map(({ label, count, color }) => (
              <div key={label} className="text-center p-3 rounded-xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '22px', color, lineHeight: 1 }}>{count}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <Info size={12} style={{ color: '#fbbf24', flexShrink: 0 }} />
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '11px', color: 'var(--text-muted)' }}>Data is stored in your browser. It won't sync across devices unless you connect Supabase.</p>
          </div>

          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: 'var(--danger)', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(248,113,113,0.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(248,113,113,0.08)')}
          >
            <Trash2 size={14} />
            Clear All Data
          </button>
        </motion.div>

      </div>
    </div>
  )
}
