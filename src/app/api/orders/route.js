import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect'; 
import yahooFinance from 'yahoo-finance2';

// Fetch order history for the logged-in user
export async function GET(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;

        // Fetch user ID from the database
        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        
        // Fetch orders for the user
        const result = await pool.query('SELECT symbol, quantity, order_type, created_at FROM orders WHERE user_id = $1', [curr.rows[0].user_id]);

        // Fetch stock data from Yahoo Finance API for each symbol in the orders
        const orderDataPromises = result.rows.map(async (row) => {
            const stockData = await yahooFinance.quote(row.symbol);
            return {
                symbol: row.symbol,
                price: stockData.regularMarketPrice, // Current price of the stock
                quantity: row.quantity,
                orderType: row.order_type, // buy/sell
                createdAt: row.created_at, // Date and time of the order
                ...stockData
            };
        });

        const orderData = await Promise.all(orderDataPromises);

        return NextResponse.json({ data: orderData, status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

// Place a new order for buying or selling stocks
export async function POST(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const { symbol, quantity, order_type } = await req.json(); // Expecting { symbol, quantity, order_type }

        // Fetch stock data from Yahoo Finance API to ensure the stock exists
        const stockData = await yahooFinance.quote(symbol);
        if (!stockData) {
            return new Response(JSON.stringify({ error: 'Invalid stock symbol' }), { status: 400 });
        }

        // Fetch user ID from the database
        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        
        // Insert order into the database
        const result = await pool.query(
            'INSERT INTO orders (user_id, symbol, quantity, order_type, created_at) VALUES ($1, $2, $3, $4, $5)',
            [curr.rows[0].user_id, symbol, quantity, order_type, new Date()]
        );

        return new Response(JSON.stringify({
            symbol: symbol.toUpperCase(),
            price: stockData.regularMarketPrice, // Return the stock price
            quantity: quantity,
            orderType: order_type,
            createdAt: new Date(), // Current date and time
        }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
