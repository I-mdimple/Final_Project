import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const vendors = [
            {
                id: 1,
                shopName: 'Tech Store',
                ownerId: 1,
                owner: { name: 'John Doe', email: 'john@techstore.com' },
            },
            {
                id: 2,
                shopName: 'Audio Hub',
                ownerId: 2,
                owner: { name: 'Jane Smith', email: 'jane@audiohub.com' },
            },
            {
                id: 3,
                shopName: 'Gadget World',
                ownerId: 3,
                owner: { name: 'Mike Johnson', email: 'mike@gadgetworld.com' },
            },
        ];

        return NextResponse.json(vendors, { status: 200 });
    } catch (error) {
        console.error('Error fetching vendors:', error);
        return NextResponse.json(
            { error: 'Failed to fetch vendors' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newVendor = {
            id: Math.floor(Math.random() * 1000),
            shopName: body.shopName,
            ownerId: body.ownerId,
            owner: { name: body.ownerName, email: body.ownerEmail },
        };

        return NextResponse.json(newVendor, { status: 201 });
    } catch (error) {
        console.error('Error creating vendor:', error);
        return NextResponse.json(
            { error: 'Failed to create vendor' },
            { status: 500 }
        );
    }
}