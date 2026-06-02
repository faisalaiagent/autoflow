'use client'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  accent?: 'iris' | 'rose' | 'jade' | 'amber' | 'none'
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className, accent = 'none', hover = false, glow = false }: CardProps) {
  const accents = {
    iris: 'border-iris-400/20 bg-iris-400/[0.03]',
    rose: 'border-rose-500/20 bg-rose-500/[0.03]',
    jade: 'border-jade-500/20 bg-jade-500/[0.03]',
    amber: 'border-amber-500/20 bg-amber-500/[0.03]',
    none: 'border-border bg-surface',
  }

  const glows = {
    iris: 'shadow-iris-400/10',
    rose: 'shadow-rose-500/10',
    jade: 'shadow-jade-500/10',
    amber: 'shadow-amber-500/10',
    none: '',
  }

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-200',
        accents[accent],
        glow && `shadow-lg ${glows[accent]}`,
        hover && 'hover:border-border-strong hover:shadow-lg hover:shadow-black/30 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
