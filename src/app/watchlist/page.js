"use client";

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from 'react-hot-toast';

// Mock data for demonstration
const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.80, change: -0.8 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 305.50, change: 1.2 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 3380.75, change: -1.5 },
  { symbol: "FB", name: "Meta Platforms, Inc.", price: 325.30, change: 0.5 },
]

// Mock function to simulate stock search
const searchStocks = (query) => {
  return mockStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase())
  )
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    const results = searchStocks(searchQuery)
    setSearchResults(results)
  }

  const addToWatchlist = (stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
      toast.success(`${stock.symbol} has been added to your watchlist.`); // Ensure this is a string
    } else {
      toast.error(`${stock.symbol} is already in your watchlist.`); // Ensure this is a string
    }
  };


  const removeFromWatchlist = (symbol) => {
  setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  toast.success("Removed from Watchlist", {
    description: `${symbol} has been removed from your watchlist.`,
  });
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
  )
}
