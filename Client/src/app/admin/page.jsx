"use client"

import { useState } from "react"
import { Calendar, User, MoreVertical, ChevronDown } from "lucide-react"
import { AdminHeader } from "@/components/ui/admin/header"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState({
    from: "01.01.2025",
    to: "31.01.2025",
  })

  return (
    <div className="flex-1 bg-gray-50">
      <AdminHeader />

      <div className="p-6 space-y-6">
        
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">5.6 M</p>
                <p className="text-gray-500 text-sm">Total Earning</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-xl">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">160 K</p>
                <p className="text-gray-500 text-sm">Total Customer</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-xl">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold">20 K</p>
                <p className="text-gray-500 text-sm">New Bookings</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-xl">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Latest Tours Booking</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <button className="flex items-center gap-2">
                    Jan, 2025 <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Button>
            </div>

            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex justify-between">
                <span>From</span>
                <span>To</span>
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={dateRange.from}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                  className="bg-white border rounded-lg px-3 py-2 w-full"
                />
                <input
                  type="text"
                  value={dateRange.to}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                  className="bg-white border rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              

            </div>
          </div>

         
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Earning stat</h2>
              <p className="text-2xl font-bold">2025</p>
            </div>

            <div className="relative h-[200px] w-full">
              
              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               
                <defs>
                  <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                  </linearGradient>
                </defs>

                
                <path
                  d="M0 150 C50 120, 100 160, 150 100 C200 40, 250 140, 300 80 C350 20, 400 60, 450 40 L450 200 L0 200 Z"
                  fill="url(#line-gradient)"
                />  

                
                <path
                  d="M0 150 C50 120, 100 160, 150 100 C200 40, 250 140, 300 80 C350 20, 400 60, 450 40"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="none"
                />

                
                <circle cx="350" cy="20" r="4" fill="#4F46E5" />
                <circle cx="350" cy="20" r="8" fill="#4F46E5" fillOpacity="0.2" />
              </svg>

              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-400">
                <span>SEP</span>
                <span>OCT</span>
                <span>NOV</span>
                <span>DEC</span>
                <span className="text-indigo-600 font-medium">JAN</span>
                <span>FEB</span>
              </div>

              
              <div className="absolute top-4 right-20 bg-indigo-600 text-white px-2 py-1 rounded text-sm">100 K</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

