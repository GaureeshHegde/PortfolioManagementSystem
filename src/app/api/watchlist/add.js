// pages/api/watchlist/add.js
import { db } from 'path/to/your/database'; // Adjust this import to your DB connection setup

export default async function handler(req, res) {
    const { userId, stockSymbol, stockName } = req.body;

    if (!userId || !stockSymbol || !stockName) {
        return res.status(400).json({ error: 'User ID, stock symbol, and stock name are required' });
    }

    try {
        await db.query(
            'INSERT INTO watchlists (user_id, stock_symbol, stock_name) VALUES ($1, $2, $3)',
            [userId, stockSymbol, stockName]
        );
        res.status(200).json({ message: 'Stock added to watchlist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add stock' });
    }
}
