import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
}

export function EmptyState({ icon: Icon, title, description, accent = 'var(--accent)' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
      >
        <Icon size={24} style={{ color: accent }} />
      </div>
      <h3
        className="mb-1"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--text)',
        }}
      >
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>
        {description}
      </p>
    </div>
  );
}
