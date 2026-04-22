'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, UserCircle, Calendar, Trophy, BarChart2, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leagues', label: 'Leagues', icon: Trophy },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/players', label: 'Players', icon: UserCircle },
  { href: '/matches', label: 'Matches', icon: Calendar },
  { href: '/standings', label: 'Standings', icon: BarChart2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('fms_admin');
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem('fms_token');
    localStorage.removeItem('fms_admin');
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-green-900/50 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-green-900/50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-green-900/50">⚽</div>
          <div>
            <h1 className="font-bold text-white text-sm">Football MS</h1>
            <p className="text-gray-500 text-xs">Management System</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                active
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/40'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-green-400'
              }`}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="p-4 border-t border-green-900/50 space-y-3">
        {admin && (
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {admin.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{admin.name}</p>
              <p className="text-xs text-gray-500 truncate">{admin.email}</p>
            </div>
          </div>
        )}
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/50 transition-colors">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
