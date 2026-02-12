import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../../controllers/taskController.js';
import { protect } from '../../middleware/auth.js';
import { authorize } from '../../middleware/roleCheck.js';
import { validateTask } from '../../middleware/validation.js';

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get('/', getTasks);
router.get('/stats', authorize('admin'), getTaskStats);
router.get('/:id', getTask);
router.post('/', validateTask, createTask);
router.put('/:id', validateTask, updateTask);
router.delete('/:id', deleteTask);

export default router;
