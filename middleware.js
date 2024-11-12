import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('Authorization') // "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/watchlist', '/holdings', '/order','/dashboard', '/admin'] // Protect these routes
};
