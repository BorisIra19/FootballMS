'use client';
import { useEffect, useState } from 'react';
import { getLeagues, createLeague, updateLeague, deleteLeague } from '@/lib/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const empty = { name: '', country: '', season: '', startDate: '', endDate: '', status: 'Active' };
const statuses = ['Active', 'Completed', 'Upcoming'];

export default function LeaguesPage() {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const load = () => getLeagues().then(r => setLeagues(r.data));
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(empty); setEditing(null); setShowModal(true); };
  const openEdit = (l: any) => { setForm({ ...l, startDate: l.startDate?.slice(0, 10), endDate: l.endDate?.slice(0, 10) }); setEditing(l._id); setShowModal(true); };

  const submit = async () => {
    if (editing) await updateLeague(editing, form);
    else await createLeague(form);
    setShowModal(false);
    load();
  };

  const remove = async (id: string) => { await deleteLeague(id); load(); };

  const statusColor: any = { Active: 'bg-green-900 text-green-400', Completed: 'bg-gray-800 text-gray-400', Upcoming: 'bg-blue-900 text-blue-400' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-400">Leagues</h1>
        <button onClick={openAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Add League
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map(l => (
          <div key={l._id} className="bg-gray-900 border border-green-900 rounded-xl p-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-lg">{l.name}</h3>
                <p className="text-gray-400 text-sm">🌍 {l.country}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(l)} className="text-green-400 hover:text-green-300"><Pencil size={16} /></button>
                <button onClick={() => remove(l._id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-400">Season: <span className="text-white">{l.season}</span></p>
            {l.startDate && <p className="text-xs text-gray-500">{new Date(l.startDate).toLocaleDateString()} → {new Date(l.endDate).toLocaleDateString()}</p>}
            <span className={`text-xs px-2 py-1 rounded ${statusColor[l.status]}`}>{l.status}</span>
          </div>
        ))}
        {leagues.length === 0 && <p className="text-gray-500 col-span-3">No leagues yet. Add one!</p>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-green-400">{editing ? 'Edit League' : 'Add League'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            {['name', 'country', 'season'].map(f => (
              <input key={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={form[f]}
                onChange={e => setForm({ ...form, [f]: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            ))}
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
              <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none" />
            </div>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-green-500 outline-none">
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={submit} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-medium transition-colors">
              {editing ? 'Update' : 'Create'} League
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
