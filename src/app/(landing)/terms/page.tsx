'use client';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '10px' }}>{title}</h2>
    <div style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

export default function TermsPage() {
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
          <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '12px' }}>Terms of Service</h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>Last updated: June 2, 2024</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using AutoFlow AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>AutoFlow AI provides an AI-powered workflow automation platform featuring four intelligent agents: an Email Reply Bot, Meeting Summary Bot, Task Manager Agent, and Calendar Assistant. The Service uses the Groq AI API with your own API key to generate content.</p>
        </Section>

        <Section title="3. User Accounts">
          <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>You must provide accurate information when creating an account.</li>
            <li style={{ marginBottom: '6px' }}>You are responsible for maintaining the security of your account credentials.</li>
            <li style={{ marginBottom: '6px' }}>You must be at least 13 years of age to use the Service.</li>
            <li style={{ marginBottom: '6px' }}>One person may not maintain more than one free account.</li>
          </ul>
        </Section>

        <Section title="4. API Key Usage">
          <p>To use the AI features of AutoFlow AI, you must provide your own Groq API key. By using the Service:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>You agree to comply with Groq's terms of service and usage policies.</li>
            <li style={{ marginBottom: '6px' }}>You are responsible for all API usage and associated costs under your Groq account.</li>
            <li style={{ marginBottom: '6px' }}>Your API key is stored in your browser only and is never shared with AutoFlow AI servers.</li>
          </ul>
        </Section>

        <Section title="5. Acceptable Use">
          <p>You agree not to use AutoFlow AI to:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>Generate content that is illegal, harmful, threatening, abusive, or harassing</li>
            <li style={{ marginBottom: '6px' }}>Violate any applicable laws or regulations</li>
            <li style={{ marginBottom: '6px' }}>Infringe upon the intellectual property rights of others</li>
            <li style={{ marginBottom: '6px' }}>Attempt to gain unauthorized access to other accounts or systems</li>
            <li style={{ marginBottom: '6px' }}>Use automated tools to scrape or abuse the platform</li>
            <li style={{ marginBottom: '6px' }}>Send spam or unsolicited communications using AI-generated content</li>
          </ul>
        </Section>

        <Section title="6. AI-Generated Content">
          <p>AutoFlow AI generates content using artificial intelligence. You acknowledge that:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px', listStyle: 'disc' }}>
            <li style={{ marginBottom: '6px' }}>AI-generated content may not always be accurate, complete, or appropriate.</li>
            <li style={{ marginBottom: '6px' }}>You are responsible for reviewing and verifying any AI-generated content before use.</li>
            <li style={{ marginBottom: '6px' }}>AutoFlow AI is not liable for decisions made based on AI-generated content.</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>The AutoFlow AI platform, including its design, code, and branding, is owned by AutoFlow AI and protected by intellectual property laws. You retain ownership of content you create using the Service. By using the Service, you grant AutoFlow AI no rights to your content.</p>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. AUTOFLOW AI DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, AUTOFLOW AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</p>
        </Section>

        <Section title="10. Termination">
          <p>We reserve the right to suspend or terminate your account at any time for violations of these Terms. You may delete your account at any time through the Settings page.</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We may update these Terms of Service from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
        </Section>

        <Section title="12. Contact">
          <p>For questions about these Terms, please contact us through our <Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Contact page</Link>.</p>
        </Section>
      </div>
      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. | <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link> | <Link href="/about" style={{ color: 'var(--accent)', textDecoration: 'none' }}>About</Link>
        </p>
      </footer>
    </div>
  );
}
