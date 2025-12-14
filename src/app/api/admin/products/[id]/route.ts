// src/app/api/admin/products/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '@/lib/auth';
import { Role } from '@prisma/client';

interface ProductRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: Request, context: ProductRouteContext) {
  // ✅ MUST await params
  const { id } = await context.params;

  // 1. Authentication and Role Check
  const authCheck = await authMiddleware(request, [Role.ADMIN]);
  if (authCheck instanceof NextResponse) return authCheck;

  // 2. Validate product ID
  const productId = Number(id);
  if (Number.isNaN(productId)) {
    return NextResponse.json(
      { error: 'Invalid Product ID format' },
      { status: 400 }
    );
  }

  try {
    // 3. Parse body
    const { approve } = await request.json();

    if (typeof approve !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing or invalid "approve" field in body' },
        { status: 400 }
      );
    }

    // 4. Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { isApproved: approve },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      );
    }

    console.error(`Admin product approval error for ID ${productId}:`, error);
    return NextResponse.json(
      { error: 'Failed to update product status.' },
      { status: 500 }
    );
  }
}
