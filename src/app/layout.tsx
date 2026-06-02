import type { Metadata } from 'next';
import { Syne, DM_Mono, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'AutoFlow AI — Intelligent Workflow Automation',
  description: '4 powerful AI agents for email replies, meeting summaries, task management, and calendar scheduling — powered by Groq LLaMA 3.',
  keywords: ['AI automation', 'workflow', 'email assistant', 'meeting summary', 'task manager', 'calendar AI'],
  openGraph: {
    title: 'AutoFlow AI',
    description: 'Automate your digital workflows with 4 intelligent AI agents.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmMono.variable} ${instrumentSans.variable} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
