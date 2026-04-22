'use client';
import { useEffect, useState } from 'react';
import { getTeams, getLeagues, createTeam, updateTeam, deleteTeam } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty = { name: '', city: '', coach: '', stadium: '', founded: '', leagueId: '' };

export default function TeamsPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const load = () => getTeams().then(r => setTeams(r.data));

  useEffect(() => {
    load();
    getLeagues().then(r => setLeagues(r.data));
  }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setShowModal(true); };
  const openEdit = (t: any) => { setForm({ ...t, leagueId: t.leagueId?._id || '' }); setEditing(t._id); setShowModal(true); };

  const submit = async () => {
    if (editing) await updateTeam(editing, form);
    else await createTeam(form);
    setShowModal(false);
    load();
  };

  const remove = async (id: string) => { await deleteTeam(id); load(); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400">Teams</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map(t => (
          <div key={t._id} className="bg-gray-900 border border-green-900 rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-lg">{t.name}</h3>
                <p className="text-gray-400 text-sm">{t.city}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(t)} className="text-green-400 hover:text-green-300"><Pencil size={16} /></button>
                <button onClick={() => remove(t._id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-800 rounded-lg p-2"><p className="text-green-400 font-bold">{t.wins}</p><p className="text-xs text-gray-400">W</p></div>
              <div className="bg-gray-800 rounded-lg p-2"><p className="text-yellow-400 font-bold">{t.draws}</p><p className="text-xs text-gray-400">D</p></div>
              <div className="bg-gray-800 rounded-lg p-2"><p className="text-red-400 font-bold">{t.losses}</p><p className="text-xs text-gray-400">L</p></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Coach: <span className="text-white">{t.coach || '-'}</span></span>
              <span className="text-green-400 font-bold">{t.points} pts</span>
            </div>
            {t.leagueId && <p className="text-xs text-green-600 bg-green-950 px-2 py-1 rounded">{t.leagueId.name}</p>}
          </div>
        ))}
        {teams.length === 0 && <p className="text-gray-500 col-span-3">No teams yet. Add one!</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-green-400">{editing ? 'Edit Team' : 'Add Team'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            {['name', 'city', 'coach', 'stadium', 'founded'].map(f => (
              <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            ))}
            <select value={form.leagueId} onChange={e => setForm({ ...form, leagueId: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              <option value="">Select League</option>
              {leagues.map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
            </select>
            <button onClick={submit} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-medium transition-colors">
              {editing ? 'Update' : 'Create'} Team
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
