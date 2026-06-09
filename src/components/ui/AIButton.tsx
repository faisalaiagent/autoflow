'use client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'pink' | 'cyan' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const variants = {
  primary: {
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 20px rgba(99,102,241,0.35)',
    hoverBg: 'var(--accent-hover)',
  },
  secondary: {
    background: 'var(--surface-2)',
    color: 'var(--text)',
    border: '1px solid var(--border-color)',
    shadow: 'none',
    hoverBg: 'var(--surface-3)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid transparent',
    shadow: 'none',
    hoverBg: 'var(--surface-2)',
  },
  pink: {
    background: 'var(--accent-pink)',
    color: 'white',
    border: 'none',
    shadow: '0 4px 20px rgba(139,92,246,0.35)',
    hoverBg: '#A78BFA',
  },
  cyan: {
    background: 'var(--accent-cyan)',
    color: '#0F172A',
    border: 'none',
    shadow: '0 4px 20px rgba(16,185,129,0.25)',
    hoverBg: '#34D399',
  },
  amber: {
    background: 'var(--accent-amber)',
    color: '#0F172A',
    border: 'none',
    shadow: '0 4px 20px rgba(245,158,11,0.25)',
    hoverBg: '#FCD34D',
  },
};

const sizes = {
  sm: { padding: '0.4rem 0.9rem', fontSize: '12px', borderRadius: '8px' },
  md: { padding: '0.65rem 1.3rem', fontSize: '13px', borderRadius: '10px' },
  lg: { padding: '0.8rem 1.6rem', fontSize: '14px', borderRadius: '12px' },
};

export function AIButton({
  loading = false,
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  disabled,
  ...props
}: AIButtonProps) {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <motion.button
      whileHover={!disabled && !loading ? { translateY: -1, boxShadow: v.shadow } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      style={{
        ...v,
        ...s,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-syne)',
        fontWeight: 700,
        letterSpacing: '0.02em',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background 0.15s ease',
      }}
      className={cn('outline-none', className)}
      disabled={disabled || loading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </motion.button>
  );
}
