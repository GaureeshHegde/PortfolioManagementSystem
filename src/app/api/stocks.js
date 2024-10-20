// pages/api/stocks.js
import yahooFinance from 'yahoo-finance';

export default async function handler(req, res) {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: 'Stock symbol is required' });
    }

    try {
        const result = await yahooFinance.quote({
            symbol,
            modules: ['price', 'summaryDetail'],
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
}
