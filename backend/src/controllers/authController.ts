import { Request, Response } from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import asyncHandler from '../utils/asyncHandler.js';

// Register user
// POST /api/v1/auth/register

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user
  const user = await User.create({
    email,
    password,
    role: role || 'user'
  });

  if (user) {
    const token = generateToken((user._id as any).toString(), user.role);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Required for sameSite: 'none'
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// Login user
// POST /api/v1/auth/login

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide an email and password' });
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken((user._id as any).toString(), user.role);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: true, // Required for sameSite: 'none'
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.json({
    _id: user._id,
    email: user.email,
    role: user.role,
    token
  });
});

// Logout user / clear cookie
// POST /api/v1/auth/logout

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// Get current user profile
// GET /api/v1/auth/profile

export const getProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
