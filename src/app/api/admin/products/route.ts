import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET all pending products (for admin)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isApproved: false },
      include: {
        vendor: {
          select: {
            shopName: true,
          },
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
