// Fetch user's watchlist and include stock data from the stocks table
import jwt from 'jsonwebtoken';
import pool from '../../utils/dbconnect';
import { NextResponse } from 'next/server';

// Fetch user's watchlist and include stock data from the stocks table
export async function GET(req) {
    const authHeader = req.headers.get('authorization');
    console.log('Authorization header:', authHeader);
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token extracted:', token);

    if (!token) {
        console.log('Token is missing');
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);
        
        const username = decodedToken.username;
        console.log('Username from token:', username);

        const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        console.log('Query result for user_id:', curr.rows);

        const userId = curr.rows[0].user_id;
        console.log('User ID:', userId);

        const result = await pool.query('SELECT symbol FROM watchlist WHERE user_id = $1', [userId]);
        console.log('Watchlist symbols:', result.rows);

        const stockDataPromises = result.rows.map(async (row) => {
            console.log('Processing symbol:', row.symbol);
            const stockResult = await pool.query('SELECT * FROM stocks WHERE stock_symbol = $1', [row.symbol]);
            if (stockResult.rows.length > 0) {
                console.log(`Stock data found for ${row.symbol}:`, stockResult.rows[0]);
                return stockResult.rows[0];
            } else {
                console.log(`No data found in stocks table for symbol: ${row.symbol}`);
                return null;
            }
        });

        const stockData = (await Promise.all(stockDataPromises)).filter(Boolean);
        console.log('Final stock data to return:', stockData);

        return NextResponse.json({ data: stockData, status: 200 });

    } catch (error) {
        console.error('Error details:', error);
        return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
    }
}

// Add stock to user's watchlist and fetch data from Yahoo Finance
import yahooFinance from 'yahoo-finance2';

export async function POST(req) {
    const authHeader = req.headers.get('authorization');
    console.log('Authorization header:', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token extracted:', token);

    if (!token) {
        console.log('Token is missing');
        return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodedToken);

        const username = decodedToken.username;
        console.log('Username from token:', username);

        const { symbol } = await req.json();
        console.log('Requested stock symbol:', symbol);

        const stockData = await yahooFinance.quote(symbol);
        console.log('Yahoo Finance data:', stockData);

        if (!stockData) {
            console.log('Invalid stock symbol');
            return new Response(JSON.stringify({ error: 'Invalid stock symbol' }), { status: 400 });
        }

        const curr = await client.query('SELECT user_id FROM users WHERE username = $1', [username]);
        console.log('Query result for user_id:', curr.rows);

        const userId = curr.rows[0].user_id;
        console.log('User ID:', userId);

        await client.query('INSERT INTO watchlist (user_id, symbol) VALUES ($1, $2)', [userId, symbol]);
        console.log('Inserted into watchlist:', { userId, symbol });

        const upsertStockQuery = `
            INSERT INTO stocks (stock_symbol, stock_name, price, change, highest_price, lowest_price, face_value, pe_ratio)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (stock_symbol) 
            DO UPDATE SET 
                stock_name = EXCLUDED.stock_name,
                price = EXCLUDED.price,
                change = EXCLUDED.change,
                highest_price = EXCLUDED.highest_price,
                lowest_price = EXCLUDED.lowest_price,
                face_value = EXCLUDED.face_value,
                pe_ratio = EXCLUDED.pe_ratio;
        `;

        await client.query(upsertStockQuery, [
            stockData.symbol,
            stockData.longName || stockData.shortName || symbol,
            stockData.regularMarketPrice,
            stockData.regularMarketChangePercent,
            stockData.fiftyTwoWeekHigh,
            stockData.fiftyTwoWeekLow,
            stockData.priceToBook,
            stockData.trailingPE,
        ]);

        console.log('Stock data inserted successfully');

        await client.query('COMMIT');
        return new Response(JSON.stringify({
            symbol: stockData.symbol,
            name: stockData.longName || stockData.shortName || symbol,
            price: stockData.regularMarketPrice,
            change: stockData.regularMarketChangePercent,
        }), { status: 201 });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error details:', error);
        return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
    } finally {
        client.release();
    }
}

// Remove stock from user's watchlist
export async function DELETE(req) {
  const authHeader = req.headers.get('authorization');
  console.log('Authorization header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token extracted:', token);

  if (!token) {
      console.log('Token is missing');
      return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
  }

  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decodedToken);

      const username = decodedToken.username;
      console.log('Username from token:', username);

      const { searchParams } = new URL(req.url);
      const symbol = searchParams.get('symbol');
      console.log('Stock symbol to remove:', symbol);

      if (!symbol) {
          console.log('Stock symbol missing');
          return new Response(JSON.stringify({ error: 'Stock symbol is required' }), { status: 400 });
      }

      const curr = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
      console.log('Query result for user_id:', curr.rows);

      if (curr.rowCount === 0) {
          console.log('User not found');
          return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }

      const result = await pool.query(
          'DELETE FROM watchlist WHERE user_id = $1 AND symbol = $2',
          [curr.rows[0].user_id, symbol]
      );
      console.log('Delete result:', result.rowCount);

      if (result.rowCount === 0) {
          console.log('Stock not found in watchlist');
          return new Response(JSON.stringify({ error: 'Stock not found in watchlist' }), { status: 404 });
      }

      return new Response(JSON.stringify({ message: 'Stock removed' }), { status: 200 });
  } catch (error) {
      console.error('Error details:', error);
      return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { status: 500 });
  }
}
