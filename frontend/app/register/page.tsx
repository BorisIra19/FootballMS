'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/lib/api';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await register({ name: form.name, email: form.email, password: form.password });
      localStorage.setItem('fms_token', res.data.token);
      localStorage.setItem('fms_admin', JSON.stringify(res.data.admin));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-green-950 via-gray-900 to-gray-950 items-center justify-center p-12">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(22,163,74,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-700/20 rounded-full blur-3xl" />
        <div className="relative text-center">
          <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl shadow-green-900/60">⚽</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Join Football<span className="text-green-400">MS</span></h2>
          <p className="text-gray-400 text-lg max-w-sm leading-relaxed">Start managing your football organization in minutes. It's completely free.</p>
          <div className="mt-10 space-y-3 text-left">
            {['Create and manage unlimited leagues', 'Track players, stats and performance', 'Schedule matches and record results', 'View live standings and rankings'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">⚽</div>
            <h1 className="text-2xl font-bold text-white">Football<span className="text-green-400">MS</span></h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Create an account</h2>
            <p className="text-gray-400 mt-2">Get started with FootballMS today</p>
          </div>

          {error && (
            <div className="bg-red-950/60 border border-red-800/60 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input type="text" required placeholder="John Doe" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" required placeholder="you@example.com" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} required placeholder="Min. 6 characters" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input type="password" required placeholder="Repeat your password" value={form.confirm}
                onChange={e => setForm({ ...form, confirm: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-900 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 mt-2">
              {loading
                ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Creating account...</>
                : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">Sign in here</Link>
          </p>
          <p className="text-center text-sm text-gray-600 mt-3">
            <Link href="/home" className="hover:text-gray-400 transition-colors">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
