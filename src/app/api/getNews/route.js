import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY; // Store your API key in an environment variable
  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology,ipo,economy,markets,mergers_and_acquisitions&limit=100&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'request',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch news data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
