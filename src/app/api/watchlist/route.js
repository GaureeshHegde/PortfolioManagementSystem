// This is for api calls for adding and removing stocks so it should have a GET and POST

import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect'; // Assuming dbconnect file for DB connection
import { NextResponse } from 'next/server';

export async function GET(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    console.log("before tyr")
    console.log(token)
    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        console.log("token")
        console.log(process.env.JWT_SECRET)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decodedToken")
        // const decodedToken = {}
        const username = decodedToken.username; // Extract the userId from the token
        console.log(username)
        const curr = await pool.query('SELECT user_id from users where username = $1', [username])
        console.log(curr)
        const result = await pool.query('SELECT * FROM watchlist WHERE user_id = $1', [curr.rows[0].user_id]);
        console.log(result)
        
        return  NextResponse.json({data: result.rows, status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error}), { status: 500 });
    }
}

export async function POST(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const { symbol } = await req.json();
        console.log(symbol)
        const curr = await pool.query('SELECT user_id from users where username = $1', [username])
        const result = await pool.query(
            'INSERT INTO watchlist (user_id, symbol) VALUES ($1, $2)',
            [curr.rows[0].user_id, symbol]
        );

        return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}

export async function DELETE(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const { symbol } = await req.json();

        const curr = await pool.query('SELECT user_id from users where username = $1', [username])
        const result = await pool.query(
            'DELETE FROM watchlist WHERE user_id = $1 AND symbol = $2',
            [curr.rows[0].userId, symbol]
        );

        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Stock not found in watchlist' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Stock removed' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error removing stock' }), { status: 500 });
    }
}
