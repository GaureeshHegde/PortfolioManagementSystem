'use client';
import React, { useState } from 'react';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState([
    { name: 'AAPL', boughtAt: 150, currentPrice: 180, id: 1 },
    { name: 'GOOGL', boughtAt: 1200, currentPrice: 1300, id: 2 },
    { name: 'TSLA', boughtAt: 500, currentPrice: 550, id: 3 },
  ]);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      <div className="max-w-xl w-full bg-neutral p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-primary-content mb-6 text-center">My Portfolio</h1>

        {/* Portfolio List */}
        <div className="space-y-4">
          {portfolio.map((stock) => (
            <div
              key={stock.id}
              className="bg-base-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="text-neutral-content text-lg font-semibold">
                <span className="block">{stock.name}</span>
                <span className="block text-sm">Bought At: ${stock.boughtAt}</span>
                <span className="block text-sm">Current Price: ${stock.currentPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
