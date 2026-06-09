import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);

  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;

  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

export function truncate(str: string, length = 80): string {
  return str.length > length
    ? str.slice(0, length) + '…'
    : str;
}

export function priorityColor(priority: string): string {
  const map: Record<string, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return map[priority.toLowerCase()] ?? '#8888aa';
}

export function sentimentColor(sentiment: string): string {
  const map: Record<string, string> = {
    positive: '#10B981',
    neutral: '#8888aa',
    negative: '#EF4444',
  };

  return map[sentiment.toLowerCase()] ?? '#8888aa';
}

export function getStatusColor(status?: string): string {
  if (!status) return '#8888aa';

  const normalizedStatus = status.trim().toLowerCase();

  const map: Record<string, string> = {
    pending: '#F59E0B',
    in_progress: '#6366F1',
    completed: '#10B981',
    failed: '#ef4444',
    cancelled: '#9ca3af',
  };

  return map[normalizedStatus] ?? '#8888aa';
}

export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();

  const diff = Math.floor(
    (now.getTime() - d.getTime()) / 1000
  );

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return formatDate(date);
}