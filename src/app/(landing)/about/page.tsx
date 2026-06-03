'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Mail, Mic, CheckSquare, Calendar, ArrowRight, Shield, Globe, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <nav className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)', background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)' }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '16px', color: 'var(--text)' }}>AutoFlow AI</span>
        </Link>
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '8px 18px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
          Launch App <ArrowRight size={13} />
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>About</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '16px' }}>About AutoFlow AI</h1>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8 }}>AutoFlow AI is a modern AI-powered workflow automation platform built to help professionals save time on repetitive tasks including email replies, meeting summaries, task management, and calendar scheduling.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '12px' }}>Our Mission</h2>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>We believe AI should work for everyone. AutoFlow puts four intelligent AI agents in your hands for free, powered by Groq LLaMA 3. Our goal is to remove friction from your digital workday so you can focus on what matters most.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '16px' }}>What AutoFlow Does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Mail, color: '#7c6bff', title: 'Email Reply Bot', desc: 'Generates polished, context-aware email replies with customizable tone control.' },
              { icon: Mic, color: '#ff6b9d', title: 'Meeting Summary Bot', desc: 'Converts raw meeting transcripts into summaries, action items, and decisions.' },
              { icon: CheckSquare, color: '#6bffcc', title: 'Task Manager Agent', desc: 'Create, prioritize, and track tasks using plain natural language commands.' },
              { icon: Calendar, color: '#ffb86b', title: 'Calendar Assistant', desc: 'Schedule and manage events conversationally with smart conflict detection.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-color)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '16px' }}>Our Values</h2>
          <div className="space-y-4">
            {[
              { icon: Shield, color: '#6bffcc', title: 'Privacy First', desc: 'Your API key is stored in your browser only. We never store or access your data on our servers.' },
              { icon: Globe, color: '#7c6bff', title: 'Open and Accessible', desc: 'AutoFlow is free to use. We believe powerful AI tools should be accessible to everyone.' },
              { icon: Users, color: '#ff6b9d', title: 'Built for Real Users', desc: 'Every feature is designed around actual workflow pain points, not just technology demos.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="text-center p-8 rounded-2xl" style={{ background: 'rgba(124,107,255,0.06)', border: '1px solid rgba(124,107,255,0.2)' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>Get in Touch</h2>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Have questions or feedback about AutoFlow AI?</p>
          <Link href="/contact" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '10px 24px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
            Contact Us <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. All rights reserved. | <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link> | <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
