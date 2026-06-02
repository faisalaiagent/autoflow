'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export function AgentCard({ children, className, accentColor = 'var(--accent)', delay = 0, style }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className={cn('rounded-2xl relative overflow-hidden', className)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        ...style,
      }}
      whileHover={{ borderColor: `${accentColor}40` }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      {children}
    </motion.div>
  );
}
