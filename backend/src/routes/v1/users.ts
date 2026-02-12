import express from 'express';
import { getUsers } from '../../controllers/userController.js';
import { protect } from '../../middleware/auth.js';
import { authorize } from '../../middleware/roleCheck.js';

const router = express.Router();

// Apply protection to all routes
router.use(protect);

// Admin only - get all users for task assignment
router.get('/', authorize('admin'), getUsers);

export default router;
