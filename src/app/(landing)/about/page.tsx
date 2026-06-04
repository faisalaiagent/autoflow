'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Mail, Mic, CheckSquare, Calendar, ArrowRight, Shield, Globe, Users, MapPin, Code2, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* Nav */}
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

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>About</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '16px' }}>
            About AutoFlow AI
          </h1>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            A free, AI-powered workflow automation platform built to make everyday professional tasks less painful — for individuals who want to move faster and for teams that are tired of doing the same things manually over and over again.
          </p>
        </motion.div>

        {/* Why I Built This */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} style={{ color: '#ffb86b' }} />
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>Why I Built This</h2>
          </div>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            Every professional has had that moment — you need to reply to an important email, write up meeting notes before you forget them, or figure out what you are supposed to be doing today — and you end up spending more time on the task management than on the actual work. These are genuinely useful activities, but the friction around them kills momentum.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.85 }}>
            I built AutoFlow AI because I was tired of that friction — both in my own workflow and watching others deal with it. I wanted a tool that could handle these tasks intelligently: one that generates a polished email reply in seconds, extracts action items from a meeting transcript automatically, lets you manage tasks in plain English, and schedules your calendar through natural conversation. The four agents in AutoFlow each handle one of those problems.
          </p>
        </motion.div>

        {/* Creator card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mb-10 p-6 rounded-2xl relative overflow-hidden" style={{ background: 'rgba(124,107,255,0.06)', border: '1px solid rgba(124,107,255,0.2)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,107,255,0.5), transparent)' }} />
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-bold" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)', color: 'white', fontFamily: 'var(--font-syne)', boxShadow: '0 8px 24px rgba(124,107,255,0.35)' }}>
              SF
            </div>
            <div className="flex-1 min-w-0">
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '18px', color: 'var(--text)', marginBottom: '4px' }}>Shah Faisal</h3>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', marginBottom: '10px', letterSpacing: '0.04em' }}>Self-taught Developer and Builder</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} style={{ color: 'var(--text-subtle)' }} />
                  <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>Karachi, Pakistan</span>
                </div>
                <a href="mailto:faisalagentai@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}>
                  <Mail size={12} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--accent)' }}>faisalagentai@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* My Story */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={16} style={{ color: 'var(--accent)' }} />
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)' }}>My Story</h2>
          </div>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            My name is Shah Faisal and I am a self-taught developer based in Karachi, Pakistan. I did not go through a formal computer science program. Everything I know about programming came from building things — reading documentation, watching tutorials late at night, breaking projects and slowly figuring out why, and doing it all over again.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            That path taught me something important: the best way to learn anything in tech is to build something real that solves a real problem. Not a tutorial project. Not a demo app for the tenth time. Something you would actually use yourself.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.85 }}>
            AutoFlow AI started as a personal productivity tool. I was dealing with repetitive work tasks and started experimenting with AI to handle them automatically. I realized how much faster it made everything — drafting emails, capturing meeting outcomes, keeping track of tasks. I polished it into a proper platform and released it publicly so other professionals could benefit from it too. Since launching, I have been continuously improving it based on real feedback. Every feature in this app came from a real problem someone was trying to solve.
          </p>
        </motion.div>

        {/* What AutoFlow Does */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>What AutoFlow Does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Mail, color: '#7c6bff', title: 'Email Reply Bot', desc: 'Paste any email you received and get a complete, polished reply with customizable tone in seconds.' },
              { icon: Mic, color: '#ff6b9d', title: 'Meeting Summary Bot', desc: 'Drop in a meeting transcript and get a structured summary, action items, decisions, and next agenda.' },
              { icon: CheckSquare, color: '#6bffcc', title: 'Task Manager Agent', desc: 'Create, prioritize, and complete tasks using plain natural language. No rigid forms, just conversation.' },
              { icon: Calendar, color: '#ffb86b', title: 'Calendar Assistant', desc: 'Schedule events, check conflicts, and manage your calendar through simple conversational commands.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15` }}>
                  <Icon size={17} style={{ color }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '6px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What Makes This Different */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>What Makes This Different</h2>
          <div className="space-y-4">
            {[
              { color: '#7c6bff', title: 'Your key, your control', desc: 'You bring your own Groq API key. It is stored in your browser only and never touches our servers. Your data stays yours.' },
              { color: '#6bffcc', title: 'No account required to explore', desc: 'Open the app and start using it. No email wall, no signup form, no credit card before you can see anything useful.' },
              { color: '#ff6b9d', title: 'Built for real workflows', desc: 'These are not demo features. Email replies, meeting summaries, task management, and calendar scheduling are things real professionals do every single day.' },
              { color: '#ffb86b', title: 'Made with care', desc: 'This is not a side project I built once and abandoned. I use AutoFlow myself every week and keep updating it based on how real people actually use it.' },
            ].map(({ color, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: color, minHeight: '40px' }} />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mb-10 p-6 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '12px' }}>The Technology Behind It</h2>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '14px' }}>
            AutoFlow AI is built with <strong style={{ color: 'var(--text)' }}>Next.js 15</strong> (App Router) and <strong style={{ color: 'var(--text)' }}>TypeScript</strong> on the frontend, styled with <strong style={{ color: 'var(--text)' }}>Tailwind CSS</strong>. The AI features are powered by <strong style={{ color: 'var(--text)' }}>Groq's API running LLaMA 3</strong> — one of the fastest and most capable open-source language models available, chosen for its speed, reliability, and quality of output on structured tasks.
          </p>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.85 }}>
            Authentication and data persistence are handled by <strong style={{ color: 'var(--text)' }}>Supabase</strong>. The app is deployed on <strong style={{ color: 'var(--text)' }}>Vercel</strong>. The entire stack is designed to be fast, reliable, and easy to maintain. AI responses typically arrive in under 2 seconds.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '16px' }}>Values</h2>
          <div className="space-y-4">
            {[
              { icon: Shield, color: '#6bffcc', title: 'Privacy First', desc: 'Your API key lives in your browser only. No data is ever sent to AutoFlow servers. Complete privacy by design.' },
              { icon: Globe, color: '#7c6bff', title: 'Open and Accessible', desc: 'AutoFlow is free to use. Powerful AI tools should not require an enterprise contract.' },
              { icon: Users, color: '#ff6b9d', title: 'Built for Real Users', desc: 'Every feature exists because a real person had a real problem. Not because it looked good on a roadmap.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</h3>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="text-center p-8 rounded-2xl relative overflow-hidden" style={{ background: 'rgba(124,107,255,0.06)', border: '1px solid rgba(124,107,255,0.2)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,107,255,0.5), transparent)' }} />
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>Have a question or want to say hello?</h2>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            I read every message personally and reply to all of them.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '10px 24px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', boxShadow: '0 4px 20px rgba(124,107,255,0.3)' }}>
              Send a Message <ArrowRight size={13} />
            </Link>
            <a href="mailto:faisalagentai@gmail.com" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--surface)', color: 'var(--text)', padding: '10px 24px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '13px', border: '1px solid var(--border-color)' }}>
              <Mail size={13} /> faisalagentai@gmail.com
            </a>
          </div>
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
