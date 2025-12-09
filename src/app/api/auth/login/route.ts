import { NextResponse } from 'next/server';

// Mock users
const MOCK_USERS = [
    {
        id: 1,
        email: 'customer@example.com',
        password: 'password123',
        role: 'customer',
        name: 'John Customer',
    },
    {
        id: 2,
        email: 'vendor@example.com',
        password: 'password123',
        role: 'vendor',
        name: 'Jane Vendor',
    },
    {
        id: 3,
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        name: 'Admin User',
    },
];

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password required' },
                { status: 400 }
            );
        }

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const { password: _, ...userData } = user;

        return NextResponse.json(
            {
                user: userData,
                token: 'mock-jwt-token-' + Date.now(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}