import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import { AdminUser, type IAdminUser } from '@/models/AdminUser';
import type { Document } from 'mongoose';

export interface AdminSession {
  id: string;
  email: string;
  role: string;
}

export async function requireAdmin(request?: Request): Promise<AdminSession> {
  const cookieStore = await cookies();
  let token = cookieStore.get('token')?.value;

  if (!token && request) {
    const auth = request.headers.get('authorization');
    if (auth?.startsWith('Bearer ')) {
      token = auth.slice(7);
    }
  }

  if (!token) {
    throw new Error('Authentication required');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };

  await connectDB();
  const admin = await AdminUser.findById(decoded.id).select('-password') as (Document & IAdminUser) | null;
  if (!admin || !admin.isActive) {
    throw new Error('Invalid or inactive account');
  }

  return {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
  };
}
