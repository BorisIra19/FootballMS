'use client';
import { useEffect, useState } from 'react';
import { getPlayers, getTeams, createPlayer, updatePlayer, deletePlayer } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty = { name: '', teamId: '', position: 'Forward', nationality: '', age: '', jerseyNumber: '', status: 'Active' };
const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
const statuses = ['Active', 'Injured', 'Suspended'];

export default function PlayersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');

  const load = () => getPlayers().then(r => setPlayers(r.data));

  useEffect(() => { load(); getTeams().then(r => setTeams(r.data)); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setShowModal(true); };
  const openEdit = (p: any) => { setForm({ ...p, teamId: p.teamId?._id || '' }); setEditing(p._id); setShowModal(true); };

  const submit = async () => {
    try {
      const payload = {
        ...form,
        age: form.age ? Number(form.age) : undefined,
        jerseyNumber: form.jerseyNumber ? Number(form.jerseyNumber) : undefined,
        teamId: form.teamId || undefined,
      };
      if (editing) await updatePlayer(editing, payload);
      else await createPlayer(payload);
      setShowModal(false);
      load();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save player');
    }
  };

  const remove = async (id: string) => { await deletePlayer(id); load(); };

  const statusColor: any = { Active: 'text-green-400', Injured: 'text-red-400', Suspended: 'text-yellow-400' };
  const positionColor: any = { Goalkeeper: 'bg-yellow-900 text-yellow-300', Defender: 'bg-blue-900 text-blue-300', Midfielder: 'bg-green-900 text-green-300', Forward: 'bg-red-900 text-red-300' };

  const filtered = players.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.teamId?.name?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400">Players</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add Player
        </button>
      </div>

      <input placeholder="Search players or teams..." value={filter} onChange={e => setFilter(e.target.value)}
        className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />

      <div className="bg-gray-900 border border-green-900 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>{['#', 'Name', 'Team', 'Position', 'Goals', 'Assists', 'Status', 'Actions'].map(h => (
              <th key={h} className="px-4 py-3 text-left">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(p => (
              <tr key={p._id} className="hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3 text-gray-400">{p.jerseyNumber || '-'}</td>
                <td className="px-4 py-3 font-medium text-white">{p.name}</td>
                <td className="px-4 py-3 text-gray-400">{p.teamId?.name || '-'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${positionColor[p.position]}`}>{p.position}</span></td>
                <td className="px-4 py-3 text-green-400 font-bold">{p.goals}</td>
                <td className="px-4 py-3 text-blue-400">{p.assists}</td>
                <td className={`px-4 py-3 font-medium ${statusColor[p.status]}`}>{p.status}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-green-400 hover:text-green-300"><Pencil size={15} /></button>
                  <button onClick={() => remove(p._id)} className="text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">No players found</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-green-400">{editing ? 'Edit Player' : 'Add Player'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            {['name', 'nationality', 'age', 'jerseyNumber'].map(f => (
              <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            ))}
            <select value={form.teamId} onChange={e => setForm({ ...form, teamId: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              <option value="">Select Team</option>
              {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <select value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              {positions.map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={submit} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-medium transition-colors">
              {editing ? 'Update' : 'Create'} Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
