'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap, ArrowRight, Clock, Calendar, Mic,
  CheckCircle2, AlertCircle, Lightbulb, Quote,
  ListChecks, Users, Brain, FileText,
} from 'lucide-react';

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '18px' }}>
    {children}
  </p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.65rem)', color: 'var(--text)', lineHeight: 1.2, marginTop: '52px', marginBottom: '16px' }}>
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '16px', color: 'var(--text)', marginTop: '30px', marginBottom: '10px' }}>
    {children}
  </h3>
);

export default function MeetingBlogPost() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'var(--border-color)', background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)' }}>
            <Zap size={15} color="white" fill="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '16px', color: 'var(--text)' }}>AutoFlow AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
          <Link
            href="/dashboard"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--accent)', color: 'white', padding: '8px 18px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px' }}
          >
            Try Free <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(180deg, rgba(255,107,157,0.08) 0%, transparent 100%)', borderBottom: '1px solid var(--border-color)', padding: '48px 24px 40px' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span
                className="px-3 py-1 rounded-full"
                style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '10px', color: '#ff6b9d', background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Meeting Productivity
              </span>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                <Clock size={12} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>8 min read</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: 'var(--text-subtle)' }}>
                <Calendar size={12} /><span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px' }}>June 5, 2024</span>
              </div>
            </div>

            <h1 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--text)', lineHeight: 1.1, marginBottom: '20px' }}>
              Why Your Meetings Are Not the Problem — Your Notes Are
            </h1>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '24px' }}>
              Most teams do not have a meeting problem. They have a follow-through problem. Everything discussed in the room vanishes within 48 hours because nobody captured it properly. Here is how an AI meeting summary agent changes that entirely.
            </p>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)', color: 'white', fontFamily: 'var(--font-syne)' }}
              >
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

      {/* Article */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

          {/* ── INTRO ──────────────────────────────────────────────── */}
          <P>Picture this. You just finished a one-hour strategy meeting. There were eight people in the room. Three decisions got made, seven tasks were assigned, and two open questions were left for follow-up. Someone mentioned a deadline that sounded important. You think the deadline was Thursday. Or maybe it was next Thursday. You are not sure.</P>
          <P>You wrote some notes during the meeting. They say things like "discuss pricing with team" and "Ali to follow up with vendor" and "check numbers again." That is it. No context, no deadlines, no indication of what any of it actually means now that the meeting is over and the energy of the room has evaporated.</P>
          <P>You send a follow-up email that says "great meeting everyone, let us keep the momentum going." Three days later, nothing has moved. The vendor Ali was supposed to follow up with has not heard anything. The pricing question is still open. Nobody remembered the deadline, partly because nobody is entirely sure what the deadline was for.</P>
          <P>This is not an unusual situation. This is how most meetings end, in most companies, on most days. And the reason is almost never that the meeting itself was bad. The conversation was productive. The thinking was solid. The decisions were real. The problem is that none of it was captured in a way that could survive contact with the rest of the workday.</P>

          {/* ── SECTION 1 ──────────────────────────────────────────── */}
          <H2>The Real Reason Meetings Feel Wasteful</H2>
          <P>There is a statistic that gets shared a lot in business circles: companies spend an enormous amount of time and money on meetings that produce no measurable outcome. The figure varies depending on who you ask, but the direction is consistent. Meetings are seen as one of the biggest drains on organizational productivity.</P>
          <P>But here is the thing — when you dig into why meetings fail, the answer is almost never the meeting itself. It is what happens, or more accurately what does not happen, in the 24 hours afterward.</P>
          <P>A meeting is a compressed moment of shared understanding. Everyone in the room is aligned, at least temporarily. Decisions are in the air. Context is shared. Energy is present. Then the meeting ends and everyone goes back to their individual inboxes and task lists and the shared understanding starts to dissolve almost immediately.</P>

          {/* Pull quote */}
          <div className="my-8 p-6 rounded-2xl flex gap-4" style={{ background: 'rgba(255,107,157,0.06)', border: '1px solid rgba(255,107,157,0.2)' }}>
            <Quote size={20} style={{ color: '#ff6b9d', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
              A meeting without a proper summary is like a contract nobody signed. Everyone agreed to something, but there is no record of what, by when, or who was responsible.
            </p>
          </div>

          <P>The bottleneck is not the meeting. It is the transition from spoken agreement to written record. That transition requires someone to sit down after the meeting — usually already mentally exhausted from the meeting itself — and reconstruct what happened from memory and scattered notes. Most of the time that either does not happen at all, or it produces something so incomplete that it barely counts.</P>
          <P>The result is a cycle that many teams know well: meetings happen, people leave with different memories of what was decided, follow-through is inconsistent, the same topics come up again in the next meeting, and everyone quietly blames the meetings rather than the missing documentation.</P>

          {/* ── SECTION 2 ──────────────────────────────────────────── */}
          <H2>What a Meeting Summary Actually Needs to Contain</H2>
          <P>Before talking about AI, it is worth being specific about what actually makes a meeting summary useful. Because most people who do write summaries — and they deserve credit for doing it at all — produce something that is too thin to do the job.</P>

          <div className="space-y-4 my-6">
            {[
              { icon: FileText, color: '#7c6bff', title: 'An executive summary', desc: 'Two or three sentences that tell someone who was not in the meeting what the meeting was about and what the main outcome was. Not a detailed account — just enough that someone can understand at a glance whether this is relevant to them.' },
              { icon: ListChecks, color: '#6bffcc', title: 'Action items with owners and deadlines', desc: 'Not "team to discuss pricing." Specifically who is doing what by when. This is the most important part of any meeting record and it is almost always the least well-documented part.' },
              { icon: Brain, color: '#ff6b9d', title: 'Decisions made', desc: 'A clean list of what was actually decided. Not what was discussed — what was resolved. These are the things that should not come up again in the next meeting as if they were still open.' },
              { icon: Users, color: '#ffb86b', title: 'Key topics covered', desc: 'A brief list of the main subjects discussed, which serves both as context for the summary and as a quick reference for people who need to know whether a particular topic was addressed.' },
              { icon: Mic, color: '#ff6b9d', title: 'Next meeting agenda items', desc: 'What needs to be carried forward? What unresolved questions need time in the next session? Capturing this at the end of the meeting, while context is still fresh, saves significant preparation time later.' },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <P>Writing a summary that genuinely covers all of these components for a one-hour meeting takes 20 to 30 minutes of focused effort if you are doing it manually. That is a significant ask on top of the hour you already spent in the meeting. It is no surprise most people cut corners or skip it entirely.</P>

          {/* ── SECTION 3 ──────────────────────────────────────────── */}
          <H2>What the AI Meeting Summary Agent Does Differently</H2>
          <P>The meeting summary agent in AutoFlow AI works from your transcript or raw notes. You paste in whatever you have — a rough transcript from a recording tool, detailed notes you typed during the call, or even a disorganized dump of bullet points that made sense at the time — and the AI turns it into a complete, structured summary in seconds.</P>
          <P>What comes back is not a reworded version of your notes. It is a properly organized document with each of the components above filled in correctly: a clean executive summary, individual action items each tagged with an owner and a timeline, a separate list of decisions made, the key topics covered, and suggested items for the next meeting agenda.</P>
          <P>There is also something the agent produces that I did not expect to find as useful as I do: a sentiment reading. The AI assesses whether the overall tone of the meeting was positive, neutral, or negative based on the language in the transcript. This sounds like a minor detail but it is genuinely useful context for anyone reading the summary who was not in the meeting — it gives them a sense of the energy of the conversation, not just the content.</P>

          <H3>The transcript does not need to be clean</H3>
          <P>One concern people have is that AI tools require polished input to produce good output. That is not the case here. You can paste a rough transcript full of filler words, interrupted sentences, people talking over each other, and tangential discussions that went nowhere. The AI is trained to extract the signal from the noise. It knows the difference between a decision being made and someone thinking out loud. It understands that "let us table that for now" means something different to the structure of the meeting than "we agreed to move forward with option B."</P>
          <P>You can also give it the meeting title as context. That simple addition helps the AI frame the summary correctly — a sales pipeline review is going to have different structures and priorities than a product design critique or a quarterly planning session.</P>

          <H3>The output is immediately usable</H3>
          <P>One of the things that makes manual meeting summaries so tedious is not just writing them — it is formatting them. Making them readable. Getting the action items into a format where they are actually scannable. The AI outputs everything already organized. You can copy it directly into an email, paste it into your team's Notion workspace, or drop it into a Slack message. No reformatting required.</P>

          {/* ── SECTION 4 ──────────────────────────────────────────── */}
          <H2>The Real-World Impact on How Teams Work</H2>
          <P>When meeting summaries are consistently good and consistently fast, a few things change in how teams operate. These are not hypothetical benefits — they are things I noticed directly after starting to use this tool regularly.</P>

          <div className="space-y-3 my-6">
            {[
              { num: '01', color: '#6bffcc', title: 'Follow-through actually happens', desc: 'When action items are specific, named, and documented within minutes of a meeting ending, the probability of them being completed goes up substantially. People remember what they committed to. There is a written record if they forget. Accountability becomes structural rather than relying on everyone\'s memory.' },
              { num: '02', color: '#7c6bff', title: 'Fewer repeat meetings', desc: 'One of the most common reasons teams call follow-up meetings is that the original meeting produced no written record, so two weeks later nobody is sure what was decided. A good summary eliminates this problem. The decision is documented. The rationale is preserved. There is nothing to relitigate.' },
              { num: '03', color: '#ff6b9d', title: 'Absent team members can catch up properly', desc: 'When someone misses a meeting, a good summary gives them the actual substance — not just "we talked about some stuff, catch up with someone." They know what was decided, what they need to do, and what context they need to engage in the next conversation.' },
              { num: '04', color: '#ffb86b', title: 'Meeting preparation gets better', desc: 'When your previous meeting summary includes a "next agenda items" section, the next meeting has a ready starting point. You are not scrambling to remember what needed to be carried forward. The meeting structure builds on itself rather than starting from scratch each time.' },
            ].map(({ num, color, title, desc }) => (
              <div key={num} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: `${color}15`, color, fontFamily: 'var(--font-dm-mono)', border: `1px solid ${color}25` }}>
                  {num}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 5 ──────────────────────────────────────────── */}
          <H2>Getting the Best Results From the Tool</H2>
          <P>Using the meeting summary agent is straightforward, but there are a few habits that produce noticeably better output.</P>

          <H3>Give it more rather than less</H3>
          <P>The more content you provide, the better the summary. A rough two-page transcript will produce a significantly more accurate and useful summary than three bullet points. If you record your calls, most transcription tools — including built-in features in Zoom, Google Meet, and Teams — can give you a rough transcript in a few minutes. Paste that in and the AI has everything it needs.</P>

          <H3>Include the meeting title</H3>
          <P>This sounds small but it matters. "Q2 Budget Review" tells the AI to focus on financial context, decisions, and budget-related action items. "Product Roadmap Planning" tells it to look for feature decisions, timelines, and ownership assignments. The title shapes how the AI frames and prioritizes the content.</P>

          <H3>Review the action items specifically</H3>
          <P>The summary and key topics sections are usually accurate without much intervention. The action items deserve a closer read. The AI is good at identifying tasks that were assigned, but occasionally a commitment that was made casually in conversation — the kind where someone says "yeah I can handle that" without the specifics being spelled out — might be missed or attributed to the wrong person. A 30-second scan of the action items list before sharing it catches these edge cases.</P>

          <H3>Send it within the hour</H3>
          <P>The value of a meeting summary is highest immediately after the meeting, when the content is still fresh in everyone's minds and the context can reinforce what they remember. A summary sent two days later — when people have had three more meetings and moved on — gets a fraction of the attention. The speed that AI enables is not just a convenience. It is what makes the summary actionable rather than archival.</P>

          {/* ── SECTION 6 ──────────────────────────────────────────── */}
          <H2>Where AI Meeting Summaries Have Limits</H2>
          <P>I want to be honest about where the tool works well and where you need to apply your own judgment.</P>

          <div className="space-y-3 my-5">
            {[
              { title: 'Highly confidential discussions', desc: 'Board-level conversations, legal proceedings, HR matters, or anything involving sensitive personal information should be handled with care before pasting into any AI tool. Use your organization\'s data policy as your guide.' },
              { title: 'Technical decisions requiring domain expertise', desc: 'If your meeting involved deep technical architecture discussions, the AI will capture that a decision was made but may not fully represent the nuance of the technical reasoning behind it. For high-stakes technical decisions, supplement the AI summary with your own notes on the rationale.' },
              { title: 'Interpersonal or political subtext', desc: 'The AI reads what was said, not what was meant. If your meeting had significant subtext — tension between stakeholders, unspoken disagreements, things left diplomatically unsaid — the summary will reflect the surface of the conversation, not its undercurrents. That contextual layer is yours to add.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
                <AlertCircle size={15} style={{ color: '#f87171', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: '#f87171', marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <P>None of these limitations are reasons not to use the tool. They are reasons to apply judgment on top of the AI output, which is exactly what good use of any AI tool looks like.</P>

          {/* ── SECTION 7 ──────────────────────────────────────────── */}
          <H2>The Bigger Shift This Creates</H2>
          <P>There is a deeper change that happens when meeting documentation becomes fast and reliable. It changes how seriously people take the meetings themselves.</P>
          <P>When everyone knows that a clear summary will exist within minutes of the meeting ending, the energy in the room is different. Commitments feel more real because they will be documented. Decisions feel more final because there will be a written record. People speak more precisely about who is responsible for what and by when, because they know those details will be captured and shared.</P>

          {/* Insight callout */}
          <div className="my-8 p-6 rounded-2xl flex gap-4" style={{ background: 'rgba(107,255,204,0.06)', border: '1px solid rgba(107,255,204,0.2)' }}>
            <Lightbulb size={20} style={{ color: '#6bffcc', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.75, margin: 0 }}>
              Documentation does not just record what happened in a meeting. It changes what happens in the meeting. When people know their words will be captured precisely, they choose those words more carefully.
            </p>
          </div>

          <P>This is a cultural shift as much as a process change. Teams that consistently document their meetings well tend to have better meetings — not because someone forced them to improve, but because the documentation itself creates a feedback loop. You can see what got done and what did not. You can see which decisions held and which had to be revisited. You can see patterns in where things fall through the cracks and address them directly.</P>
          <P>None of that feedback loop exists if the meetings are not documented. And for most teams, until now, documenting meetings well enough to create that feedback loop required more effort than people were willing to consistently invest.</P>
          <P>That is what changes with AI. The effort drops to almost nothing. Paste your notes, get a complete summary, share it within the hour. The barrier to consistent documentation becomes low enough that people actually do it.</P>

          {/* ── CONCLUSION ─────────────────────────────────────────── */}
          <H2>Final Thoughts</H2>
          <P>I built the meeting summary agent in AutoFlow AI because I was tired of watching good conversations produce no lasting record. The thinking was solid. The decisions were real. And then nothing happened because nobody wrote anything down in a way that survived the rest of the week.</P>
          <P>What I have found using it consistently is that it does not just save time on documentation. It changes the entire relationship between meetings and outcomes. When summaries are fast, reliable, and shared immediately, the meeting becomes the beginning of a process rather than the whole thing.</P>
          <P>Action items get completed. Decisions stick. People arrive at the next meeting knowing what happened in the last one. The conversations build on each other instead of starting over each time.</P>
          <P>If your team holds regular meetings and struggles with follow-through — and most teams do — the fastest way to improve that is not to hold fewer meetings or to add more agenda structure. It is to document what happens in the meetings you are already having, quickly and completely, and share that documentation before the day is over.</P>
          <P>The AutoFlow AI meeting summary agent is free to use with your own Groq API key. You can try it right now with the transcript or notes from any meeting you had this week. Paste them in, see what comes back, and share that with your team. The difference it makes is immediate and obvious.</P>

          {/* CTA card */}
          <div className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden" style={{ background: 'rgba(255,107,157,0.06)', border: '1px solid rgba(255,107,157,0.2)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,157,0.5), transparent)' }} />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,157,0.12)', border: '1px solid rgba(255,107,157,0.2)' }}>
              <Mic size={20} style={{ color: '#ff6b9d' }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '20px', color: 'var(--text)', marginBottom: '10px' }}>
              Try the Meeting Summary Agent Free
            </h3>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.7 }}>
              Paste notes or a transcript from any recent meeting. Get a structured summary with action items, decisions, and next agenda items in seconds.
            </p>
            <Link
              href="/dashboard/meeting"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ff6b9d', color: 'white', padding: '12px 28px', borderRadius: '12px', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 20px rgba(255,107,157,0.3)' }}
            >
              <Mic size={15} />
              Open Meeting Agent
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
              Continue Reading
            </p>
            <Link
              href="/blog"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: '14px', color: 'var(--accent)' }}
            >
              <ArrowRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to all articles
            </Link>
          </div>
        </motion.article>
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
