'use client'
import Sidebar from '@/components/shared/Sidebar'
import { ToastContainer } from '@/components/ui/Toast'
import { ApiKeyBanner } from '@/components/ui/ApiKeyBanner'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Ambient glow orbs */}
      <div style={{ position: 'fixed', top: '-200px', left: '-100px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0" style={{ zIndex: 20 }}>
        <Sidebar />
      </div>

      {/* Mobile sidebar - slide in */}
      <motion.div
        className="fixed inset-y-0 left-0 z-50 md:hidden"
        initial={{ x: '-100%' }}
        animate={{ x: mobileSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      >
        <Sidebar onClose={() => setMobileSidebarOpen(false)} />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile topbar */}
        <div
          className="md:hidden flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
          style={{ background: 'rgba(8,8,16,0.95)', borderColor: 'var(--border-color)', backdropFilter: 'blur(20px)' }}
        >
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
          >
            <Menu size={16} style={{ color: 'var(--text-muted)' }} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-pink))' }}>
              <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>AF</span>
            </div>
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>AutoFlow</span>
          </div>
        </div>

        {/* API key warning — shown automatically if key is missing */}
        <ApiKeyBanner />

        <main className="flex-1 overflow-y-auto relative" style={{ zIndex: 1 }}>
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
