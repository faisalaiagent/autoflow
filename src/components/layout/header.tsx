'use client';
import { Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, { title: string; desc: string }> = {
  '/dashboard': { title: 'Overview', desc: 'Your AI workflow hub' },
  '/dashboard/email': { title: 'Email Agent', desc: 'Generate intelligent email replies' },
  '/dashboard/meeting': { title: 'Meeting Intelligence', desc: 'Summarize transcripts into insights' },
  '/dashboard/tasks': { title: 'Task Manager', desc: 'Manage tasks with natural language' },
  '/dashboard/calendar': { title: 'AI Calendar', desc: 'Schedule with conversational AI' },
  '/dashboard/analytics': { title: 'Analytics', desc: 'Track your productivity metrics' },
  '/dashboard/settings': { title: 'Settings', desc: 'Manage your account & preferences' },
};

export function DashboardHeader() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: 'AutoFlow', desc: '' };

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#2a2a3a] px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="font-display font-bold text-white text-lg leading-tight">{page.title}</h1>
        {page.desc && <p className="text-[#8888aa] text-xs mt-0.5">{page.desc}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5555aa]" />
          <input
            type="text"
            placeholder="Search…"
            className="bg-[#111118] border border-[#2a2a3a] text-white rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#7c6bff] w-48 placeholder-[#5555aa] transition-all focus:w-64"
          />
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center bg-[#111118] border border-[#2a2a3a] rounded-xl text-[#8888aa] hover:text-white hover:border-[#7c6bff]/40 transition-all">
          <Bell size={15} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#7c6bff] rounded-full" />
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c6bff] to-[#ff6b9d] flex items-center justify-center text-white font-display font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
}
