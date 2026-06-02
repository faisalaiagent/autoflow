import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'pink' | 'cyan' | 'amber' | 'green' | 'red' | 'neutral' | 'iris' | 'jade' | 'rose';
  size?: 'sm' | 'md';
  className?: string;
}

const badgeVariants = {
  purple: { bg: 'rgba(124,107,255,0.12)', color: 'var(--accent)', border: 'rgba(124,107,255,0.25)' },
  iris: { bg: 'rgba(124,107,255,0.12)', color: 'var(--accent)', border: 'rgba(124,107,255,0.25)' },
  pink: { bg: 'rgba(255,107,157,0.12)', color: 'var(--accent-pink)', border: 'rgba(255,107,157,0.25)' },
  rose: { bg: 'rgba(255,107,157,0.12)', color: 'var(--accent-pink)', border: 'rgba(255,107,157,0.25)' },
  cyan: { bg: 'rgba(107,255,204,0.12)', color: 'var(--accent-cyan)', border: 'rgba(107,255,204,0.25)' },
  jade: { bg: 'rgba(107,255,204,0.12)', color: 'var(--accent-cyan)', border: 'rgba(107,255,204,0.25)' },
  amber: { bg: 'rgba(255,184,107,0.12)', color: 'var(--accent-amber)', border: 'rgba(255,184,107,0.25)' },
  green: { bg: 'rgba(74,222,128,0.12)', color: 'var(--success)', border: 'rgba(74,222,128,0.25)' },
  red: { bg: 'rgba(248,113,113,0.12)', color: 'var(--danger)', border: 'rgba(248,113,113,0.25)' },
  neutral: { bg: 'rgba(136,136,170,0.1)', color: 'var(--text-muted)', border: 'rgba(136,136,170,0.2)' },
};

export function Badge({ children, variant = 'purple', size = 'md', className }: BadgeProps) {
  const v = badgeVariants[variant];
  const padding = size === 'sm' ? '0.15rem 0.45rem' : '0.25rem 0.6rem';
  const fontSize = size === 'sm' ? '10px' : '11px';

  return (
    <span
      className={cn('inline-flex items-center rounded-md', className)}
      style={{
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        padding,
        fontFamily: 'var(--font-dm-mono)',
        fontSize,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
