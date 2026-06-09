'use client';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AIInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AIInput = forwardRef<HTMLInputElement, AIInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn('w-full outline-none transition-all duration-150', className)}
        style={{
          background: 'var(--surface-2)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
          borderRadius: '10px',
          padding: '0.7rem 1rem',
          color: 'var(--text)',
          fontFamily: 'var(--font-instrument)',
          fontSize: '14px',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-color)';
          e.target.style.boxShadow = 'none';
        }}
        {...props}
      />
      {error && (
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
);
AIInput.displayName = 'AIInput';

interface AITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const AITextarea = forwardRef<HTMLTextAreaElement, AITextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={cn('w-full outline-none transition-all duration-150 resize-none', className)}
        style={{
          background: 'var(--surface-2)',
          border: `1px solid ${error ? 'var(--danger)' : 'var(--border-color)'}`,
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          color: 'var(--text)',
          fontFamily: 'var(--font-instrument)',
          fontSize: '14px',
          minHeight: '120px',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border-color)';
          e.target.style.boxShadow = 'none';
        }}
        {...props}
      />
      {error && (
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
);
AITextarea.displayName = 'AITextarea';
