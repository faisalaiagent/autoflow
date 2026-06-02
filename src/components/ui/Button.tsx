'use client'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'iris' | 'rose' | 'jade'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-iris-400 hover:bg-iris-500 text-white shadow-lg shadow-iris-400/20 border border-iris-300/30',
      secondary: 'bg-surface-raised hover:bg-surface-overlay text-text border border-border hover:border-border-strong',
      ghost: 'hover:bg-surface-raised text-text-secondary hover:text-text border border-transparent hover:border-border',
      danger: 'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/25',
      iris: 'bg-gradient-to-r from-iris-400 to-iris-500 hover:from-iris-500 hover:to-iris-600 text-white shadow-lg shadow-iris-400/30',
      rose: 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/25',
      jade: 'bg-jade-500/15 hover:bg-jade-500/25 text-jade-500 border border-jade-500/25',
    }

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-10 px-4 text-sm rounded-xl gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-2',
      icon: 'h-10 w-10 rounded-xl',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-display font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris-400/50',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          'active:scale-[0.97]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
