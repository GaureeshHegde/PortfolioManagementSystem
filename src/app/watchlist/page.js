'use client';
import React, { useState } from 'react';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([
    { name: 'AAPL', id: 1 },
    { name: 'GOOGL', id: 2 },
    { name: 'TSLA', id: 3 },
  ]);

  const [newStock, setNewStock] = useState('');

  const addStock = () => {
    if (newStock) {
      setWatchlist([...watchlist, { name: newStock, id: watchlist.length + 1 }]);
      setNewStock('');
    }
  };

  const removeStock = (id) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      <div className="max-w-xl w-full bg-neutral p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-primary-content mb-6 text-center">My Watchlist</h1>

        {/* Add Stock */}
        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            placeholder="Add a stock (e.g., AAPL)"
            className="input input-bordered input-primary w-full bg-base-300 text-primary-content"
          />
          <button onClick={addStock} className="btn btn-primary">
            Add Stock
          </button>
        </div>

        {/* Watchlist */}
        <div className="space-y-4">
          {watchlist.map((stock) => (
            <div
              key={stock.id}
              className="bg-base-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span className="text-neutral-content text-lg font-semibold">
                {stock.name}
              </span>
              <button
                onClick={() => removeStock(stock.id)}
                className="btn btn-sm btn-outline btn-error"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPage;
