'use client';
//import { Button } from "daisyui"; // Assuming you have Daisy UI set up
//import { Card } from "daisyui"; // Importing Card component from Daisy UI
//import { Input } from "daisyui"; // Importing Input component from Daisy UI
import { ArrowUpIcon, BarChart2Icon, LineChartIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <TrendingUpIcon className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">StockSavvy</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header> */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
          <div className="container px-4 md:px-6">
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
                src="/placeholder.svg?height=600&width=800"
                width="800"
              />
            </div>
          </div>
        </section>

        {/* Updated Key Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
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
          <div className="container px-4 md:px-6">
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
          {/* <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Investing Smarter?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of investors who are already using StockSavvy to optimize their portfolios and maximize returns.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <button type="submit">Sign Up</button>
                </form>
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div> */} 
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 StockSavvy Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  )
}
