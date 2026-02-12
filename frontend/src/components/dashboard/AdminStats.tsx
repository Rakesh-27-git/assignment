'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Stat {
  _id: string;
  count: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks/stats');
        setStats(res.data.data);
      } catch (err) {
        console.error('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return null;
  if (stats.length === 0) return null;

  const total = stats.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
        <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{total}</p>
      </div>
      {stats.map((stat) => (
        <div key={stat._id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 capitalize">{stat._id} Tasks</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.count}</p>
        </div>
      ))}
    </div>
  );
}
