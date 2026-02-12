'use client';

import TaskList from '@/components/dashboard/TaskList';
import AdminStats from '@/components/dashboard/AdminStats';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Hello, {user?.email.split('@')[0]} 👋</h1>
          <p className="text-blue-100 opacity-90 max-w-lg">
            Ready to tackle your goals? Here's an overview of your productivity for today.
          </p>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-32 h-32 bg-indigo-500 rounded-full blur-2xl opacity-40"></div>
      </div>
      {/* Admin Stats */}
      {user?.role === 'admin' && <AdminStats />}

      {/* Task Section */}
      <TaskList />
    </div>
  );
}
