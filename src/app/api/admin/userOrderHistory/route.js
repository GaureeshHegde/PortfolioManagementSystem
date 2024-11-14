// Import necessary modules
import pool from '../../../utils/dbconnect';

export async function GET(req) {
    try {
        // Extract the user ID from the query parameters
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('user_id');

        if (!userId) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        // Query to get the order history for the given user ID
        const orderHistoryQuery = `
            SELECT user_id, symbol,quantity, type, date_of_order
            FROM order_history
            WHERE user_id = $1;
        `;

        // Execute the query
        const { rows } = await pool.query(orderHistoryQuery, [userId]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'No order history found for this user' }), { status: 404 });
        }

        // Return the order history
        return new Response(JSON.stringify({ orders: rows }), { status: 200 });
    } catch (error) {
        console.error('Error fetching user order history:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user order history' }), { status: 500 });
    }
}
