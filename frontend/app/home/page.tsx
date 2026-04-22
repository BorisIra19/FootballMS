'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trophy, Users, Calendar, BarChart2, ChevronRight, Shield, Zap, Globe } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Teams Managed' },
  { value: '12K+', label: 'Players Tracked' },
  { value: '3K+', label: 'Matches Recorded' },
  { value: '120+', label: 'Leagues Active' },
];

const features = [
  { icon: Trophy, title: 'League Management', desc: 'Create and manage multiple leagues and tournaments with full season control.' },
  { icon: Users, title: 'Team & Player Tracking', desc: 'Manage rosters, player stats, positions, and performance data in real time.' },
  { icon: Calendar, title: 'Match Scheduling', desc: 'Schedule fixtures, record live scores, and track match results automatically.' },
  { icon: BarChart2, title: 'Live Standings', desc: 'Auto-updated standings tables with goal difference, points, and rankings.' },
  { icon: Shield, title: 'Secure Access', desc: 'Role-based authentication with JWT tokens to keep your data safe.' },
  { icon: Zap, title: 'Real-time Updates', desc: 'Instant data sync across your entire system whenever changes are made.' },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-green-900/40 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-green-900/50">⚽</div>
            <span className="font-bold text-white text-lg">Football<span className="text-green-400">MS</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-green-400 transition-colors">Features</a>
            <a href="#stats" className="hover:text-green-400 transition-colors">Stats</a>
            <a href="#about" className="hover:text-green-400 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2">Sign In</Link>
            <Link href="/register" className="text-sm bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl font-medium transition-colors shadow-lg shadow-green-900/40">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-800/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(22,163,74,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(22,163,74,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-950/80 border border-green-800/60 text-green-400 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            The #1 Football Management Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Manage Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              Football World
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The complete platform to manage leagues, teams, players, and matches.
            Built for football clubs, academies, and tournament organizers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-green-900/40 hover:-translate-y-0.5 text-sm">
              Start for Free <ChevronRight size={18} />
            </Link>
            <Link href="/login" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all border border-gray-700 text-sm">
              Sign In to Dashboard
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16 relative">
            <div className="bg-gray-900 border border-green-900/40 rounded-2xl p-6 shadow-2xl shadow-green-950/50 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                <div className="flex-1 bg-gray-800 rounded-lg px-4 py-1.5 text-xs text-gray-500 ml-2">footballms.app/dashboard</div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['Teams', 'Players', 'Matches', 'Leagues'].map((label, i) => (
                  <div key={label} className="bg-gray-800 rounded-xl p-4 border border-green-900/20">
                    <div className="w-8 h-8 bg-green-700/50 rounded-lg mb-2"></div>
                    <div className="text-xl font-bold text-white">{[12, 148, 36, 4][i]}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 rounded-xl p-4 border border-green-900/20">
                  <div className="text-xs text-gray-400 mb-3">Recent Results</div>
                  {[['Arsenal', '2-1', 'Chelsea'], ['Man City', '3-0', 'Liverpool']].map(([h, s, a]) => (
                    <div key={h} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                      <span className="text-xs text-white">{h}</span>
                      <span className="text-xs text-green-400 font-bold">{s}</span>
                      <span className="text-xs text-white">{a}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-800 rounded-xl p-4 border border-green-900/20">
                  <div className="text-xs text-gray-400 mb-3">Top Scorers</div>
                  {[['H. Kane', 18], ['M. Salah', 15], ['E. Haaland', 22]].map(([name, goals]) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                      <span className="text-xs text-white">{name}</span>
                      <span className="text-xs text-green-400 font-bold">{goals} ⚽</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-green-600/10 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20 px-6 border-y border-green-900/30 bg-gray-900/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">{value}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-400 text-sm font-medium mb-3 uppercase tracking-widest">Features</p>
            <h2 className="text-4xl font-bold text-white">Everything You Need</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">A complete toolkit for managing every aspect of your football organization.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-900 border border-green-900/30 rounded-2xl p-6 hover:border-green-600/50 hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-green-900/50 group-hover:bg-green-700/50 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon size={22} className="text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-gray-900/30 border-y border-green-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <Globe size={40} className="text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Built for the Beautiful Game</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            FootballMS was built to give clubs, academies, and tournament organizers a powerful yet simple platform to run their football operations — from grassroots to professional level.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/20 border border-green-800/40 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8">Join thousands of football managers already using FootballMS.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-xl transition-all shadow-xl shadow-green-900/40 text-sm">
              Create Free Account <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-900/30 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center text-sm">⚽</div>
            <span className="font-bold text-white text-sm">Football<span className="text-green-400">MS</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2025 FootballMS. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/login" className="hover:text-green-400 transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-green-400 transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
