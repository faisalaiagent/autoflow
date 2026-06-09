'use client';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '10px' }}>{title}</h2>
    <div style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '12px' }}>Privacy Policy</h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>Last updated: June 2, 2024</p>
        </div>

        <div className="p-5 rounded-2xl mb-8" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <strong style={{ color: '#10B981' }}>Short version:</strong> AutoFlow AI stores your API key and app data in your own browser only. We do not collect, sell, or share your personal data with third parties.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>AutoFlow AI collects minimal information necessary to provide the service:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Account information:</strong> When you create an account, we collect your email address and name through Supabase authentication.</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>API key:</strong> Your Groq API key is stored exclusively in your browser localStorage. It is never transmitted to or stored on our servers.</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Usage data:</strong> Task lists, meeting summaries, email history, and calendar events are stored locally in your browser unless you have connected Supabase cloud storage.</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Log data:</strong> Standard server logs including IP address, browser type, and pages visited may be collected by our hosting provider (Vercel).</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>Provide, maintain, and improve AutoFlow AI services</li>
            <li style={{ marginBottom: '6px' }}>Authenticate your account and maintain session security</li>
            <li style={{ marginBottom: '6px' }}>Send transactional emails related to your account (password resets, etc.)</li>
            <li style={{ marginBottom: '6px' }}>Monitor for abuse and ensure platform security</li>
          </ul>
          <p style={{ marginTop: '10px' }}>We do not use your data for advertising purposes, and we do not sell your data to third parties.</p>
        </Section>

        <Section title="3. AI Processing">
          <p>When you use AutoFlow AI agents, your input text (emails, transcripts, task descriptions) is sent directly from your browser to Groq AI using your own API key. This data is processed by Groq according to their privacy policy at groq.com/privacy. AutoFlow AI does not intercept, store, or log the content of your AI requests.</p>
        </Section>

        <Section title="4. Data Storage">
          <p>By default, all your data (tasks, meetings, emails, events) is stored in your browser localStorage. This data never leaves your device unless you choose to connect Supabase cloud storage, in which case data is stored in your own Supabase project under your control.</p>
        </Section>

        <Section title="5. Cookies">
          <p>AutoFlow AI uses essential cookies for authentication sessions. We do not use tracking cookies or advertising cookies. Third-party analytics tools are not currently active on this platform.</p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>We use the following third-party services:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Supabase</strong> - Authentication and optional cloud data storage (supabase.com/privacy)</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Vercel</strong> - Website hosting and deployment (vercel.com/legal/privacy-policy)</li>
            <li style={{ marginBottom: '6px' }}><strong style={{ color: 'var(--text)' }}>Groq AI</strong> - AI model inference using your own API key (groq.com/privacy)</li>
          </ul>
        </Section>

        <Section title="7. Data Security">
          <p>We implement appropriate technical and organizational measures to protect your information. Your API key is never transmitted to our servers. Account passwords are hashed and managed by Supabase. We use HTTPS encryption for all data transmission.</p>
        </Section>

        <Section title="8. Your Rights">
          <p>You have the right to:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>Access the personal data we hold about you</li>
            <li style={{ marginBottom: '6px' }}>Request deletion of your account and associated data</li>
            <li style={{ marginBottom: '6px' }}>Export your data at any time from the Settings page</li>
            <li style={{ marginBottom: '6px' }}>Clear all locally stored data via Settings at any time</li>
          </ul>
          <p style={{ marginTop: '10px' }}>To exercise these rights, contact us at the email address below.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>AutoFlow AI is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify registered users of significant changes via email. Continued use of AutoFlow AI after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
          <div className="mt-3 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
            <p><strong style={{ color: 'var(--text)' }}>AutoFlow AI</strong></p>
            <p>Website: <Link href="https://autoflow-lac.vercel.app" style={{ color: 'var(--accent)', textDecoration: 'none' }}>autoflow-lac.vercel.app</Link></p>
            <p>Contact: <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact Form</Link></p>
          </div>
        </Section>
      </div>
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. | <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link> | <Link href="/about" style={{ color: 'var(--accent)', textDecoration: 'none' }}>About</Link>
        </p>
      </footer>
    </div>
  );
}
