'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError('Failed to send message. Please try emailing directly at faisalagentai@gmail.com');
      }
    } catch {
      setError('Network error. Please try emailing directly at faisalagentai@gmail.com');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border-color)',
    borderRadius: '10px',
    padding: '0.7rem 1rem',
    color: 'var(--text)',
    fontFamily: 'var(--font-instrument)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '16px', color: 'var(--text)' }}>AutoFlow AI</span>
        </Link>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '8px 18px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
          Launch App <ArrowRight size={13} />
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contact</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '12px' }}>Get in Touch</h1>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Have a question, suggestion, or feedback about AutoFlow AI? Send a message below and Shah Faisal will read it personally and reply as soon as possible.
          </p>
        </motion.div>

        {/* Contact info strip */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)' }}>
              <Mail size={15} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Direct Email</p>
              <a href="mailto:faisalagentai@gmail.com" style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--accent)', textDecoration: 'none' }}>
                faisalagentai@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl flex-1" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.12)' }}>
              <MessageSquare size={15} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Response Time</p>
              <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>Within 24 hours</p>
            </div>
          </div>
        </motion.div>

        {/* Form / Success */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {sent ? (
            <div className="text-center py-16 px-8 rounded-2xl" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle2 size={48} style={{ color: '#10B981', margin: '0 auto 16px' }} />
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '8px' }}>Message Sent!</h2>
              <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Thank you for reaching out. Your message has been delivered to Shah Faisal at
              </p>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--accent)', marginBottom: '20px' }}>
                faisalagentai@gmail.com
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                style={{ background: 'var(--accent)', color: 'white', padding: '10px 24px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', cursor: 'pointer', border: 'none' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>Send a Message</h2>
                  <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>Delivered directly to faisalagentai@gmail.com</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Your Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border-color)')} />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border-color)')} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Subject</label>
                <input type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Question about AutoFlow AI" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border-color)')} />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>Message *</label>
                <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help you..." rows={5} style={{ ...inputStyle, resize: 'vertical' } as any} onFocus={e => (e.target.style.borderColor = 'var(--accent)')} onBlur={e => (e.target.style.borderColor = 'var(--border-color)')} />
              </div>

              {error && (
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: '#EF4444', padding: '10px', background: 'rgba(248,113,113,0.08)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.2)' }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl" style={{ background: 'var(--accent)', color: 'white', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', cursor: sending ? 'default' : 'pointer', opacity: sending ? 0.7 : 1, border: 'none', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}>
                <Send size={15} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. | <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link> | <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
