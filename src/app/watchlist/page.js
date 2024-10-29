"use client";

import { useState, useEffect } from "react";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "react-hot-toast";


const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null); // For holding the stock details for the modal
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility


// Fetch stock details when a stock is clicked
const StockDetailsDialog = async (symbol) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`/api/stocks?symbol=${encodeURIComponent(symbol)}`, { // Use the stocks API to get detailed info
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const stockDetails = await response.json();
      setSelectedStock(stockDetails); // Set stock details for the modal
      setShowModal(true); // Show the modal
    } else {
      const error = await response.json();
      toast.error(`Error fetching stock details: ${error.message}`);
    }
  } catch (error) {
    toast.error("Error fetching stock details.");
  }
};

const handleSelectStock = (symbol) => {
  StockDetailsDialog(symbol); // Call the StockDetailsDialog with the selected symbol
};

const handleCloseModal = () => {
  setSelectedStock(null); // Clear selected stock
  setShowModal(false); // Close the modal
};

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch("/api/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setLoggedInUserId(data.id);
          fetchUserWatchlist();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("No token found, please log in");
      }
    };

    validateToken();
  }, []);

  const fetchUserWatchlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/watchlist", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const watchlistData = await response.json();
        setWatchlist(watchlistData.data);
      } else {
        const error = await response.json();
        toast.error(`Failed to load watchlist: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error fetching watchlist.");
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a stock symbol.");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`/api/stocks?symbol=${searchQuery.trim()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        toast.error(`Error: ${error.message || "Unable to fetch stock data"}`);
        return;
      }
  
      const stockData = await response.json();
  
      // Check if the stock already exists in searchResults
      const isDuplicate = searchResults.some(
        (stock) => stock.symbol === stockData.symbol
      );
  
      if (isDuplicate) {
        toast.error("This stock is already in your search results.");
        return;
      }
  
      setSearchResults([...searchResults, stockData]); // Add stock to searchResults if it's not a duplicate
  
      // Call StockDetailsDialog when a stock is clicked from search results
      // handleSelectStock(stockData.symbol);
    } catch (error) {
      toast.error("An error occurred while searching for the stock.");
    }
  };
  
  const addToWatchlist = async (stock) => {
    // Check if the stock is already in the watchlist
    const isDuplicate = watchlist.some((item) => item.symbol === stock.symbol);
  
    if (isDuplicate) {
      toast.error(`${stock.symbol} is already in your watchlist.`);
      return;
    }
  
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stock),
      });
  
      if (response.ok) {
        setWatchlist([...watchlist, stock]);
        toast.success(`${stock.symbol} added to your watchlist.`);
      } else {
        const error = await response.json();
        toast.error(`Failed to add stock: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error adding stock to watchlist.");
    }
  };
  
  
  const removeFromWatchlist = async (symbol) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/watchlist?symbol=${symbol}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
        toast.success(`${symbol} removed from your watchlist.`);
      } else {
        const error = await response.json();
        toast.error(`Failed to remove stock: ${error.message}`);
      }
    } catch (error) {
      toast.error("Error removing stock from watchlist.");
    }
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
  
      {/* Search section */}
      <div className="card bg-base-100 shadow-lg mb-6">
        <div className="card-body">
          <h2 className="card-title">Search Stocks</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by symbol"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
  
          {/* Search Results Table */}
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
                    <tr
                      key={stock.symbol}
                      onClick={() => StockDetailsDialog(stock.symbol)} // Call with symbol
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td className="text-right">${stock.price}</td>
                      <td className="text-right">
                        <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {stock.change >= 0 ? (
                            <ArrowUpIcon className="inline h-4 w-4" />
                          ) : (
                            <ArrowDownIcon className="inline h-4 w-4" />
                          )}
                          {Math.abs(stock.change)}%
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToWatchlist(stock);
                          }}
                        >
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
  
      {/* Watchlist Table */}
      <div className="card bg-base-100 shadow-lg">
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
                    <tr
                      key={stock.symbol}
                      onClick={() => StockDetailsDialog(stock.symbol)} // Call with symbol
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td>{stock.symbol}</td>
                      <td>{stock.name}</td>
                      <td className="text-right">${stock.price}</td>
                      <td className="text-right">
                        <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                          {stock.change >= 0 ? (
                            <ArrowUpIcon className="inline h-4 w-4" />
                          ) : (
                            <ArrowDownIcon className="inline h-4 w-4" />
                          )}
                          {Math.abs(stock.change)}%
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline btn-sm btn-error" onClick={() => removeFromWatchlist(stock.symbol)}>
                          <TrashIcon className="h-4 w-4 mr-2" />
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
  
      {/* Stock Details Dialog */}
{showModal && (
  <dialog open className="modal modal-bottom sm:modal-middle">
    <form method="dialog" className="modal-box">
      <h3 className="font-bold text-lg">
        {selectedStock.symbol} - {selectedStock.name || "N/A"}
      </h3>
      <div className="py-4">
        <table className="table w-full">
          <tbody>
            <tr>
              <th>Symbol</th>
              <td>{selectedStock.symbol}</td>
            </tr>
            <tr>
              <th>Highest Price</th>
              <td>${selectedStock.highestPrice?.toFixed(2) || "N/A"}</td>
            </tr>
            <tr>
              <th>Lowest Price</th>
              <td>${selectedStock.lowestPrice?.toFixed(2) || "N/A"}</td>
            </tr>
            <tr>
              <th>Face Value</th>
              <td>${selectedStock.faceValue?.toFixed(2) || "N/A"}</td>
            </tr>
            <tr>
              <th>PE Ratio</th>
              <td>{selectedStock.peRatio?.toFixed(2) || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="modal-action">
        <button className="btn" onClick={handleCloseModal}>
          Close
        </button>
      </div>
    </form>
  </dialog>
)}

    </div>
  );
};

export default WatchlistPage;
