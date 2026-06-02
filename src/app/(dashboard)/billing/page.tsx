'use client'
import { motion } from 'framer-motion'
import { Check, X, CreditCard, Zap, ArrowRight, Star, Shield } from 'lucide-react'
import TopBar from '@/components/shared/TopBar'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'Forever',
    color: '#8888aa',
    current: true,
    features: [
      { text: 'All 4 AI agents', included: true },
      { text: '50 AI actions/month', included: true },
      { text: 'Local browser storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Cloud sync via Supabase', included: false },
      { text: 'Team workspace', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    color: '#7c6bff',
    popular: true,
    features: [
      { text: 'All 4 AI agents', included: true },
      { text: 'Unlimited AI actions', included: true },
      { text: 'Supabase cloud sync', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Team workspace (5 seats)', included: true },
      { text: 'SMTP email sending', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    color: '#6bffcc',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited team seats', included: true },
      { text: 'Custom AI fine-tuning', included: true },
      { text: 'Shared workspaces', included: true },
      { text: 'Role-based permissions', included: true },
      { text: 'Slack & Notion integration', included: true },
      { text: 'Dedicated support', included: true },
    ],
  },
]

const perks = [
  { icon: Shield, label: 'Secure Payments', desc: 'Powered by Stripe. PCI-DSS compliant.' },
  { icon: Zap, label: 'Instant Activation', desc: 'Upgrade takes effect immediately.' },
  { icon: Star, label: 'Cancel Anytime', desc: 'No lock-in. Downgrade anytime.' },
]

const sectionStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  padding: '24px',
}

export default function BillingPage() {
  return (
    <div>
      <TopBar title="Billing" subtitle="Manage your plan and payment methods" />
      <div className="p-6 space-y-8 max-w-5xl">

        {/* Current Plan Banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-5 rounded-2xl"
          style={{ background: 'rgba(124,107,255,0.08)', border: '1px solid rgba(124,107,255,0.2)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,107,255,0.15)', border: '1px solid rgba(124,107,255,0.25)' }}>
              <CreditCard size={18} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>
                Current Plan: <span style={{ color: 'var(--accent)' }}>Starter (Free)</span>
              </p>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                50 AI actions used this month · Resets on June 1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: '#4ade80' }}>Active</span>
          </div>
        </motion.div>

        {/* Plans */}
        <div>
          <div className="mb-6">
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '20px', color: 'var(--text)' }}>
              Upgrade your plan
            </h2>
            <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Unlock unlimited AI actions, cloud storage, and team collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl relative overflow-hidden flex flex-col"
                style={{
                  background: plan.popular ? 'rgba(124,107,255,0.08)' : 'var(--surface)',
                  border: `1px solid ${plan.popular ? 'rgba(124,107,255,0.35)' : plan.current ? 'rgba(136,136,170,0.3)' : 'var(--border-color)'}`,
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                )}
                {plan.popular && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md" style={{ background: 'rgba(124,107,255,0.2)', border: '1px solid rgba(124,107,255,0.3)', fontFamily: 'var(--font-dm-mono)', fontSize: '9px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Popular
                  </div>
                )}

                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: plan.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{plan.name}</span>
                </div>
                <div className="flex items-end gap-1 mb-6">
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '32px', color: plan.color, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{plan.period}</span>
                </div>

                <div className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      {f.included
                        ? <Check size={13} style={{ color: plan.color, flexShrink: 0 }} />
                        : <X size={13} style={{ color: 'var(--text-subtle)', flexShrink: 0 }} />}
                      <span style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: f.included ? 'var(--text-muted)' : 'var(--text-subtle)' }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={plan.current}
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: plan.current ? 'var(--surface-2)' : plan.popular ? 'var(--accent)' : 'var(--surface-2)',
                    color: plan.current ? 'var(--text-subtle)' : plan.popular ? 'white' : 'var(--text)',
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: plan.current ? '1px solid var(--border-color)' : plan.popular ? 'none' : '1px solid var(--border-color)',
                    cursor: plan.current ? 'default' : 'pointer',
                    boxShadow: plan.popular ? '0 4px 20px rgba(124,107,255,0.3)' : 'none',
                  }}
                >
                  {plan.current ? 'Current Plan' : (
                    <>Upgrade to {plan.name} <ArrowRight size={13} /></>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {perks.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={sectionStyle}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,107,255,0.12)', border: '1px solid rgba(124,107,255,0.2)' }}>
                <Icon size={15} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p style={{ fontFamily: 'var(--font-instrument)', fontSize: '13px', color: 'var(--text-muted)' }}>
            Questions about billing?{' '}
            <a href="mailto:hello@autoflow.ai" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Contact support
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
