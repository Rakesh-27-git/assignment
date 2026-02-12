import { Response } from 'express';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { AuthRequest } from '../middleware/auth.js';

// Get all users (Admin only)
// GET /api/v1/users

export const getUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
    const users = await User.find().select('_id email role createdAt');

    res.status(200).json({
        count: users.length,
        data: users
    });
});
