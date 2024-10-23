"use client"

import { useState } from "react";
import { toast } from "react-hot-toast";

// Mock data for order history
const initialOrders = [
  { id: 1, symbol: "AAPL", quantity: 10, type: "Buy", date: "2023-06-01T10:30:00Z" },
  { id: 2, symbol: "GOOGL", quantity: 5, type: "Sell", date: "2023-06-02T14:45:00Z" },
  { id: 3, symbol: "MSFT", quantity: 15, type: "Buy", date: "2023-06-03T09:15:00Z" },
];

export default function BuySellPage() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("buy");
  const [orders, setOrders] = useState(initialOrders);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      symbol: symbol.toUpperCase(),
      quantity: parseInt(quantity),
      type: action === "buy" ? "Buy" : "Sell",
      date: new Date().toISOString(),
    };

    setOrders([newOrder, ...orders]);
    toast({
      title: "Order Placed",
      description: `${action === "buy" ? "Bought" : "Sold"} ${quantity} shares of ${symbol.toUpperCase()}`,
    });

    // Reset form
    setSymbol("");
    setQuantity("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Buy/Sell Stocks</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Place Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label" htmlFor="symbol">Stock Symbol</label>
                <input
                  id="symbol"
                  type="text"
                  placeholder="e.g., AAPL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Action</label>
                <div className="flex space-x-4">
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="buy"
                      checked={action === "buy"}
                      onChange={() => setAction("buy")}
                      className="radio radio-primary"
                    />
                    <span className="label-text ml-2">Buy</span>
                  </label>
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="action"
                      value="sell"
                      checked={action === "sell"}
                      onChange={() => setAction("sell")}
                      className="radio radio-primary"
                    />
                    <span className="label-text ml-2">Sell</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full">Place Order</button>
            </form>
          </div>
        </div>

        {/* Order History */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Order History</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.symbol}</td>
                      <td>{order.quantity}</td>
                      <td>{order.type}</td>
                      <td>{new Date(order.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
