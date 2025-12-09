import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const products = [
            {
                id: 1,
                name: 'Laptop',
                description: 'High-performance laptop',
                price: 999,
                vendorId: 1,
                vendor: { shopName: 'Tech Store' },
            },
            {
                id: 2,
                name: 'Headphones',
                description: 'Wireless headphones',
                price: 199,
                vendorId: 2,
                vendor: { shopName: 'Audio Hub' },
            },
        ];

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newProduct = {
            id: Math.floor(Math.random() * 1000),
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            vendorId: body.vendorId || 1,
        };

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}