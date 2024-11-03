"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, NewspaperIcon, DollarSignIcon, SearchIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/getNews') // Ensure the correct endpoint
        if (!response.ok) throw new Error("Failed to fetch news data.")
        
        const data = await response.json()
        setNewsArticles(data.articles || []) // Adjust according to the actual data structure
      } catch (error) {
        console.error("Error fetching news:", error)
      }
    }

    fetchNews()
  }, [])

  const filteredNews = newsArticles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5) // Limit to 5 articles

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
              {/* Market overview content here */}
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
              {/* Portfolio value content here */}
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
            <div className="flex items-center space-x-2 my-4">
              <Input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#001f3f] text-white border-[#4ac1ff] placeholder-gray-400"
              />
              <Button variant="outline" className="border-[#4ac1ff] text-[#4ac1ff] hover:bg-[#4ac1ff] hover:text-[#001f3f]">
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
            <ScrollArea className="h-96 w-full">
              {filteredNews.map((article) => (
                <div key={article.id} className="mb-4 last:mb-0">
                  <h3 className="text-lg font-semibold text-white">{article.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-400">
                    <NewspaperIcon className="h-4 w-4 mr-2" />
                    <span>{article.source}</span>
                    <span className="mx-2">•</span>
                    <span>{article.time}</span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
