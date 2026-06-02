'use client'
import { Bell, Search, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { motion } from 'framer-motion'

interface TopBarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  const usagePercent = 0
  return (
    <header className="h-16 border-b border-border flex items-center px-6 gap-4 bg-surface/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex-1 min-w-0">
        <h1 className="font-display font-bold text-lg text-text truncate">{title}</h1>
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5 truncate">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* AI Usage indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-raised border border-border">
          <Sparkles className="w-3.5 h-3.5 text-iris-400" />
          <span className="text-xs font-mono text-text-secondary">
            0/100
          </span>
          <div className="w-16 h-1 bg-surface-overlay rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-iris-400 to-rose-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${usagePercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Plan badge */}
        <Badge variant="iris" size="sm">
          {'FREE'}
        </Badge>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-surface-raised border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-border-strong transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-iris-400 rounded-full ring-2 ring-surface" />
        </button>

        {actions}
      </div>
    </header>
  )
}
