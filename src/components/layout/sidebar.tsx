'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap, LayoutDashboard, Mail, Users, CheckSquare,
  Calendar, BarChart3, Settings, LogOut, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
  { href: '/dashboard/email', icon: Mail, label: 'Email Agent', color: '#6366F1' },
  { href: '/dashboard/meeting', icon: Users, label: 'Meeting Intel', color: '#8B5CF6' },
  { href: '/dashboard/tasks', icon: CheckSquare, label: 'Task Manager', color: '#10B981' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'AI Calendar', color: '#F59E0B' },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', color: '#6366F1' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0d14] border-r border-[#2a2a3a] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm leading-tight">AutoFlow</div>
            <div className="font-mono-custom text-[#6366F1] text-[10px] uppercase tracking-widest">AI Workspace</div>
          </div>
        </Link>
      </div>

      {/* Groq badge */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-lg px-3 py-2">
          <Sparkles size={12} className="text-[#6366F1]" />
          <span className="font-mono-custom text-[10px] text-[#6366F1] uppercase tracking-widest">Groq LLaMA 3</span>
          <span className="ml-auto w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="font-mono-custom text-[10px] text-[#5555aa] uppercase tracking-widest px-3 mb-3">
          Workspace
        </div>
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group',
                active
                  ? 'bg-[#6366F1]/15 text-white border border-[#6366F1]/25'
                  : 'text-[#8888aa] hover:text-white hover:bg-[#1a1a24]'
              )}
            >
              <item.icon
                size={16}
                style={{ color: active ? (item.color || '#6366F1') : undefined }}
                className={active ? '' : 'group-hover:text-white transition-colors'}
              />
              <span className="font-medium">{item.label}</span>
              {active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: item.color || '#6366F1' }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2a3a]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-[#8888aa] hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
