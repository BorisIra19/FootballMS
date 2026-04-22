'use client';
import { useEffect, useState } from 'react';
import { getTeams, getLeagues } from '@/lib/api';

export default function StandingsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState('');

  useEffect(() => {
    getTeams().then(r => setTeams(r.data));
    getLeagues().then(r => setLeagues(r.data));
  }, []);

  const filtered = teams
    .filter(t => !selectedLeague || t.leagueId?._id === selectedLeague)
    .sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400">Standings</h1>
        <select value={selectedLeague} onChange={e => setSelectedLeague(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
          <option value="">All Leagues</option>
          {leagues.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
        </select>
      </div>

      <div className="bg-gray-900 border border-green-900 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              {['Pos', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map(h => (
                <th key={h} className="px-4 py-3 text-center first:text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((t, i) => {
              const gd = t.goalsFor - t.goalsAgainst;
              const played = t.wins + t.draws + t.losses;
              const rowBg = i === 0 ? 'bg-green-950/40' : i < 4 ? 'bg-green-950/20' : '';
              return (
                <tr key={t._id} className={`hover:bg-gray-800 transition-colors ${rowBg}`}>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${i === 0 ? 'text-yellow-400' : i < 4 ? 'text-green-400' : 'text-gray-400'}`}>{i + 1}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-white">{t.name}</td>
                  <td className="px-4 py-3 text-center text-gray-400">{played}</td>
                  <td className="px-4 py-3 text-center text-green-400">{t.wins}</td>
                  <td className="px-4 py-3 text-center text-yellow-400">{t.draws}</td>
                  <td className="px-4 py-3 text-center text-red-400">{t.losses}</td>
                  <td className="px-4 py-3 text-center text-gray-300">{t.goalsFor}</td>
                  <td className="px-4 py-3 text-center text-gray-300">{t.goalsAgainst}</td>
                  <td className={`px-4 py-3 text-center font-medium ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-400'}`}>{gd > 0 ? `+${gd}` : gd}</td>
                  <td className="px-4 py-3 text-center font-bold text-white">{t.points}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && <tr><td colSpan={10} className="px-4 py-6 text-center text-gray-500">No teams found</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-950 border border-green-700 rounded"></span> Champions League</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 bg-green-950/50 border border-green-900 rounded"></span> Europa League</span>
      </div>
    </div>
  );
}
