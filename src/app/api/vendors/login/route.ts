import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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

    // find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { vendors: true },
    });

    if (!user || user.role !== "vendor") {
      return NextResponse.json(
        { error: "Vendor account not found" },
        { status: 400 }
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

    // everything correct
    return NextResponse.json({
      message: "Login successful",
      vendorId: user.vendors[0]?.id || null,
      userId: user.id,
    });
  } catch (error) {
    console.error("Vendor Login Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
