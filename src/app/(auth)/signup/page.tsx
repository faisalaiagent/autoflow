'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) { setError('Please fill in all fields'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    setError('');

    const { error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (authErr) {
      setError(authErr.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#10B981]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#10B981]" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">Check your email</h2>
          <p className="text-[#8888aa] mb-6">
            We've sent a confirmation link to <strong className="text-white">{email}</strong>.
            Click it to activate your account.
          </p>
          <Link href="/login" className="text-[#6366F1] hover:text-[#818CF8] transition-colors text-sm">
            Back to sign in →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6366F1]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#8B5CF6]/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">AutoFlow</span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Create your account</h1>
          <p className="text-[#8888aa] text-sm">Start automating workflows for free</p>
        </div>

        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8888aa] font-medium mb-1.5 tracking-wide">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5555aa]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#1a1a24] border border-[#2a2a3a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15 transition-all placeholder-[#5555aa]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8888aa] font-medium mb-1.5 tracking-wide">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5555aa]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a24] border border-[#2a2a3a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15 transition-all placeholder-[#5555aa]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8888aa] font-medium mb-1.5 tracking-wide">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5555aa]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#1a1a24] border border-[#2a2a3a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15 transition-all placeholder-[#5555aa]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-display font-bold bg-[#6366F1] hover:bg-[#818CF8] disabled:opacity-50 text-white py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)] text-sm mt-2"
            >
              {loading ? 'Creating account…' : 'Create free account'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#2a2a3a]" />
            <span className="text-xs text-[#5555aa] font-mono-custom">or</span>
            <div className="flex-1 h-px bg-[#2a2a3a]" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#6366F1]/40 text-white py-3 rounded-xl transition-all text-sm font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm text-[#8888aa] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#6366F1] hover:text-[#818CF8] transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
