'use client';
import Link from 'next/link';
import { ArrowUpIcon, BarChart2Icon, LineChartIcon, TrendingUpIcon, DollarSignIcon } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <main className="flex-1 w-full"> {/* Added w-full */}
        <section className="w-full relative py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[10px]" style={{
            backgroundImage: `url(${"/LandingPage.jpg"})`,
          }}></div>

          {/* Content goes here */}
          <div className="relative container px-4 md:px-6 mx-auto z-10"> {/* Added z-10 to bring content above the background */}
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
              </div>
            </div>
          </div>
        </section>

        {/* Updated Key Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32" style={{
          background: "linear-gradient(135deg, #001f3f, #000000)", // Blue to black gradient
        }}>
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="card bg-[#0a2a4d] shadow-lg rounded-lg p-6"> {/* Dark blue card background */}
                <BarChart2Icon className="h-10 w-10 text-[#4ac1ff] mb-2" /> {/* Light blue icon color */}
                <h3 className="text-xl font-bold text-white">Portfolio Tracking</h3>
                <p className="text-gray-300">
                  Monitor your investments in real-time with our advanced portfolio tracking tools.
                </p>
              </div>
              <div className="card bg-[#0a2a4d] shadow-lg rounded-lg p-6">
                <LineChartIcon className="h-10 w-10 text-[#4ac1ff] mb-2" />
                <h3 className="text-xl font-bold text-white">Market Analysis</h3>
                <p className="text-gray-300">
                  Get in-depth market analysis and trends to make informed investment decisions.
                </p>
              </div>
              <div className="card bg-[#0a2a4d] shadow-lg rounded-lg p-6">
                <DollarSignIcon className="h-10 w-10 text-[#4ac1ff] mb-2" />
                <h3 className="text-xl font-bold text-white">Smart Alerts</h3>
                <p className="text-gray-300">
                  Receive personalized alerts for price changes, news, and investment opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32" style={{
          background: "linear-gradient(135deg, #001f3f, #000000)", // Blue to black gradient
        }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="App screenshot"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                height="600"
                src="/LandingPage.jpg"
                width="800"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                    Experience the Power of StockSavvy
                  </h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our intuitive interface and powerful tools make managing your portfolio easier than ever. Start your journey to smarter investing today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="bg-[#4ac1ff] text-white hover:bg-[#39a0e5] font-bold py-2 px-4 rounded-lg" size="lg">
                    Start Free Trial
                  </button>
                  <button className="border-2 border-[#4ac1ff] text-[#4ac1ff] hover:bg-[#001f3f] hover:text-white font-bold py-2 px-4 rounded-lg" size="lg">
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#001f3f] to-black text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">Join StockSavvy Today</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
              Take control of your financial future. Join thousands of investors who trust StockSavvy for smarter portfolio management.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <button className="bg-[#4ac1ff] hover:bg-[#39a0e5] text-white font-bold py-3 px-8 rounded-lg text-lg">
                  Sign Up for Free
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="border-2 border-[#4ac1ff] text-[#4ac1ff] hover:bg-[#001f3f] hover:text-white font-bold py-3 px-8 rounded-lg text-lg">
                  Learn More
                </button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              No credit card required. Start your free trial today!
            </p>
          </div>
        </section>

      </main>
    </div>
  )
}
