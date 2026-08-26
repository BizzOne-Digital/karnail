import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AdminUser } from '../models';
import { asyncHandler, sendSuccess, AppError } from '../utils/apiResponse';
import { AuthRequest } from '../middleware/auth';

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const admin = await AdminUser.findOne({ email: email.toLowerCase() });
  if (!admin || !admin.isActive) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  admin.lastLogin = new Date();
  await admin.save();

  const token = jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn } as jwt.SignOptions
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  sendSuccess(res, {
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
});

export const logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
  res.clearCookie('token', { path: '/' });
  sendSuccess(res, { message: 'Logged out successfully' });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const admin = await AdminUser.findById(req.admin?.id).select('-password');
  if (!admin) {
    throw new AppError('Admin not found', 404);
  }
  sendSuccess(res, admin);
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await AdminUser.findById(req.admin?.id);
  if (!admin) {
    throw new AppError('Admin not found', 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    throw new AppError('Current password is incorrect', 400);
  }

  admin.password = await bcrypt.hash(newPassword, 12);
  await admin.save();

  sendSuccess(res, { message: 'Password updated successfully' });
});
