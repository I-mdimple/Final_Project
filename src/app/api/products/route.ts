import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// --- GET: List All Approved Products for Customers/Public View ---
// This route does NOT require authentication (no authMiddleware)
export async function GET(request: Request) {
  try {
    // 1. Get query parameters for potential searching/filtering (e.g., category, search term)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // 2. Define the base filter: Only show products that have been approved by the Admin.
    const whereClause: any = {
      isApproved: true,
    };

    // 3. Add filtering logic if a category is provided
    if (category) {
      whereClause.category = category;
    }

    // 4. Fetch the products from the database
    const products = await prisma.product.findMany({
      where: whereClause,
      // Include images and the vendor's shop name
      include: { 
        images: true, 
        vendor: {
          select: {
            shopName: true,
          }
        }
      },
      // Optionally add pagination/ordering for a large product list
      // orderBy: {
      //   createdAt: 'desc',
      // },
      // take: 20, // Limit to 20 products per page
    });

    // 5. Return the list of approved products
    return NextResponse.json(products);

  } catch (error) {
    console.error('Public products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch public products' }, { status: 500 });
  }
}

// NOTE: We don't implement POST/PUT/DELETE here, as customers cannot create/edit products