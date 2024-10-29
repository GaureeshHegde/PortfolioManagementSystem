import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect'; // Assuming dbconnect file for DB connection
import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2'; // Add Yahoo Finance API

// Fetch user's watchlist and include stock data from Yahoo Finance API
export async function GET(req) {
    // Get the Authorization header from the request headers
    const authHeader = req.headers.get('authorization');

    // Split the Authorization header into two parts: the type and the token
    // The type is usually "Bearer" and the token is the JSON Web Token
    // If there is no Authorization header, authHeader will be null
    // The && operator is a short-circuit operator that returns the first
    // expression if it is truthy, otherwise it returns the second expression
    // In this case, if authHeader is null, the && operator will return null
    // Otherwise, it will return the second part of the split string, which is the token
    const token = authHeader && authHeader.split(' ')[1];


    if (!token) {
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const username = decodedToken.username;

        // Original logic to return watchlist data if no specific symbol is provided
        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        const result = await pool.query('SELECT symbol FROM watchlist WHERE user_id = $1', [curr.rows[0].user_id]);

        // Fetch stock data from Yahoo Finance API for each symbol in the watchlist
        const stockDataPromises = result.rows.map(async (row) => {
            const stockData = await yahooFinance.quote(row.symbol);
            return {
                symbol: stockData.symbol,
                name: stockData.longName || stockData.shortName || row.symbol, // Added stock name
                price: stockData.regularMarketPrice,
                change: stockData.regularMarketChangePercent,
                highestPrice: stockData.fiftyTwoWeekHigh, // Highest price over the last year
                lowestPrice: stockData.fiftyTwoWeekLow,   // Lowest price over the last year
                faceValue: stockData.priceToBook,         // Placeholder for face value (replace if needed)
                peRatio: stockData.trailingPE,            // PE ratio
            };
        });

        const stockData = await Promise.all(stockDataPromises);
        return NextResponse.json({ data: stockData, status: 200 });

    } catch (error) {
        console.error('Error fetching stock data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}

// Add stock to user's watchlist and fetch data from Yahoo Finance
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

        // Fetch stock data from Yahoo Finance API to ensure the stock exists
        const stockData = await yahooFinance.quote(symbol);
        if (!stockData) {
            return new Response(JSON.stringify({ error: 'Invalid stock symbol' }), { status: 400 });
        }

        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        await pool.query(
            'INSERT INTO watchlist (user_id, symbol) VALUES ($1, $2)',
            [curr.rows[0].user_id, symbol]
        );

        return new Response(JSON.stringify({
            symbol: stockData.symbol,
            name: stockData.longName || stockData.shortName || symbol, // Stock name
            price: stockData.regularMarketPrice,
            change: stockData.regularMarketChangePercent,
            // highestPrice: stockData.fiftyTwoWeekHigh, // Highest price over the last year
            // lowestPrice: stockData.fiftyTwoWeekLow,   // Lowest price over the last year
            // faceValue: stockData.priceToBook,         // Placeholder for face value (replace if needed)
            // peRatio: stockData.trailingPE,            // PE ratio
        }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
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
        const username = decodedToken.username;

        // Extract the symbol from query parameters
        const { searchParams } = new URL(req.url);
        const symbol = searchParams.get('symbol');

        if (!symbol) {
            return new Response(JSON.stringify({ error: 'Stock symbol is required' }), { status: 400 });
        }

        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        if (curr.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const result = await pool.query(
            'DELETE FROM watchlist WHERE user_id = $1 AND symbol = $2',
            [curr.rows[0].user_id, symbol]
        );

        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ error: 'Stock not found in watchlist' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Stock removed' }), { status: 200 });
    } catch (error) {
        console.error('Error removing stock:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}
