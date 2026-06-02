'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent: string;
  delay?: number;
  suffix?: string;
}

export function StatCard({ label, value, icon: Icon, accent, delay = 0, suffix }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl"
        style={{ background: accent }}
      />
      <div className="relative z-10">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
        >
          <Icon size={16} style={{ color: accent }} />
        </div>
        <div
          className="font-syne font-extrabold leading-none mb-1"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '2rem',
            color: accent,
          }}
        >
          {value}{suffix}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}
