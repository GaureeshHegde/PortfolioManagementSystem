"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "daisyui";
import { Input } from "daisyui";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, NewspaperIcon, DollarSignIcon } from "lucide-react";
import { ScrollArea } from "daisyui";
import daisyui from "daisyui";

// Mock data for news articles
const mockNews = [
  { id: 1, title: "Tech Stocks Surge Amid Positive Earnings Reports", source: "Financial Times", time: "2 hours ago" },
  { id: 2, title: "Federal Reserve Hints at Potential Rate Cut", source: "Wall Street Journal", time: "4 hours ago" },
  { id: 3, title: "Oil Prices Stabilize Following OPEC+ Meeting", source: "Reuters", time: "6 hours ago" },
  { id: 4, title: "Cryptocurrency Market Sees Renewed Interest from Institutional Investors", source: "Bloomberg", time: "8 hours ago" },
  { id: 5, title: "Major Merger Announced in Pharmaceutical Sector", source: "CNBC", time: "10 hours ago" },
];

// Mock data for market overview
const mockMarketOverview = [
  { index: "S&P 500", value: "4,185.81", change: "+0.75%" },
  { index: "Dow Jones", value: "34,098.16", change: "+0.43%" },
  { index: "Nasdaq", value: "12,789.45", change: "+1.28%" },
];

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = mockNews.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome back, John!</h1>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Market Overview Card */}
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-sm">Market Overview</h2>
              <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <table className="table w-full">
              <tbody>
                {mockMarketOverview.map((item) => (
                  <tr key={item.index}>
                    <td className="font-medium">{item.index}</td>
                    <td>{item.value}</td>
                    <td className={item.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {item.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Portfolio Value Card */}
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-sm">Portfolio Value</h2>
              <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">$27,459.12</div>
            <p className="text-xs text-muted-foreground">+$3,459.12 (14.4%) all time</p>
          </div>
        </div>
      </div>

      {/* Top News Card */}
      <div className="card w-full bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Top News</h2>
          <p className="text-sm text-muted-foreground">Stay updated with the latest market news</p>
          <div className="flex items-center space-x-2 my-4">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full max-w-sm"
            />
            <button className="btn btn-outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zm0 0l4.35 4.35"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto h-96">
            {filteredNews.map((article) => (
              <div key={article.id} className="mb-4 last:mb-0">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <NewspaperIcon className="h-4 w-4 mr-2" />
                  <span>{article.source}</span>
                  <span className="mx-2">•</span>
                  <span>{article.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
