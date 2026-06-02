'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Zap, Mail, Mic, CheckSquare, Calendar, ArrowRight, Star,
  BarChart3, Shield, Globe, Users, Sparkles, ChevronDown,
  Check, X, MessageSquare, Clock, TrendingUp, Layers,
} from 'lucide-react';

// ─── Data ───────────────────────────────────────────────────────────────────

const agents = [
  {
    icon: Mail,
    color: '#7c6bff',
    bg: 'rgba(124,107,255,0.1)',
    border: 'rgba(124,107,255,0.2)',
    label: 'Email Reply Bot',
    badge: 'Agent 01',
    desc: 'Reads incoming emails and generates polished, context-aware replies with intelligent tone control — professional, friendly, formal, or empathetic.',
    features: ['Tone selection (5 modes)', 'Key points extraction', 'Smart follow-up suggestions', 'SMTP send integration'],
  },
  {
    icon: Mic,
    color: '#ff6b9d',
    bg: 'rgba(255,107,157,0.1)',
    border: 'rgba(255,107,157,0.2)',
    label: 'Meeting Summary Bot',
    badge: 'Agent 02',
    desc: 'Transforms raw meeting transcripts into structured intelligence — summaries, action items, decisions, and the next meeting agenda in seconds.',
    features: ['Executive summaries', 'Auto-assigned action items', 'Decision tracking', 'Sentiment analysis'],
  },
  {
    icon: CheckSquare,
    color: '#6bffcc',
    bg: 'rgba(107,255,204,0.1)',
    border: 'rgba(107,255,204,0.2)',
    label: 'Task Manager Agent',
    badge: 'Agent 03',
    desc: 'Speak to your task list in plain English. Create, prioritize, complete, and analyze tasks using natural language commands powered by Gemini.',
    features: ['Natural language input', 'Priority intelligence', 'Productivity tips', 'Status tracking'],
  },
  {
    icon: Calendar,
    color: '#ffb86b',
    bg: 'rgba(255,184,107,0.1)',
    border: 'rgba(255,184,107,0.2)',
    label: 'Calendar Assistant',
    badge: 'Agent 04',
    desc: 'Schedule, reschedule, and manage events with conversational AI. Conflict detection, smart suggestions, and calendar optimization built-in.',
    features: ['Plain-English scheduling', 'Conflict detection', 'Smart time suggestions', 'Reminder management'],
  },
];

const testimonials = [
  {
    quote: "AutoFlow completely changed how I handle my inbox. The email bot understands context better than any tool I've used.",
    author: 'Sarah Chen', role: 'Product Manager', company: 'TechCorp',
    avatar: 'SC',
  },
  {
    quote: "Meeting summaries that used to take 30 minutes now take 10 seconds. The action item extraction is shockingly accurate.",
    author: 'Marcus Rivera', role: 'Engineering Lead', company: 'Startup X',
    avatar: 'MR',
  },
  {
    quote: "I manage a team of 12 and the task agent is my co-pilot. Natural language commands make it effortless.",
    author: 'Priya Patel', role: 'Operations Director', company: 'GrowthCo',
    avatar: 'PP',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: 'Free',
    sub: 'Forever free',
    color: '#8888aa',
    features: [
      { text: 'All 4 AI agents', included: true },
      { text: '50 AI actions/month', included: true },
      { text: 'Local data storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Supabase persistence', included: false },
      { text: 'Team workspace', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    sub: '/month',
    color: '#7c6bff',
    highlight: true,
    features: [
      { text: 'All 4 AI agents', included: true },
      { text: 'Unlimited AI actions', included: true },
      { text: 'Supabase persistence', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Team workspace (5 seats)', included: true },
      { text: 'SMTP email sending', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Team',
    price: '$49',
    sub: '/month',
    color: '#6bffcc',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited team seats', included: true },
      { text: 'Custom AI fine-tuning', included: true },
      { text: 'Shared workspaces', included: true },
      { text: 'Role permissions', included: true },
      { text: 'Slack/Notion integration', included: true },
      { text: 'Dedicated support', included: true },
    ],
  },
];

const faqs = [
  {
    q: 'Which AI model powers AutoFlow?',
    a: 'AutoFlow runs on Google Gemini 2.5 Flash — one of the fastest, most capable models available. It\'s free-tier eligible so you can use your own API key at no extra cost.',
  },
  {
    q: 'Is my data stored securely?',
    a: 'In the free tier, data is stored locally in your browser. The Pro plan connects to Supabase for secure cloud persistence with row-level security and encryption at rest.',
  },
  {
    q: 'Can I use my own Gemini API key?',
    a: 'Absolutely. You set your own GEMINI_API_KEY as an environment variable. This means you control your usage and costs directly through Google AI Studio.',
  },
  {
    q: 'Does the calendar agent sync with Google Calendar?',
    a: 'The AI manages a smart in-app calendar right now. Google Calendar, Outlook, and iCal sync integrations are on the roadmap for the Pro plan.',
  },
  {
    q: 'Can teams collaborate on the same workspace?',
    a: 'Team collaboration is available on the Team plan — shared workspaces, role-based permissions, and real-time sync via Supabase Realtime.',
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,37,56,0.8)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)' }}>
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '17px', color: 'var(--text)' }}>
            AutoFlow
          </span>
          <span className="hidden md:block px-2 py-0.5 rounded-md" style={{ background: 'rgba(124,107,255,0.15)', border: '1px solid rgba(124,107,255,0.3)', fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.06em' }}>
            AI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Agents', 'Pricing', 'FAQ'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 16px' }}
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl"
            style={{
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(124,107,255,0.4)',
            }}
          >
            Try Free App <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', marginBottom: '8px' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4"
        style={{ cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-5 pb-4">
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{a}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden', minHeight: '100vh' }}>

      {/* Ambient gradients */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(124,107,255,0.08), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,107,157,0.06), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(107,255,204,0.04), transparent 70%)', borderRadius: '50%', transform: 'translate(-50%,-50%)' }} />
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <NavBar />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="text-center px-6 py-32 max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.25)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-cyan)' }} />
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.08em' }}>
              Powered by Shah Faisal
            </span>
            <Sparkles size={12} style={{ color: 'var(--accent)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: 'var(--text)' }}>Automate Your</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #7c6bff 0%, #ff6b9d 50%, #6bffcc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Digital Workflows
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              maxWidth: '560px',
              margin: '0 auto 40px',
              lineHeight: 1.65,
            }}
          >
            4 intelligent AI agents that handle email replies, meeting summaries,
            task management, and calendar scheduling — all in one premium platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl"
              style={{
                background: 'var(--accent)',
                color: 'white',
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(124,107,255,0.5)',
                letterSpacing: '0.02em',
              }}
            >
              <Zap size={16} fill="white" />
              Launch Free App
              <ArrowRight size={15} />
            </Link>
            <a
              href="#agents"
              className="flex items-center gap-2 px-7 py-4 rounded-2xl"
              style={{
                background: 'var(--surface)',
                color: 'var(--text)',
                fontFamily: 'var(--font-syne)',
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                border: '1px solid var(--border-color)',
              }}
            >
              Explore Agents
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 mt-16 flex-wrap"
          >
            {[
              { value: '4', label: 'AI Agents' },
              { value: 'Free', label: 'To Start' },
              { value: 'Gemini', label: '2.5 Flash' },
              { value: '< 3s', label: 'Response Time' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '22px', color: 'var(--text)' }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURES GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(107,255,204,0.1)', border: '1px solid rgba(107,255,204,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Platform Features</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '16px' }}>
              Built for serious<br />productivity
            </h2>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto' }}>
              Every feature is designed around one goal: removing friction from your digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap, color: '#7c6bff', title: 'Instant AI Responses', desc: 'Gemini 2.5 Flash delivers structured, intelligent responses in under 3 seconds — no waiting, no loading screens.' },
              { icon: BarChart3, color: '#ff6b9d', title: 'Analytics Dashboard', desc: 'Track your productivity metrics, agent usage, task completion rates, and meeting sentiment trends over time.' },
              { icon: Globe, color: '#6bffcc', title: 'No Backend Required', desc: 'Next.js API routes handle everything. No separate server to manage, deploy, or maintain. Just your API key.' },
              { icon: Shield, color: '#ffb86b', title: 'Your Data, Your Key', desc: 'You supply your own Gemini API key. No data is ever sent to AutoFlow servers. Complete privacy by design.' },
              { icon: Layers, color: '#7c6bff', title: 'Persistent Storage', desc: 'Connect Supabase for cloud-synced tasks, emails, meetings, and events that persist across all your devices.' },
              { icon: Users, color: '#ff6b9d', title: 'Team-Ready', desc: 'Shared workspaces, role-based permissions, and multi-user collaboration available on the Team plan.' },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-2xl group"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-color)', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${feat.color}35`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25` }}>
                    <Icon size={18} style={{ color: feat.color }} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '8px' }}>{feat.title}</h3>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AGENTS SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="agents" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Agents</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)', lineHeight: 1.1 }}>
              4 specialists.<br />One platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 rounded-2xl relative overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)`, opacity: 0.6 }} />

                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: agent.bg, border: `1px solid ${agent.border}` }}>
                      <Icon size={22} style={{ color: agent.color }} />
                    </div>
                    <span className="px-2.5 py-1 rounded-lg" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: agent.color, background: agent.bg, border: `1px solid ${agent.border}`, letterSpacing: '0.06em' }}>
                      {agent.badge}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '18px', color: 'var(--text)', marginBottom: '10px' }}>{agent.label}</h3>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>{agent.desc}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {agent.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={12} style={{ color: agent.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-pink)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Testimonials</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1 }}>
              What teams are saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl flex flex-col"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} style={{ color: '#ffb86b' }} fill="#ffb86b" />)}
                </div>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)', color: 'white', fontFamily: 'var(--font-syne)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{t.author}</p>
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRICING
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(107,255,204,0.1)', border: '1px solid rgba(107,255,204,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pricing</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1 }}>
              Simple, transparent pricing
            </h2>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: plan.highlight ? 'rgba(124,107,255,0.08)' : 'var(--surface)',
                  border: `1px solid ${plan.highlight ? 'rgba(124,107,255,0.35)' : 'var(--border-color)'}`,
                }}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                )}
                {plan.highlight && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md" style={{ background: 'rgba(124,107,255,0.2)', border: '1px solid rgba(124,107,255,0.3)', fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Popular
                  </div>
                )}

                <div style={{ marginBottom: '6px' }}>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: plan.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{plan.name}</span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '36px', color: plan.color, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>{plan.sub}</span>
                </div>
                <div className="mt-5 mb-6 space-y-3">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      {f.included
                        ? <Check size={13} style={{ color: plan.color, flexShrink: 0 }} />
                        : <X size={13} style={{ color: 'var(--text-subtle)', flexShrink: 0 }} />}
                      <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: f.included ? 'var(--text-muted)' : 'var(--text-subtle)' }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/dashboard"
                  className="block text-center py-3 rounded-xl"
                  style={{
                    background: plan.highlight ? 'var(--accent)' : 'var(--surface-2)',
                    color: plan.highlight ? 'white' : 'var(--text)',
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '13px',
                    textDecoration: 'none',
                    border: plan.highlight ? 'none' : '1px solid var(--border-color)',
                    boxShadow: plan.highlight ? '0 4px 20px rgba(124,107,255,0.35)' : 'none',
                  }}
                >
                  {plan.price === 'Free' ? 'Get Started Free' : `Start with ${plan.name}`}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,184,107,0.1)', border: '1px solid rgba(255,184,107,0.2)' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1 }}>
              Frequently asked questions
            </h2>
          </div>
          <div>
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>
      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="relative border-t px-6 py-10" style={{ borderColor: 'var(--border-color)', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)' }}>
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '15px', color: 'var(--text)' }}>AutoFlow AI</span>
          </div>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
            Built with Next.js · Gemini 2.5 Flash · Supabase · Tailwind CSS
          </p>
          <div className="flex gap-6">
            {['Features', 'Agents', 'Pricing', 'FAQ'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
