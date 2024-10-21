import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    // Get the token from the Authorization header
    const token = req.headers.get('Authorization')?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/watchlist', '/holdings', '/order','dashboard'] // Protect these routes
};
