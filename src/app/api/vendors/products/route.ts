// src/app/api/vendor/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authMiddleware } from '@/lib/auth';
import { Role, VendorStatus } from '@prisma/client';

// --- GET: List Vendor's Products ---
export async function GET(request: Request) {
  const authCheck = await authMiddleware(request, [Role.VENDOR]);
  if (authCheck instanceof NextResponse) return authCheck;
  const { userId } = authCheck;

  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId } });

    if (!vendor || vendor.status !== VendorStatus.APPROVED) {
      return NextResponse.json({ error: 'Vendor not found or not approved' }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      where: { vendorId: vendor.id },
      include: { images: true }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Vendor products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// --- POST: Add New Product ---
export async function POST(request: Request) {
  const authCheck = await authMiddleware(request, [Role.VENDOR]);
  if (authCheck instanceof NextResponse) return authCheck;
  const { userId } = authCheck;

  try {
    const { name, description, price, stock, category, imageUrls } = await request.json();

    if (!name || !description || price === undefined || stock === undefined || !category || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const vendor = await prisma.vendor.findUnique({ where: { userId } });

    if (!vendor || vendor.status !== VendorStatus.APPROVED) {
      return NextResponse.json({ error: 'Vendor not approved' }, { status: 403 });
    }

    const newProduct = await prisma.product.create({
      data: {
        vendorId: vendor.id,
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        isApproved: false, // Requires Admin approval
        images: {
          create: imageUrls.map((url: string, index: number) => ({
            url,
            isPrimary: index === 0,
          })),
        },
      },
      include: { images: true }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Vendor product POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// NOTE: PUT and DELETE logic for single product would be in /api/vendor/products/[id]/route.ts