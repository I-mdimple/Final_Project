import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, shopName } = body;

    if (!name || !email || !password || !shopName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FIX: use Prisma enum, NOT string
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.VENDOR,
      },
    });

    const newVendor = await prisma.vendor.create({
      data: {
        shopName,
        ownerId: newUser.id,
      },
    });

    return NextResponse.json(
      {
        message: "Vendor registered successfully",
        vendor: newVendor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Vendor Register Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


