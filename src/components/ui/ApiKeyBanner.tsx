'use client'
import { useEffect, useState } from 'react'
import { AlertTriangle, ExternalLink, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ApiKeyBanner() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if API key is configured
    fetch('/api/check-config')
      .then(r => r.json())
      .then(data => {
        if (!data.hasGemini) setShow(true)
      })
      .catch(() => {})
  }, [])

  if (!show || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        className="mx-4 md:mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-xl"
        style={{
          background: 'rgba(251,191,36,0.08)',
          border: '1px solid rgba(251,191,36,0.25)',
        }}
      >
        <AlertTriangle size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '1px' }} />
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: '#fbbf24' }}>
            Gemini API key not configured
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            AI agents will not work until you add{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '11px' }}>
              GEMINI_API_KEY
            </code>{' '}
            in your Vercel project settings (Settings → Environment Variables).
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
            style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontFamily: 'var(--font-syne)', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(251,191,36,0.2)' }}
          >
            Vercel <ExternalLink size={10} />
          </a>
          <button
            onClick={() => setDismissed(true)}
            style={{ color: 'var(--text-subtle)', cursor: 'pointer', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
