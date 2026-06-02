'use client'
import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-medium text-text-secondary font-mono tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-11 px-4 rounded-xl text-sm font-body',
              'bg-surface-raised border border-border text-text placeholder:text-text-muted',
              'transition-all duration-200',
              'focus:outline-none focus:border-iris-400/60 focus:ring-2 focus:ring-iris-400/15',
              'hover:border-border-strong',
              leftIcon && 'pl-10',
              error && 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/15',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
