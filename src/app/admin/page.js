'use client'

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BarChart2Icon, 
  UsersIcon, 
  DollarSignIcon, 
  AlertTriangleIcon, 
  BellIcon, 
  SettingsIcon,
  LogOutIcon
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#001f3f] to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a2a4d] p-6">
        <h1 className="text-2xl font-bold mb-8">StockSavvy Admin</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'dashboard' ? 'bg-[#4ac1ff] text-white' : 'text-gray-300 hover:bg-[#001f3f]'}`}
              >
                <BarChart2Icon className="inline-block mr-2" /> Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'users' ? 'bg-[#4ac1ff] text-white' : 'text-gray-300 hover:bg-[#001f3f]'}`}
              >
                <UsersIcon className="inline-block mr-2" /> Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('financials')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'financials' ? 'bg-[#4ac1ff] text-white' : 'text-gray-300 hover:bg-[#001f3f]'}`}
              >
                <DollarSignIcon className="inline-block mr-2" /> Financials
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`w-full text-left py-2 px-4 rounded ${activeTab === 'alerts' ? 'bg-[#4ac1ff] text-white' : 'text-gray-300 hover:bg-[#001f3f]'}`}
              >
                <AlertTriangleIcon className="inline-block mr-2" /> Alerts
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-6">
          <button className="w-full text-left py-2 px-4 text-gray-300 hover:bg-[#001f3f] rounded">
            <SettingsIcon className="inline-block mr-2" /> Settings
          </button>
          <button className="w-full text-left py-2 px-4 text-gray-300 hover:bg-[#001f3f] rounded">
            <LogOutIcon className="inline-block mr-2" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-[#0a2a4d] rounded-full">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="w-10 h-10 bg-[#4ac1ff] rounded-full"></div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#0a2a4d] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">24,789</p>
            <p className="text-sm text-green-400">+12% from last month</p>
          </div>
          <div className="bg-[#0a2a4d] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Active Portfolios</h3>
            <p className="text-3xl font-bold">18,453</p>
            <p className="text-sm text-green-400">+8% from last month</p>
          </div>
          <div className="bg-[#0a2a4d] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Monthly Revenue</h3>
            <p className="text-3xl font-bold">$89,245</p>
            <p className="text-sm text-green-400">+15% from last month</p>
          </div>
          <div className="bg-[#0a2a4d] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Support Tickets</h3>
            <p className="text-3xl font-bold">137</p>
            <p className="text-sm text-red-400">+3% from last month</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#0a2a4d] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">User Growth & Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#4ac1ff" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="users" fill="#4ac1ff" />
                <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0a2a4d] p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div>
                <p className="font-semibold">New user registered</p>
                <p className="text-sm text-gray-400">John Doe (john@example.com)</p>
              </div>
              <span className="text-sm text-gray-400">2 minutes ago</span>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Large transaction alert</p>
                <p className="text-sm text-gray-400">$50,000 portfolio increase</p>
              </div>
              <span className="text-sm text-gray-400">15 minutes ago</span>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Support ticket resolved</p>
                <p className="text-sm text-gray-400">Ticket #1234 - Account access issue</p>
              </div>
              <span className="text-sm text-gray-400">1 hour ago</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}