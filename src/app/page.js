'use client';
import Link from 'next/link'; 
import { ArrowUpIcon, BarChart2Icon, LineChartIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <main className="flex-1 w-full"> {/* Added w-full */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto"> {/* Added mx-auto for centering */}
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-white">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master Your Investments with StockSavvy
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Powerful portfolio management, real-time analytics, and intelligent insights to help you make smarter investment decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="bg-white text-primary hover:bg-gray-100" size="lg">
                    Get Started
                  </button>
                  <button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" size="lg">
                    Learn More
                  </button>
                </div>
              </div>
              <Image
                alt="Stock chart"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="600"
                src="/LandingPage.jpg"
                width="800"
              />
            </div>
          </div>
        </section>

        {/* Updated Key Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="card bg-white shadow-lg rounded-lg p-6">
                <BarChart2Icon className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Portfolio Tracking</h3>
                <p>Monitor your investments in real-time with our advanced portfolio tracking tools.</p>
              </div>
              <div className="card bg-white shadow-lg rounded-lg p-6">
                <LineChartIcon className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Market Analysis</h3>
                <p>Get in-depth market analysis and trends to make informed investment decisions.</p>
              </div>
              <div className="card bg-white shadow-lg rounded-lg p-6">
                <DollarSignIcon className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-xl font-bold">Smart Alerts</h3>
                <p>Receive personalized alerts for price changes, news, and investment opportunities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="App screenshot"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                height="600"
                src="/placeholder.svg?height=600&width=800"
                width="800"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experience the Power of StockSavvy</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our intuitive interface and powerful tools make managing your portfolio easier than ever. Start your journey to smarter investing today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="bg-primary text-white hover:bg-primary/90" size="lg">
                    Start Free Trial
                  </button>
                  <button variant="outline" size="lg">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          {/* Your signup section can go here */}
        </section>
      </main>
    </div>
  )
}
