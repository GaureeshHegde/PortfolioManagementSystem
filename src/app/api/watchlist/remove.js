// pages/api/watchlist/remove.js
import { db } from 'path/to/your/database'; // Adjust this import to your DB connection setup

export default async function handler(req, res) {
    const { userId, stockSymbol } = req.body;

    if (!userId || !stockSymbol) {
        return res.status(400).json({ error: 'User ID and stock symbol are required' });
    }

    try {
        await db.query(
            'DELETE FROM watchlists WHERE user_id = $1 AND stock_symbol = $2',
            [userId, stockSymbol]
        );
        res.status(200).json({ message: 'Stock removed from watchlist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove stock' });
    }
}
