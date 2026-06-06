'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Clock, Calendar } from 'lucide-react';

const posts = [
  {
    slug: 'ai-email-reply',
    title: 'How AI Can Write Your Emails Better Than You Think',
    excerpt: 'Most professionals spend 2 to 3 hours every day just on email. Here is how an AI email agent changes that completely and why the replies it generates are often sharper than what most people write under pressure.',
    category: 'Email Productivity',
    readTime: '7 min read',
    date: 'June 4, 2024',
    color: '#7c6bff',
    bg: 'rgba(124,107,255,0.06)',
    border: 'rgba(124,107,255,0.2)',
  },
  {
    slug: 'ai-meeting-summary',
    title: 'Why Your Meetings Are Not the Problem — Your Notes Are',
    excerpt: 'Most teams do not have a meeting problem. They have a follow-through problem. Everything discussed in the room vanishes within 48 hours because nobody captured it properly. Here is how an AI meeting summary agent changes that.',
    category: 'Meeting Productivity',
    readTime: '8 min read',
    date: 'June 5, 2024',
    color: '#ff6b9d',
    bg: 'rgba(255,107,157,0.06)',
    border: 'rgba(255,107,157,0.2)',
  },
  {
    slug: 'ai-task-manager',
    title: 'Stop Fighting Your Task Manager. Start Talking to It.',
    excerpt: 'Most productivity tools make you do more work just to track your work. There is a better way — describe what needs to get done in plain English and an AI figures out the rest. Here is why natural language task management changes your day.',
    category: 'Task Management',
    readTime: '8 min read',
    date: 'June 6, 2024',
    color: '#6bffcc',
    bg: 'rgba(107,255,204,0.06)',
    border: 'rgba(107,255,204,0.2)',
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <nav className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)' }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '16px', color: 'var(--text)' }}>AutoFlow AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '8px 18px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
            Try Free App <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Blog</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '14px' }}>
            Guides and Insights
          </h1>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Practical articles on AI-powered productivity, workflow automation, and getting more done with less effort.
          </p>
        </motion.div>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="p-7 rounded-2xl group cursor-pointer transition-all"
                  style={{ background: post.bg, border: `1px solid ${post.border}` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = post.color + '55')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = post.border)}
                >
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: post.color, background: post.bg, border: `1px solid ${post.border}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                      <Clock size={11} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px' }}>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                      <Calendar size={11} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px' }}>{post.date}</span>
                    </div>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'var(--text)', lineHeight: 1.2, marginBottom: '12px' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2" style={{ color: post.color, fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. All rights reserved. |{' '}
          <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link>{' '}|{' '}
          <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
