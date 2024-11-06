import yahooFinance from 'yahoo-finance2';

export async function GET() {
    try {
        console.log('Fetching market overview...');
        
        const indices = ['^GSPC', '^IXIC', '^DJI']; // S&P 500, NASDAQ, Dow Jones

        // Try fetching data for one symbol first
        const testData = await yahooFinance.quote({ symbol: '^GSPC', modules: ['price'] });
        console.log('Test data for ^GSPC:', testData);

        const marketData = await Promise.all(
            indices.map((symbol) => yahooFinance.quote({ symbol, modules: ['price'] }))
        );

        const marketOverview = marketData.map((data, index) => {
            const price = data.price.regularMarketPrice;
            const changePercent = data.price.regularMarketChangePercent;
            return {
                symbol: indices[index],
                price: price.toFixed(2),
                change: changePercent.toFixed(2),
            };
        });

        console.log('Market overview:', marketOverview);
        
        return new Response(JSON.stringify({ marketOverview }), { status: 200 });
    } catch (error) {
        console.error('Error fetching market overview:', error);
        if (error.response) {
            console.error('API Response error:', error.response);
        }
        return new Response(JSON.stringify({ error: 'Error fetching market overview' }), { status: 500 });
    }
}
