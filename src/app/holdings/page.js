"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

// Mock data for demonstration
const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", quantity: 10, price: 150.25, change: 2.5 },
  { symbol: "GOOGL", name: "Alphabet Inc.", quantity: 5, price: 2750.80, change: -0.8 },
  { symbol: "MSFT", name: "Microsoft Corporation", quantity: 15, price: 305.50, change: 1.2 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", quantity: 8, price: 3380.75, change: -1.5 },
  { symbol: "FB", name: "Meta Platforms, Inc.", quantity: 20, price: 325.30, change: 0.5 },
]

export default function HoldingsPage() {
  const totalValue = holdings.reduce((sum, holding) => sum + holding.quantity * holding.price, 0)

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
