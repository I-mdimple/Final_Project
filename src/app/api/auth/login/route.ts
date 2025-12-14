// Final_Project\src\app\api\auth\login\route.ts
import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from '@/lib/auth'; 

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

        // 1. Find the user in the database
        // NOTE: We only include the vendor relation if the user role is VENDOR to optimize the query.
        const user = await prisma.user.findUnique({
            where: { email },
            include: { vendor: true }, 
        });

        // ⭐ FIX 1: Check if user exists immediately after the query.
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials: User not found" },
                { status: 401 }
            );
        }

        // 2. Safely check roles. (Removed the faulty check from the previous version)
        if (user.role !== Role.VENDOR && user.role !== Role.ADMIN) {
            return NextResponse.json(
                { error: "Insufficient role access" },
                { status: 403 }
            );
        }

        // 3. Compare password using bcrypt
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }

        // 4. Generate the REAL JWT token
        const token = generateToken(user.id.toString(), user.role);
        
        // 5. Safely determine vendorId for the response
        const vendorId = user.role === Role.VENDOR && user.vendor
            ? user.vendor.id
            : null;

        // 6. Return the token and role
        return NextResponse.json({
            message: "Login successful",
            token: token, 
            role: user.role, // For frontend redirection
            vendorId: vendorId, // Safely determined vendor ID
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