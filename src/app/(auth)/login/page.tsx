'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    setError('');
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password });
    if (authErr) {
      setError(authErr.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    // Demo mode - redirect directly to dashboard without auth
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7c6bff]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#ff6b9d]/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c6bff] to-[#ff6b9d] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">AutoFlow</span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Welcome back</h1>
          <p className="text-[#8888aa] text-sm">Sign in to your workspace</p>
        </div>

        {/* Card */}
        <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8888aa] font-medium mb-1.5 tracking-wide">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5555aa]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a24] border border-[#2a2a3a] text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#7c6bff] focus:ring-2 focus:ring-[#7c6bff]/15 transition-all placeholder-[#5555aa]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#8888aa] font-medium mb-1.5 tracking-wide">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5555aa]" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a24] border border-[#2a2a3a] text-white rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:border-[#7c6bff] focus:ring-2 focus:ring-[#7c6bff]/15 transition-all placeholder-[#5555aa]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5555aa] hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-display font-bold bg-[#7c6bff] hover:bg-[#9585ff] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(124,107,255,0.4)] text-sm"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#2a2a3a]" />
            <span className="text-xs text-[#5555aa] font-mono-custom">or</span>
            <div className="flex-1 h-px bg-[#2a2a3a]" />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#7c6bff]/40 text-white py-3 rounded-xl transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              onClick={handleDemoLogin}
              className="w-full flex items-center justify-center gap-2 bg-[#7c6bff]/10 border border-[#7c6bff]/30 hover:bg-[#7c6bff]/20 text-[#7c6bff] py-3 rounded-xl transition-all text-sm font-display font-bold"
            >
              <Zap size={14} />
              Try demo (no account needed)
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-[#8888aa] mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#7c6bff] hover:text-[#9585ff] transition-colors font-medium">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
