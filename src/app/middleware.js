import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = req.cookies.get('token'); // Or get it from the headers

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/watchlist', '/holdings', '/order'], // Protect these routes
};
