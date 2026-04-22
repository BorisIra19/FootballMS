'use client';
import { useEffect, useState } from 'react';
import { getDashboard } from '@/lib/api';
import { Users, UserCircle, Calendar, Trophy } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    getDashboard().then(r => setData(r.data)).catch(() => {});
    const stored = localStorage.getItem('fms_admin');
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const stats = [
    { label: 'Total Teams', value: data?.totalTeams ?? 0, icon: Users, color: 'from-green-600 to-green-700' },
    { label: 'Total Players', value: data?.totalPlayers ?? 0, icon: UserCircle, color: 'from-emerald-600 to-emerald-700' },
    { label: 'Total Matches', value: data?.totalMatches ?? 0, icon: Calendar, color: 'from-teal-600 to-teal-700' },
    { label: 'Total Leagues', value: data?.totalLeagues ?? 0, icon: Trophy, color: 'from-green-700 to-green-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="text-green-400">{admin?.name || 'Admin'}</span> 👋
        </h1>
        <p className="text-gray-400 mt-1">Here's what's happening in your football system today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900 border border-green-900/40 rounded-2xl p-6 hover:border-green-700/60 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-br ${color} p-3 rounded-xl shadow-lg`}>
                <Icon size={22} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <div className="bg-gray-900 border border-green-900/40 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Calendar size={18} className="text-green-400" /> Recent Results
          </h2>
          {data?.recentMatches?.length > 0 ? (
            <div className="space-y-3">
              {data.recentMatches.map((m: any) => (
                <div key={m._id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 hover:bg-gray-750 transition-colors">
                  <span className="text-sm text-white font-medium flex-1 text-right">{m.homeTeam?.name}</span>
                  <span className="text-green-400 font-bold text-lg mx-4 bg-gray-900 px-3 py-1 rounded-lg">{m.homeScore} - {m.awayScore}</span>
                  <span className="text-sm text-white font-medium flex-1">{m.awayTeam?.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🏟️</p>
              <p className="text-gray-500 text-sm">No completed matches yet</p>
            </div>
          )}
        </div>

        {/* Top Scorers */}
        <div className="bg-gray-900 border border-green-900/40 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Trophy size={18} className="text-green-400" /> Top Scorers
          </h2>
          {data?.topScorers?.length > 0 ? (
            <div className="space-y-3">
              {data.topScorers.map((p: any, i: number) => (
                <div key={p._id} className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3">
                  <span className={`font-bold w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                    i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-400 text-black' : i === 2 ? 'bg-amber-700 text-white' : 'bg-gray-700 text-gray-300'
                  }`}>{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.teamId?.name || 'No Team'}</p>
                  </div>
                  <span className="text-green-400 font-bold">{p.goals} ⚽</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">⚽</p>
              <p className="text-gray-500 text-sm">No goals scored yet</p>
            </div>
          )}
        </div>

        {/* Upcoming Matches */}
        <div className="bg-gray-900 border border-green-900/40 rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Calendar size={18} className="text-green-400" /> Upcoming Fixtures
          </h2>
          {data?.upcomingMatches?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.upcomingMatches.map((m: any) => (
                <div key={m._id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                  <span className="text-sm text-white font-medium flex-1 text-right">{m.homeTeam?.name}</span>
                  <div className="mx-4 text-center">
                    <p className="text-xs text-gray-400">{new Date(m.date).toLocaleDateString()}</p>
                    <p className="text-xs text-green-400 font-medium">{new Date(m.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <span className="text-sm text-white font-medium flex-1">{m.awayTeam?.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">📅</p>
              <p className="text-gray-500 text-sm">No upcoming matches scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
