import { NextResponse } from 'next/server';

const firebaseDbUrl = process.env.FIREBASE_DATABASE_URL;

if (!firebaseDbUrl) {
    throw new Error('Missing FIREBASE_DATABASE_URL environment variable');
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, service, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const response = await fetch(`${firebaseDbUrl}/leads.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                service,
                message,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Firebase request failed:', errorText);
            return NextResponse.json({ error: 'Failed to submit contact request' }, { status: 502 });
        }

        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
