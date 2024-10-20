"use client";

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from 'react-hot-toast';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
        const response = await fetch(`/api/stocks?symbol=${searchQuery}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch stock data."); // More informative error handling
        }

        const data = await response.json();
        setSearchResults(data);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        toast.error(error.message); // Display the error message in a toast
    }
};

  

  const addToWatchlist = async (stock) => {
    if (watchlist.some(item => item.symbol === stock.symbol)) {
      toast.error(`${stock.symbol} is already in your watchlist.`);
      return;
    }

    try {
      const response = await fetch('/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1, stockSymbol: stock.symbol, stockName: stock.name }) // Replace userId with the actual user ID
      });

      if (!response.ok) throw new Error("Failed to add stock to watchlist.");
      setWatchlist([...watchlist, stock]);
      toast.success(`${stock.symbol} has been added to your watchlist.`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      const response = await fetch('/api/watchlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: 1, stockSymbol: symbol }) // Replace userId with the actual user ID
      });

      if (!response.ok) throw new Error("Failed to remove stock from watchlist.");
      setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
      toast.success("Removed from Watchlist", {
        description: `${symbol} has been removed from your watchlist.`,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
      
      <div className="card shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Search Stocks</h2>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search by symbol or name"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Change</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td className="text-right">${stock.price.toFixed(2)}</td>
                      <td className="text-right">
                        <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {stock.change >= 0 ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                          {Math.abs(stock.change)}%
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => addToWatchlist(stock)}>
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Your Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="text-center text-muted">Your watchlist is empty. Search for stocks to add them.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Change</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((stock) => (
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td className="text-right">${stock.price.toFixed(2)}</td>
                      <td className="text-right">
                        <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {stock.change >= 0 ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                          {Math.abs(stock.change)}%
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => removeFromWatchlist(stock.symbol)}>
                          <Trash2Icon className="h-4 w-4 mr-2" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
