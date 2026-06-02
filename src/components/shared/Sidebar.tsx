'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Mail, Video, CheckSquare, Calendar,
  BarChart3, Settings, CreditCard, User, Zap, X, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', section: 'main' },
  { href: '/email', icon: Mail, label: 'Email Agent', section: 'agents', accent: '#7c6bff' },
  { href: '/meetings', icon: Video, label: 'Meetings', section: 'agents', accent: '#ff6b9d' },
  { href: '/tasks', icon: CheckSquare, label: 'Task Manager', section: 'agents', accent: '#6bffcc' },
  { href: '/calendar', icon: Calendar, label: 'AI Calendar', section: 'agents', accent: '#ffb86b' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics', section: 'system', accent: '#7c6bff' },
  { href: '/settings', icon: Settings, label: 'Settings', section: 'system', accent: '#8888aa' },
  { href: '/billing', icon: CreditCard, label: 'Billing', section: 'system', accent: '#8888aa' },
  { href: '/profile', icon: User, label: 'Profile', section: 'system', accent: '#8888aa' },
]

const sectionLabel = (s: string) => {
  if (s === 'agents') return 'Agents'
  if (s === 'system') return 'Workspace'
  return ''
}

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  const grouped = {
    main: navItems.filter(i => i.section === 'main'),
    agents: navItems.filter(i => i.section === 'agents'),
    system: navItems.filter(i => i.section === 'system'),
  }

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = pathname === item.href
    const Icon = item.icon
    return (
      <Link href={item.href} onClick={onClose} style={{ textDecoration: 'none' }}>
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
          style={{
            background: isActive ? 'rgba(124,107,255,0.12)' : 'transparent',
            border: isActive ? '1px solid rgba(124,107,255,0.2)' : '1px solid transparent',
          }}
        >
          <Icon
            size={15}
            style={{
              color: isActive ? (item.accent ?? 'var(--accent)') : 'var(--text-subtle)',
              flexShrink: 0,
            }}
          />
          <span
            className="flex-1 truncate"
            style={{
              fontFamily: 'var(--font-instrument)',
              fontWeight: isActive ? 600 : 400,
              fontSize: '13px',
              color: isActive ? 'var(--text)' : 'var(--text-muted)',
            }}
          >
            {item.label}
          </span>
          {isActive && <ChevronRight size={11} style={{ color: 'var(--accent)', opacity: 0.7, flexShrink: 0 }} />}
        </motion.div>
      </Link>
    )
  }

  return (
    <aside
      className="w-[220px] flex-shrink-0 flex flex-col h-full border-r"
      style={{
        background: 'rgba(10,10,18,0.98)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-pink))' }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>AutoFlow</div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Platform</div>
          </div>
        </Link>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}
          >
            <X size={14} style={{ color: 'var(--text-muted)' }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Main */}
        <div className="space-y-0.5">
          {grouped.main.map(item => <NavLink key={item.href} item={item} />)}
        </div>

        {/* Agents */}
        <div>
          <div className="px-3 py-1.5">
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Agents
            </span>
          </div>
          <div className="space-y-0.5">
            {grouped.agents.map(item => <NavLink key={item.href} item={item} />)}
          </div>
        </div>

        {/* System */}
        <div>
          <div className="px-3 py-1.5">
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Workspace
            </span>
          </div>
          <div className="space-y-0.5">
            {grouped.system.map(item => <NavLink key={item.href} item={item} />)}
          </div>
        </div>
      </nav>

      {/* Model status */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div className="px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-cyan)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            Groq LLaMA 3
          </span>
        </div>
      </div>
    </aside>
  )
}
