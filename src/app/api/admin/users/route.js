// File path: /app/api/admin/users/route.js
import { NextResponse } from 'next/server';
import pool from '../../../utils/dbconnect';

export async function GET() {
    try {
        console.log("Fetching users...");
        // Query to fetch user details
        const result = await pool.query(`
            SELECT  user_id,username, email, created_at AS "createdAt" 
            FROM users 
        `);

        const users = result.rows; // Extract rows from result
        console.log("Total users:", users.length);

        // Respond with user data in JSON format
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
