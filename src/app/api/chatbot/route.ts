// Final_Project\src\app\api\chatbot\route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        let response = 'I\'m here to help! How can I assist you?';
        const lowerMessage = message.toLowerCase();

        // AI responses based on keywords (Your existing mock logic)
        if (lowerMessage.includes('product') || lowerMessage.includes('buy')) {
            response = 'We have a great selection of products! Visit our shop to browse through our latest offerings like laptops, headphones, keyboards, and more.';
        } else if (lowerMessage.includes('order') || lowerMessage.includes('tracking')) {
            response = 'You can track your orders in your account dashboard. Please provide your order number for more details.';
        } else if (lowerMessage.includes('vendor') || lowerMessage.includes('sell')) {
            response = 'Interested in becoming a vendor? Visit our vendor dashboard to get started and start selling your products!';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = 'Prices vary by product. Please check individual product listings for pricing details. Our products range from $49 to $999.';
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = 'Hello! 👋 Welcome to ShopHub. How can I help you today?';
        } else if (lowerMessage.includes('help')) {
            response = 'I can help you with: shopping, orders, vendor information, pricing, and more. What would you like to know?';
        } else if (lowerMessage.includes('admin') || lowerMessage.includes('manage')) {
            response = 'Admin dashboard is available for platform administrators to manage vendors and products.';
        } else if (lowerMessage.includes('thank')) {
            response = 'You\'re welcome! Is there anything else I can help you with?';
        } else if (lowerMessage.includes('payment') || lowerMessage.includes('checkout')) {
            response = 'We support various payment methods including credit cards, debit cards, and digital wallets. Checkout is quick and secure.';
        }

        return NextResponse.json(
            {
                response, // Key is 'response'
                timestamp: new Date().toISOString(),
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Chatbot error:', error);
        return NextResponse.json(
            {
                error: 'Failed to process message',
                response: 'Sorry, there was an error processing your message. Please try again.', // Still provide a 'response' field for safety
                success: false
            },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json(
        {
            status: 'Chatbot API is running',
            message: 'Send POST requests with { message: "your message" }'
        },
        { status: 200 }
    );
}