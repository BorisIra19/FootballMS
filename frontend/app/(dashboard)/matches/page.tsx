'use client';
import { useEffect, useState } from 'react';
import { getMatches, getTeams, getLeagues, createMatch, updateMatch, deleteMatch } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty = { homeTeam: '', awayTeam: '', leagueId: '', date: '', venue: '', homeScore: 0, awayScore: 0, status: 'Scheduled', round: '' };
const statuses = ['Scheduled', 'Live', 'Completed', 'Postponed'];

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const load = () => getMatches().then(r => setMatches(r.data));

  useEffect(() => { load(); getTeams().then(r => setTeams(r.data)); getLeagues().then(r => setLeagues(r.data)); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setShowModal(true); };
  const openEdit = (m: any) => {
    setForm({ ...m, homeTeam: m.homeTeam?._id, awayTeam: m.awayTeam?._id, leagueId: m.leagueId?._id || '', date: m.date?.slice(0, 16) });
    setEditing(m._id); setShowModal(true);
  };

  const submit = async () => {
    if (editing) await updateMatch(editing, form);
    else await createMatch(form);
    setShowModal(false);
    load();
  };

  const remove = async (id: string) => { await deleteMatch(id); load(); };

  const statusColor: any = { Scheduled: 'text-blue-400', Live: 'text-green-400', Completed: 'text-gray-400', Postponed: 'text-red-400' };
  const statusBg: any = { Scheduled: 'bg-blue-950', Live: 'bg-green-950 animate-pulse', Completed: 'bg-gray-800', Postponed: 'bg-red-950' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400">Matches</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Match
        </button>
      </div>

      <div className="space-y-4">
        {matches.map(m => (
          <div key={m._id} className="bg-gray-900 border border-green-900 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 flex-1">
                <div className="text-right flex-1">
                  <p className="font-bold text-white text-lg">{m.homeTeam?.name}</p>
                  <p className="text-xs text-gray-400">{m.homeTeam?.city}</p>
                </div>
                <div className="text-center px-4">
                  {m.status === 'Completed' || m.status === 'Live' ? (
                    <p className="text-2xl font-bold text-green-400">{m.homeScore} - {m.awayScore}</p>
                  ) : (
                    <p className="text-lg font-bold text-gray-500">vs</p>
                  )}
                  <span className={`text-xs px-2 py-1 rounded ${statusBg[m.status]} ${statusColor[m.status]}`}>{m.status}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg">{m.awayTeam?.name}</p>
                  <p className="text-xs text-gray-400">{m.awayTeam?.city}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => openEdit(m)} className="text-green-400 hover:text-green-300"><Pencil size={16} /></button>
                <button onClick={() => remove(m._id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-xs text-gray-500">
              <span>📅 {new Date(m.date).toLocaleString()}</span>
              {m.venue && <span>📍 {m.venue}</span>}
              {m.round && <span>🏆 {m.round}</span>}
            </div>
          </div>
        ))}
        {matches.length === 0 && <p className="text-gray-500">No matches yet. Add one!</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-800 rounded-xl p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-green-400">{editing ? 'Edit Match' : 'Add Match'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <select value={form.homeTeam} onChange={e => setForm({ ...form, homeTeam: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              <option value="">Home Team</option>
              {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <select value={form.awayTeam} onChange={e => setForm({ ...form, awayTeam: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              <option value="">Away Team</option>
              {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <select value={form.leagueId} onChange={e => setForm({ ...form, leagueId: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              <option value="">Select League</option>
              {leagues.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
            <input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            {['venue', 'round'].map(f => (
              <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]}
                onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            ))}
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Home Score" value={form.homeScore} onChange={e => setForm({ ...form, homeScore: +e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
              <input type="number" placeholder="Away Score" value={form.awayScore} onChange={e => setForm({ ...form, awayScore: +e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            </div>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={submit} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-medium transition-colors">
              {editing ? 'Update' : 'Create'} Match
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
