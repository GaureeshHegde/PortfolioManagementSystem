import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect'; // Database connection
import { NextResponse } from 'next/server';

// GET Method: Fetch user's holdings
import yahooFinance from 'yahoo-finance'; // Ensure you import Yahoo Finance API
import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect'; // Database connection

export async function GET(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;

        // Get user ID
        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        if (curr.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Fetch holdings
        const result = await pool.query('SELECT symbol FROM holdings WHERE user_id = $1', [curr.rows[0].user_id]);

        // Fetch stock data for each symbol in the holdings
        const stockDataPromises = result.rows.map(async (row) => {
            const stockData = await yahooFinance.quote(row.symbol); // Fetch stock data
            return {
                symbol: row.symbol,
                price: stockData.regularMarketPrice, // Get real-time stock price
                change: stockData.regularMarketChange, // Get price change
                ...stockData
            };
        });

        const stockData = await Promise.all(stockDataPromises);

        return NextResponse.json({ data: stockData, status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch holdings data' }), { status: 500 });
    }
}


// POST Method: Add stock to holdings
export async function POST(req) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;
        const { symbol, quantity } = await req.json(); // Assuming quantity is provided

        const curr = await pool.query('SELECT user_id from users where username = $1', [username]);
        if (curr.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Insert stock into holdings table
        const result = await pool.query(
            'INSERT INTO holdings (user_id, symbol, quantity) VALUES ($1, $2, $3)',
            [curr.rows[0].user_id, symbol, quantity]
        );

        return new Response(JSON.stringify({ message: 'Stock added to holdings' }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error adding stock to holdings' }), { status: 500 });
    }
}

// DELETE Method: Remove stock from holdings
// export async function DELETE(req) {
//     const authHeader = req.headers.get('authorization');
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
//     }

//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         const username = decodedToken.username;
//         const { symbol } = await req.json(); // Assuming symbol is provided

//         const curr = await pool.query('SELECT user_id from users where username = $1', [username]);
//         if (curr.rowCount === 0) {
//             return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
//         }

//         const result = await pool.query(
//             'DELETE FROM holdings WHERE user_id = $1 AND symbol = $2',
//             [curr.rows[0].user_id, symbol]
//         );

//         if (result.rowCount === 0) {
//             return new Response(JSON.stringify({ error: 'Stock not found in holdings' }), { status: 404 });
//         }

//         return new Response(JSON.stringify({ message: 'Stock removed from holdings' }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: 'Error removing stock from holdings' }), { status: 500 });
//     }
// }
