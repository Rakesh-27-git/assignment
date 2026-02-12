'use client';

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/api';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  userId: string | any;
  assignedTo?: string | any;
  createdAt: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData: Partial<Task>) => {
    try {
      const res = await api.post('/tasks', taskData);
      setTasks((prev) => [res.data.data, ...prev]);
      return res.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create task';
      setError(msg);
      throw new Error(msg);
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      const res = await api.put(`/tasks/${id}`, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
      return res.data.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update task';
      setError(msg);
      throw new Error(msg);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to delete task';
      setError(msg);
      throw new Error(msg);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
};
