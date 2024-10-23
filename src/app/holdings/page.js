"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { useState,useEffect } from 'react';

export default function HoldingsPage() {

  const [holdings, setHoldings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.quantity * holding.price, 0)

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
          fetchUserHoldings(data.id);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('No token found, please log in');
      }
    };

    validateToken();
  }, []);

  const fetchUserHoldings= async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/holdings`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const holdingsData = await response.json();
        setHoldings(holdingsData.data);
        console.log(holdingsData.data)
      } else {
        const error = await response.json();
        toast.error(`Failed to load your holdings: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Error fetching holdings data.');
      console.error('Error fetching holdings:', error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Holdings</h1>
      <div className="card w-full mb-6 bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Portfolio Summary</h2>
          <p className="text-3xl font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-sm text-gray-500">Total Portfolio Value</p>
        </div>
      </div>
      <div className="card w-full bg-base-200 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Holdings</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Change</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol}>
                    <td className="font-medium">{holding.symbol}</td>
                    <td>{holding.name}</td>
                    <td className="text-right">{holding.quantity}</td>
                    <td className="text-right">${holding.price.toFixed(2)}</td>
                    <td className="text-right">
                      <span className={holding.change >= 0 ? "text-green-600" : "text-red-600"}>
                        {holding.change >= 0 ? <ArrowUpIcon className="inline h-4 w-4" /> : <ArrowDownIcon className="inline h-4 w-4" />}
                        {Math.abs(holding.change)}%
                      </span>
                    </td>
                    <td className="text-right">${(holding.quantity * holding.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
