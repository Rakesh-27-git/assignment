import { Response } from 'express';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';
import { AuthRequest } from '../middleware/auth.js';

const checkTaskOwnership = (task: any, user: any, action: string = 'access') => {
  const isOwner = task.userId.toString() === user._id.toString();
  const isAssignee = task.assignedTo && task.assignedTo.toString() === user._id.toString();
  const isAdmin = user.role === 'admin';

  if (!isOwner && !isAssignee && !isAdmin) {
    return {
      status: 401,
      message: `User not authorized to ${action} this task`
    };
  }

  // Prevent regular users from updating or deleting tasks created by admin
  if (task.createdByAdmin && !isAdmin && (action === 'update' || action === 'delete')) {
    return {
      status: 403,
      message: `You are not authorized to ${action} a task created by an administrator`
    };
  }

  return null;
};

// Get all tasks
// GET /api/v1/tasks

export const getTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  let query;

  // If user is admin, they can see all tasks, otherwise only their own or assigned to them
  if (req.user.role === 'admin') {
    query = Task.find()
      .populate('userId', 'email')
      .populate('assignedTo', 'email');
  } else {
    query = Task.find({
      $or: [
        { userId: req.user._id },
        { assignedTo: req.user._id }
      ]
    }).populate('assignedTo', 'email');
  }

  const tasks = await query;

  res.status(200).json({
    count: tasks.length,
    data: tasks
  });
});

// Get single task
// GET /api/v1/tasks/:id

export const getTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: `Task not found with id of ${req.params.id}` });
  }

  const authError = checkTaskOwnership(task, req.user);
  if (authError) {
    return res.status(authError.status).json({ message: authError.message });
  }

  res.status(200).json({ data: task });
});

// Create new task
// POST /api/v1/tasks

export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  req.body.userId = req.user._id;
  req.body.createdByAdmin = req.user.role === 'admin';
  const task = await Task.create(req.body);

  res.status(201).json({ data: task });
});

// Update task
// PUT /api/v1/tasks/:id

export const updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: `Task not found with id of ${req.params.id}` });
  }

  const authError = checkTaskOwnership(task, req.user, 'update');
  if (authError) {
    return res.status(authError.status).json({ message: authError.message });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ data: task });
});

// Delete task
// DELETE /api/v1/tasks/:id

export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: `Task not found with id of ${req.params.id}` });
  }

  const authError = checkTaskOwnership(task, req.user, 'delete');
  if (authError) {
    return res.status(authError.status).json({ message: authError.message });
  }

  await task.deleteOne();

  res.status(200).json({ data: {} });
});

// Get task stats (Admin only)
// GET /api/v1/tasks/stats

export const getTaskStats = asyncHandler(async (req: AuthRequest, res: Response) => {
  const stats = await Task.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({ data: stats });
});
