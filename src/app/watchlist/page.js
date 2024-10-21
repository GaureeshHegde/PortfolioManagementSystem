"use client";

import { useState, useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from 'react-hot-toast';

// Initial state for the watchlist
const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Step 1: Token validation and fetching user's watchlist
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await fetch('/api/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          console.log(data)
          setLoggedInUserId(data.id); // Assuming the user ID is stored in `id`
          fetchUserWatchlist(data.id);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('No token found, please log in');
      }
    };

    validateToken();
  }, []);

  // Fetch user's watchlist from the API
  // useEffect(() => {
  //   if (loggedInUserId) {
  //     fetchUserWatchlist(loggedInUserId);
  //   }
  // }, [loggedInUserId]);

  const fetchUserWatchlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/watchlist`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const watchlistData = await response.json();
        setWatchlist(watchlistData.data);
        console.log(watchlistData.data)
      } else {
        const error = await response.json();
        toast.error(`Failed to load your watchlist: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Error fetching watchlist data.');
      console.error('Error fetching watchlist:', error);
    }
  };

  // Fetch stock data for the watchlist at intervals
  // useEffect(() => {
  //   const fetchWatchlistData = async () => {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       toast.error('You are not logged in');
  //       return;
  //     }

  //     const stocks = await Promise.all(
  //       watchlist.map(async (stock) => {
  //         const response = await fetch(`/api/stocks?symbol=${stock.symbol}`, {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           }
  //         });

  //         if (!response.ok) {
  //           toast.error(`Failed to fetch data for ${stock.symbol}`);
  //           return stock;
  //         }
  //         const data = await response.json();
  //         return {
  //           ...stock,
  //           price: data.price,
  //           change: data.change,
  //         };
  //       })
  //     );
  //     setStockData(stocks);
  //   };

  //   fetchWatchlistData();

  //   const intervalId = setInterval(fetchWatchlistData, 300000); // 5 minutes
  //   return () => clearInterval(intervalId);
  // }, [watchlist]);

  // Handle search and add stock to watchlist
  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      toast.error("Please enter a stock symbol to search.");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/stocks?symbol=${trimmedQuery}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(`Error: ${error.message || "Unable to fetch stock data"}`);
        return;
      }

      const stockData = await response.json();
      if (stockData) {
        setSearchResults([stockData]);
      } else {
        toast.error("No results found for this symbol.");
        setSearchResults([]);
      }
    } catch (error) {
      toast.error("An error occurred while searching for the stock.");
      console.error(error);
    }
  };

  // Step 2: Add stock to user's watchlist via API
  const addToWatchlist = async (stock) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ symbol: stock.symbol, price: stock.price, change: stock.change}),
      });

      if (response.ok) {
        setWatchlist([...watchlist, stock]);
        toast.success(`${stock.symbol} has been added to your watchlist.`);
      } else {
        const error = await response.json();
        toast.error(`Failed to add stock: ${error.message}`);
      }
    } catch (error) {
      toast.error('Error adding stock to watchlist.');
      console.error('Error adding stock:', error);
    }
  };

  // Step 3: Remove stock from user's watchlist via API
  const removeFromWatchlist = async (symbol) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/watchlist?symbol=${symbol}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
        toast.success(`${symbol} has been removed from your watchlist.`);
      } else {
        const error = await response.json();
        toast.error(`Failed to remove stock: ${error.message}`);
      }
    } catch (error) {
      toast.error('Error removing stock from watchlist.');
      console.error('Error removing stock:', error);
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
              placeholder="Search by symbol"
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
                  {watchlist.map((stock) => ( // Use stockData for rendering
                    <tr key={stock.symbol}>
                      <td>{stock.symbol}</td>
                      {/* <td>{stock.name}</td> */}
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
};

export default WatchlistPage;
