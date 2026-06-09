'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Clock, Calendar, Mail, CheckCircle2, AlertCircle, Lightbulb, Quote } from 'lucide-react';

const sectionHead = (text: string) => (
  <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', color: 'var(--text)', lineHeight: 1.2, marginTop: '48px', marginBottom: '16px' }}>
    {text}
  </h2>
);

const h3 = (text: string) => (
  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '16px', color: 'var(--text)', marginTop: '28px', marginBottom: '10px' }}>
    {text}
  </h3>
);

const p = (text: string) => (
  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '18px' }}>
    {text}
  </p>
);

export default function BlogPostPage() {
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
        <div className="flex items-center gap-4">
          <Link href="/blog" style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
          <Link href="/dashboard" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '8px 18px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}>
            Try Free <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)', borderBottom: '1px solid var(--border-color)', padding: '48px 24px 40px' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="px-3 py-1 rounded-full" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#6366F1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Email Productivity
              </span>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                <Clock size={12} />
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>7 min read</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                <Calendar size={12} />
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>June 4, 2024</span>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '20px' }}>
              How AI Can Write Your Emails Better Than You Think
            </h1>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '24px' }}>
              Most professionals spend 2 to 3 hours every single day just on email. Here is how an AI email agent changes that completely — and why the replies it generates are often sharper, cleaner, and more effective than what most people write under pressure.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white', fontFamily: 'var(--font-syne)' }}>
                SF
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>Shah Faisal</p>
                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>Builder of AutoFlow AI</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

          {/* Intro */}
          {p("Let me tell you something that will probably sound familiar. You sit down to answer emails after lunch. You have 34 unread messages. Most of them need an actual reply — not just a thumbs up or a quick yes. Some are from clients. Some are from your manager. A few are requests that require careful wording because the relationship matters and you do not want to come across as rude or dismissive or overly formal or any of the dozen things that can go wrong when you write in a hurry.")}
          {p("An hour later, you have replied to six emails. The other 28 are still sitting there. You feel exhausted from something that is not even the real work you were supposed to do today.")}
          {p("This is what email actually costs people. Not just the time it takes to type — the mental energy of deciding what to say, how to say it, what tone is appropriate, whether you need to explain something or keep it short, whether this deserves a long reply or a one-liner. That cognitive load adds up fast, and most people burn through their best thinking hours on it before they even get to the work they are actually paid to do.")}
          {p("I built the email agent inside AutoFlow AI specifically because I lived this problem. And what I found after using it for months is that an AI does not just speed up the process — it actually changes your relationship with your inbox entirely.")}

          {/* Section 1 */}
          {sectionHead("The Real Cost of Writing Emails Yourself")}
          {p("There is a study that gets cited a lot in productivity circles: the average professional spends somewhere between 2 and 4 hours per day on email. Even if you think that sounds high for your situation, consider everything that actually goes into composing a reply that is not completely thoughtless.")}
          {p("First, you read the email — sometimes multiple times, because you need to understand exactly what is being asked before you can respond. Then you have to think about the relationship: Is this someone you need to impress? Someone you have a history of miscommunication with? A new client who does not know your communication style yet?")}
          {p("Then you write something. Then you re-read it and decide it sounds too blunt, or too long, or not clear enough. You edit it. Sometimes you read it a third time before you send it because you are worried about how it will land. By the time you press send on a slightly tricky email, you may have spent 10 or 15 minutes on something that, from the outside, looks like it took 30 seconds.")}

          {/* Callout */}
          <div className="my-8 p-6 rounded-2xl flex gap-4" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <Quote size={20} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
              The average professional spends up to 4 hours per day on email. That is nearly half a working day consumed by a single communication channel.
            </p>
          </div>

          {p("Multiply that across every email in your day and you start to see the real number. It is not just 2 hours. It is your morning focus window. It is the time you could have spent on strategic thinking, creative work, or the things that actually move the needle in your job or business.")}
          {p("That is the problem an AI email agent is actually solving. Not speed for the sake of speed — but freeing up your best mental energy for work that requires it.")}

          {/* Section 2 */}
          {sectionHead("What an AI Email Agent Actually Does")}
          {p("There is a common misconception about AI writing tools: people assume they produce generic, robotic, obviously-machine-written text that anyone can spot from three paragraphs away. That was true for earlier models. It is not true anymore, and it is especially not true when you use a capable AI with the right instructions.")}
          {p("The email agent in AutoFlow AI works like this: you paste the email you received into the input field. You choose a tone — professional, friendly, formal, assertive, or casual depending on who you are writing to and what the situation calls for. You can add any extra context you want: maybe you need to decline politely, or ask for more time, or say yes but with conditions attached. Then the AI writes the complete reply.")}
          {p("What comes back is not a template with blanks to fill in. It is a fully written email — with a subject line, a natural opening, a clear and appropriately toned body, and a closing that matches the professional register of the conversation. The key points from your original email are addressed. Nothing important is left out.")}

          {h3("The tone selection is where it gets genuinely useful")}
          {p("Different professional situations require completely different communication styles, and most people switch between them instinctively when they write. The problem is that doing this well — especially when you are tired, under pressure, or writing to someone in a different culture or industry — takes real skill and attention.")}
          {p("Choosing 'assertive' versus 'professional' versus 'friendly' is not just about the word choice. It changes the sentence structure, the level of directness, how much explanation is offered, whether you invite further questions or close the loop, how you handle disagreement or bad news. A good AI understands these distinctions and applies them consistently in a way that would take you minutes to achieve manually.")}

          {h3("What you can add as context")}
          {p("The optional context field is one of the most useful parts of the tool and also the most underused. You can type something as simple as 'I need to push back on this deadline without seeming difficult' or 'this client has been frustrated with us lately, so I want to be extra warm' or 'keep it under three sentences.' The AI takes that instruction and bakes it into the reply.")}
          {p("This is the difference between a generic reply and a reply that actually fits your specific situation. The AI is not guessing what you need — you are telling it, and it executes.")}

          {/* Section 3 */}
          {sectionHead("The Situations Where AI Email Replies Shine Most")}

          <div className="space-y-4 my-6">
            {[
              { icon: CheckCircle2, color: '#10B981', title: 'Declining requests gracefully', desc: 'Saying no is one of the hardest things to do in email without damaging a relationship. A good AI handles the softening, the explanation, and the door-left-open closing far better than most people do when they are in a rush.' },
              { icon: CheckCircle2, color: '#10B981', title: 'Responding to complaints or frustration', desc: 'When someone is unhappy, the tone of your reply matters enormously. Too defensive and you escalate. Too apologetic and you look weak. Getting the balance right takes care. The AI does this well because it has no ego in the exchange.' },
              { icon: CheckCircle2, color: '#10B981', title: 'Following up without sounding annoying', desc: 'Follow-up emails are awkward to write because you are essentially saying "you forgot about me" without saying that. An AI can thread this needle naturally every single time.' },
              { icon: CheckCircle2, color: '#10B981', title: 'Complex multi-point replies', desc: 'When someone sends an email with four different questions buried in three paragraphs, organizing a reply that addresses all of them cleanly is genuinely difficult. The AI extracts the points and structures the answer clearly.' },
              { icon: CheckCircle2, color: '#10B981', title: 'Writing to people in other cultures or industries', desc: 'Communication norms vary significantly. A tone that feels normal to you might read as abrupt or overly casual to someone from a different professional background. The AI\'s training covers a broad range of communication styles.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <Icon size={18} style={{ color, flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          {sectionHead("What AI Email Tools Are Not Good At")}
          {p("I want to be straightforward about the limitations, because this is a practical guide and not a sales pitch.")}

          <div className="space-y-3 my-5">
            {[
              { title: 'Very personal messages', desc: 'A condolence note to a colleague who lost a family member, or a message to a close friend — these require human warmth and personal knowledge that AI cannot replicate. Use the tool for professional correspondence.' },
              { title: 'Highly technical or niche content', desc: 'If your email requires deep domain-specific knowledge — detailed legal analysis, specific medical information, highly specialized engineering discussion — you will need to review and edit the reply carefully. The AI can handle the structure and tone, but you own the technical accuracy.' },
              { title: 'Emails that require confidential information', desc: 'Do not paste emails that contain sensitive personal data, private business information, or anything you would not want processed by a third-party AI service. Use judgment about what goes into any AI tool.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
                <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: '#EF4444', marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {p("Knowing when not to use a tool is part of using it well. For the vast majority of professional email — client updates, scheduling, requests, feedback, coordination, follow-ups — the AI handles it extremely well.")}

          {/* Section 5 */}
          {sectionHead("How to Actually Get Good Results From an AI Email Tool")}
          {p("There is a difference between using an AI email tool and using it well. Here are the habits that make the difference.")}

          <div className="space-y-4 my-5">
            {[
              { num: '01', title: 'Be specific in the context field', desc: 'The more specific your instruction, the better the output. \"Professional\" is fine. \"Professional but warm — this client has been with us for 5 years\" is much better.' },
              { num: '02', title: 'Read before you send', desc: 'This sounds obvious but it gets skipped. The AI produces a very good first draft, not a finished product that requires zero judgment. Read it, verify the facts, make sure the tone lands right for your specific relationship.' },
              { num: '03', title: 'Iterate if the first version is not right', desc: 'If the tone is off or the structure is not what you wanted, adjust your context instructions and regenerate. It takes 10 seconds and the second attempt is usually much closer.' },
              { num: '04', title: 'Use the key points as a checklist', desc: 'The tool extracts key points from your reply and shows them separately. Use this as a quick audit — if something important is missing from that list, it probably needs to be in the email.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex gap-4 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent)', fontFamily: 'var(--font-dm-mono)' }}>
                  {num}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 6 */}
          {sectionHead("The Bigger Picture — What Changes When You Stop Dreading Your Inbox")}
          {p("Here is what I noticed after several weeks of using an AI email agent consistently. It was not just that I got through email faster. My whole relationship with my inbox changed.")}
          {p("Before, there were certain emails I would put off for hours — sometimes days — because they were complicated or uncomfortable to write. The dread of composing the reply was worse than the content of the email itself. With an AI handling the drafting, that dread disappeared. I could open a difficult email, paste it in, get a solid reply in seconds, review it, make any adjustments, and be done with it. The friction dropped so significantly that I stopped avoiding hard emails entirely.")}
          {p("That is an underrated benefit. Not just the time saved — the elimination of procrastination around communication. When replying is easy, you reply quickly. When you reply quickly, relationships stay warm, things do not fall through the cracks, and you develop a reputation for being responsive and professional.")}

          {/* Callout 2 */}
          <div className="my-8 p-6 rounded-2xl flex gap-4" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <Lightbulb size={20} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.75, margin: 0 }}>
              The best professionals are not necessarily the ones who write the most polished emails. They are the ones who are consistently present, responsive, and clear. AI helps you be all three without burning through your day.
            </p>
          </div>

          {p("Email is not going away. For all the talk about Slack and async video and collaborative documents, email is still how most professional communication happens — especially with clients, vendors, and anyone outside your immediate team. Getting better at it, or getting faster at it without getting worse, is still a genuinely valuable skill to develop.")}
          {p("The interesting shift with AI is that the skill is no longer just writing ability. It is knowing what you want to say, choosing the right tone for the situation, and reviewing the output with enough judgment to know when it is good and when it needs adjustment. That is a higher-order skill than grinding out draft after draft under time pressure.")}

          {/* Conclusion */}
          {sectionHead("Final Thoughts")}
          {p("I started using AI for email out of frustration. I was spending too much time on it, too much mental energy on it, and I kept thinking there had to be a better way. What I found was not just a faster way to do the same thing — it was a fundamentally different approach to professional communication that actually made me better at it, not lazier.")}
          {p("The replies are thoughtful because the AI has been trained on vast amounts of professional communication. The tone is consistent because I am choosing it deliberately rather than letting it be shaped by how tired or rushed or stressed I am in the moment. The output is clean because the AI does not write clunky sentences or forget to address half the points in the original message.")}
          {p("If you spend any meaningful amount of your workday on email — and most professionals do — it is worth trying. The AutoFlow AI email agent is free to use with your own Groq API key. You can try it right now, with a real email you need to send today, and see what the difference actually feels like.")}
          {p("Once you see a well-structured, correctly toned, complete reply generated in under three seconds for something that would have taken you five minutes, it is difficult to go back to doing it manually every time.")}

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden" style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
              <Mail size={20} style={{ color: 'var(--accent)' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '20px', color: 'var(--text)', marginBottom: '10px' }}>
              Try the Email Agent Free
            </h3>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.7 }}>
              Paste any email you received right now. Add your tone and any context. See what the AI writes back. No signup required to get started.
            </p>
            <Link href="/dashboard/email" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', color: 'white', padding: '12px 28px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}>
              <Mail size={15} />
              Open Email Agent
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Continue Reading</p>
            <Link href="/blog" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '14px', color: 'var(--accent)' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to all articles
            </Link>
          </div>

        </motion.article>
      </div>

      <footer className="border-t px-6 py-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>
          2024 AutoFlow AI. All rights reserved. |{' '}
          <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Privacy Policy</Link> |{' '}
          <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}
