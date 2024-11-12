"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, NewspaperIcon, DollarSignIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import withAuth from "../components/withAuth.js"

function UserDashboard() {
  const [newsArticles, setNewsArticles] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(null)
  const [marketOverview, setMarketOverview] = useState(null)
  const token = localStorage.getItem("token")
  console.log("Token is:", token)
  // Fetch market overview and portfolio value
  useEffect(() => {
    async function fetchMarketData() {
      try {
        // Market Overview data
        const marketResponse = await fetch("/api/dashboard/marketOverview")
        if (!marketResponse.ok) throw new Error("Failed to fetch market overview data.")
        const marketData = await marketResponse.json()
        setMarketOverview(marketData)

        // Portfolio Value data
        const portfolioResponse = await fetch("/api/dashboard/totalPortfolioValue")
        if (!portfolioResponse.ok) throw new Error("Failed to fetch portfolio value data.")
        const portfolioData = await portfolioResponse.json()
        setPortfolioValue(portfolioData.value)
      } catch (error) {
        console.error("Error fetching market or portfolio data:", error)
      }
    }

    fetchMarketData()
  }, [])

  // Fetch top news articles
  useEffect(() => {
    async function fetchNews() {
        try {
            const response = await fetch("/api/dashboard/getNews") // Fetch from the backend
            if (!response.ok) throw new Error("Failed to fetch news data.")
            
            const data = await response.json();
            console.log('News data from API:', data);  // Log the fetched data

            setNewsArticles(data.articles || []); // Adjust according to the actual data structure
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    fetchNews()
}, [])


  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#001f3f] to-black text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#4ac1ff]">Welcome back</h1>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Market Overview Card */}
          <Card className="bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm text-[#4ac1ff]">Market Overview</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-[#4ac1ff]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white">
                {marketOverview ? marketOverview.summary : "Loading market overview..."}
              </p>
            </CardContent>
          </Card>

          {/* Portfolio Value Card */}
          <Card className="bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm text-[#4ac1ff]">Portfolio Value</CardTitle>
                <DollarSignIcon className="h-4 w-4 text-[#4ac1ff]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-white">
                {portfolioValue ? `$${portfolioValue.toFixed(2)}` : "Loading portfolio value..."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top News Card */}
        <Card className="w-full bg-[#0a2a4d] border-[#4ac1ff] border shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-[#4ac1ff]">Top News</CardTitle>
            <CardDescription className="text-gray-400">Stay updated with the latest market news</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full">
              {newsArticles.length === 0 ? (
                <p className="text-white">No news available at the moment.</p>
              ) : (
                newsArticles.map((article, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-400">
                      <NewspaperIcon className="h-4 w-4 mr-2" />
                      <span>{article.source}</span>
                      <span className="mx-2">•</span>
                      <span>{article.time}</span>
                    </div>
                    <p className="text-gray-300">{article.summary || "No summary available."}</p>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default withAuth(UserDashboard);
