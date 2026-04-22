'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('fms_token');
    if (token) {
      router.replace('/dashboard');
    } else {
      router.replace('/home');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl animate-bounce">⚽</div>
        <p className="text-green-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
