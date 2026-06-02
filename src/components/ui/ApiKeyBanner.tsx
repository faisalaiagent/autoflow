'use client'
import { useEffect, useState } from 'react'
import { AlertTriangle, ExternalLink, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAgentStore } from '@/store/useAgentStore'
import Link from 'next/link'

export function ApiKeyBanner() {
  const { groqApiKey } = useAgentStore()
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Wait for hydration before checking localStorage
  useEffect(() => { setMounted(true) }, [])

  // Don't show if key is configured or dismissed
  if (!mounted || groqApiKey || dismissed) return null

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
        <AlertTriangle size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: '#fbbf24' }}>
            Groq API key not configured
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
            AI agents won't work until you add your free Groq API key.{' '}
            Get it free at{' '}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fbbf24', textDecoration: 'underline' }}
            >
              console.groq.com
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/settings"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
            style={{
              background: 'rgba(251,191,36,0.15)',
              color: '#fbbf24',
              fontFamily: 'var(--font-syne)',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid rgba(251,191,36,0.2)',
            }}
          >
            Add Key <ExternalLink size={10} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            style={{ color: 'var(--text-subtle)', cursor: 'pointer', background: 'none', border: 'none', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
