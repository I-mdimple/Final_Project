import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from '@/lib/auth'; // ⭐ IMPORT generateToken

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user and always include vendor info
    const user = await prisma.user.findUnique({
      where: { email },
      include: { vendor: true }, // Always include vendor
    });

    // ⭐ MODIFICATION: Check for User Existence and Allowed Roles (VENDOR or ADMIN)
    if (!user || (user.role !== Role.VENDOR && user.role !== Role.ADMIN)) {
      return NextResponse.json(
        { error: "Account not found or insufficient role" },
        { status: 403 }
      );
    }

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate the JWT token
    const token = generateToken(user.id.toString(), user.role);

    // Include the role in the response so the frontend knows where to redirect
    return NextResponse.json({
      message: "Login successful",
      token: token, 
      role: user.role, // ⭐ Send role to frontend
      vendorId: user.role === Role.VENDOR ? user.vendor[0]?.id || null : null,
      userId: user.id,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}