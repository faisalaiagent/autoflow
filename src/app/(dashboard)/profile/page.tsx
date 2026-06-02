'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Globe, Shield, Camera, Save, Check, LogOut } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'
import { useAgentStore } from '@/store/useAgentStore'
import { toast } from '@/components/ui/Toast'

const sectionStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  padding: '24px',
}

const inputStyle = {
  width: '100%',
  background: 'var(--surface-2)',
  border: '1px solid var(--border-color)',
  borderRadius: '10px',
  padding: '0.65rem 1rem',
  color: 'var(--text)',
  fontFamily: 'var(--font-instrument)',
  fontSize: '13px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  fontFamily: 'var(--font-dm-mono)',
  fontSize: '10px',
  color: 'var(--text-muted)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  marginBottom: '6px',
  display: 'block',
}

export default function ProfilePage() {
  const { stats } = useAgentStore()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    bio: '',
    timezone: 'UTC',
    website: '',
  })

  const handleSave = () => {
    setSaved(true)
    toast('Profile updated successfully!')
    setTimeout(() => setSaved(false), 2000)
  }

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const metricCards = [
    { label: 'Emails Generated', value: stats.emails_processed, color: '#7c6bff' },
    { label: 'Meetings Analyzed', value: stats.meetings_summarized, color: '#ff6b9d' },
    { label: 'Tasks Managed', value: stats.tasks_total, color: '#6bffcc' },
    { label: 'Events Scheduled', value: stats.events_scheduled, color: '#ffb86b' },
  ]

  return (
    <div>
      <TopBar title="Profile" subtitle="Manage your account and personal information" />
      <div className="p-6 space-y-6 max-w-3xl">

        {/* Avatar + Name header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5 p-6 rounded-2xl"
          style={sectionStyle}
        >
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-pink))', color: 'white', fontFamily: 'var(--font-syne)', boxShadow: '0 8px 24px rgba(124,107,255,0.35)' }}
            >
              {form.full_name ? form.full_name.slice(0, 2).toUpperCase() : 'AF'}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--surface-2)', border: '2px solid var(--border-color)', cursor: 'pointer' }}
              title="Change avatar"
            >
              <Camera size={12} style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '20px', color: 'var(--text)' }}>
              {form.full_name || 'Your Name'}
            </h2>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {form.email || 'your@email.com'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="px-2 py-0.5 rounded-md" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#4ade80' }}>
                Starter Plan
              </div>
              <div className="px-2 py-0.5 rounded-md" style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent)' }}>
                Groq LLaMA 3
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-4 gap-3"
        >
          {metricCards.map(({ label, value, color }, i) => (
            <div key={label} className="text-center p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '24px', color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={sectionStyle}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(124,107,255,0.12)', border: '1px solid rgba(124,107,255,0.2)' }}>
              <User size={14} style={{ color: 'var(--accent)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Personal Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => set('full_name', e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
            <div className="col-span-2">
              <label style={labelStyle}>Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => set('bio', e.target.value)}
                placeholder="Tell us a bit about yourself..."
                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Website</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => set('website', e.target.value)}
                placeholder="https://yoursite.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
              />
            </div>
            <div>
              <label style={labelStyle}>Timezone</label>
              <select
                value={form.timezone}
                onChange={(e) => set('timezone', e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                {['UTC', 'Asia/Karachi', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Dubai', 'Asia/Kolkata'].map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={sectionStyle}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.2)' }}>
              <Shield size={14} style={{ color: 'var(--danger)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Security</h3>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Change Password', icon: Shield },
              { label: 'Enable Two-Factor Authentication', icon: Mail },
              { label: 'Active Sessions', icon: Globe },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={13} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text)' }}>{label}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)' }}>Configure →</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between pb-6"
        >
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', color: 'var(--danger)', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
          <motion.button
            whileHover={{ translateY: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl"
            style={{
              background: saved ? 'rgba(74,222,128,0.15)' : 'var(--accent)',
              border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
              color: saved ? '#4ade80' : 'white',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: saved ? 'none' : '0 4px 20px rgba(124,107,255,0.35)',
              transition: 'all 0.2s',
            }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved!' : 'Save Profile'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
