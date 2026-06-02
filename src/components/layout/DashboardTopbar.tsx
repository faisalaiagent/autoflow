'use client';
import { usePathname } from 'next/navigation';
import { Bell, Search, Menu } from 'lucide-react';

const titles: Record<string, { label: string; desc: string }> = {
  '/dashboard': { label: 'Overview', desc: 'Your AI workflow command center' },
  '/dashboard/email': { label: 'Email Assistant', desc: 'AI-powered email reply generation' },
  '/dashboard/meeting': { label: 'Meeting Intelligence', desc: 'Transcripts to insights instantly' },
  '/dashboard/tasks': { label: 'Task Manager', desc: 'Natural language task automation' },
  '/dashboard/calendar': { label: 'AI Calendar', desc: 'Smart scheduling assistant' },
  '/dashboard/analytics': { label: 'Analytics', desc: 'Agent performance & productivity insights' },
  '/dashboard/settings': { label: 'Settings', desc: 'Configure your workspace' },
};

interface DashboardTopbarProps {
  onMenuClick?: () => void;
}

export function DashboardTopbar({ onMenuClick }: DashboardTopbarProps) {
  const pathname = usePathname();
  const page = titles[pathname] ?? { label: 'AutoFlow', desc: 'AI Workflow Platform' };

  return (
    <header
      className="h-14 flex-shrink-0 flex items-center justify-between px-4 md:px-6 border-b gap-3"
      style={{
        background: 'rgba(8, 8, 16, 0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', cursor: 'pointer' }}
        >
          <Menu size={15} style={{ color: 'var(--text-muted)' }} />
        </button>

        <div className="min-w-0">
          <h1
            className="truncate"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}
          >
            {page.label}
          </h1>
          <p
            className="hidden sm:block truncate"
            style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.03em' }}
          >
            {page.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search pill - desktop only */}
        <div
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <Search size={13} />
          <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>Search… ⌘K</span>
        </div>

        {/* Notification bell */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <Bell size={14} />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-pink))', color: 'white', fontFamily: 'var(--font-syne)' }}
        >
          AF
        </div>
      </div>
    </header>
  );
}
