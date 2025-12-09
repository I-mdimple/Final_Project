import { NextResponse } from 'next/server';

// Mock users storage (in real app, use database)
const MOCK_USERS: any[] = [];

export async function POST(request: Request) {
    try {
        const { name, email, password, role } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = MOCK_USERS.find(u => u.email === email);
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Create new user
        const newUser = {
            id: Math.floor(Math.random() * 10000),
            name,
            email,
            password, // In production, hash the password!
            role: role || 'customer',
            createdAt: new Date().toISOString(),
        };

        MOCK_USERS.push(newUser);

        const { password: _, ...userData } = newUser;

        return NextResponse.json(
            {
                user: userData,
                token: 'mock-jwt-token-' + Date.now(),
                message: 'Account created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Signup failed' },
            { status: 500 }
        );
    }
}