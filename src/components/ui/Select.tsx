'use client'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export default function Select({ className, label, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-text-secondary font-mono tracking-wide uppercase">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full h-11 px-4 rounded-xl text-sm font-body',
          'bg-surface-raised border border-border text-text',
          'transition-all duration-200',
          'focus:outline-none focus:border-iris-400/60 focus:ring-2 focus:ring-iris-400/15',
          'hover:border-border-strong cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
