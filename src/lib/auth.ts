// src/lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { prisma } from './prisma';
import { Role } from '@prisma/client';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
const TOKEN_EXPIRY = '7d';

// --- JWT Generation ---
export const generateToken = (userId: string, role: Role) => {
  return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
};

// --- Middleware for Authentication and Role Check ---
export const authMiddleware = async (request: Request, allowedRoles: Role[] = []) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return new NextResponse(JSON.stringify({ error: 'Authentication required' }), { status: 401 });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY) as { userId: string, role: Role };

    // Role-based access control
    if (allowedRoles.length > 0 && !allowedRoles.includes(payload.role)) {
      return new NextResponse(JSON.stringify({ error: 'Access denied: Insufficient privileges' }), { status: 403 });
    }

    // Attach user data to request (simulated for Next.js API Route handler)
    // Parse the string ID back to a number
    const user = await prisma.user.findUnique({ 
      where: { id: parseInt(payload.userId) } 
    });
    if (!user) {
        return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return the payload for use in the handler
    return payload;

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401 });
  }
};