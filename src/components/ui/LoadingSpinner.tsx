import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

export function LoadingSpinner({ message = 'Processing…', size = 18 }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(124,107,255,0.12)', border: '1px solid rgba(124,107,255,0.2)' }}
      >
        <Loader2 size={size} className="animate-spin" style={{ color: 'var(--accent)' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--text-muted)' }}>
        {message}
      </span>
    </div>
  );
}
