'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Mail, Mic, CheckSquare, Calendar,
  BarChart2, Settings, Zap, ChevronRight, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, accent: '#7c6bff' },
  { label: 'Email Assistant', href: '/dashboard/email', icon: Mail, accent: '#7c6bff' },
  { label: 'Meeting Intel', href: '/dashboard/meeting', icon: Mic, accent: '#ff6b9d' },
  { label: 'Task Manager', href: '/dashboard/tasks', icon: CheckSquare, accent: '#6bffcc' },
  { label: 'AI Calendar', href: '/dashboard/calendar', icon: Calendar, accent: '#ffb86b' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart2, accent: '#7c6bff' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, accent: '#8888aa' },
];

interface DashboardSidebarProps {
  onClose?: () => void;
}

export function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="w-[220px] flex-shrink-0 flex flex-col h-full border-r"
      style={{
        background: 'rgba(10, 10, 18, 0.98)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-pink))' }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '14px', color: 'var(--text)' }}>AutoFlow</div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Platform</div>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center ml-2"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
          >
            <X size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="px-2 py-1.5">
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Navigation
          </span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ x: 2 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: isActive ? 'rgba(124,107,255,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(124,107,255,0.2)' : '1px solid transparent',
                }}
              >
                <Icon size={15} style={{ color: isActive ? item.accent : 'var(--text-subtle)', flexShrink: 0 }} />
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
                {isActive && <ChevronRight size={11} style={{ color: 'var(--accent)', opacity: 0.6, flexShrink: 0 }} />}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Model status chip */}
      <div className="p-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <div
          className="px-3 py-2 rounded-xl flex items-center gap-2"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--accent-cyan)' }} />
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
            Groq LLaMA 3
          </span>
        </div>
      </div>
    </aside>
  );
}
