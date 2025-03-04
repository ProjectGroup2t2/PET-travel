"use client"

import { useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { AdminHeader } from "@/components/ui/admin/header"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/Auth.context"

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState({
    from: "01.01.2025",
    to: "31.01.2025",
  })

  const [selectedMonths, setSelectedMonths] = useState({
    earnings: "jan",
    customers: "jan",
    bookings: "jan",
  })

  const { state } = useContext(AuthContext) 
  const router = useRouter()

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || []
      if (!roles.includes("admin")) {
        router.push("/") 
      }
    } else if (!state.isLoggedIn) {
      router.push("/login") 
    }
  }, [state.isLoggedIn, state.user, router])

  const months = [
    { value: "jan", label: "January" },
    { value: "feb", label: "February" },
    { value: "mar", label: "March" },
    { value: "apr", label: "April" },
    { value: "may", label: "May" },
    { value: "jun", label: "June" },
    { value: "jul", label: "July" },
    { value: "aug", label: "August" },
    { value: "sep", label: "September" },
    { value: "oct", label: "October" },
    { value: "nov", label: "November" },
    { value: "dec", label: "December" },
  ]


  if (!state.isLoggedIn || !state.user || !state.user.roles?.includes("admin")) {
    return null 
  }

  return (
    <div className="flex-1 bg-gray-50">
      <AdminHeader />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-semibold">5.6 M</p>
                <p className="text-gray-500 text-sm">Total Earning</p>
              </div>
              <select
                value={selectedMonths.earnings}
                onChange={(e) => setSelectedMonths((prev) => ({ ...prev, earnings: e.target.value }))}
                className="bg-white border rounded-lg px-3 py-2 text-sm w-[130px] h-9 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-semibold">160 K</p>
                <p className="text-gray-500 text-sm">Total Customer</p>
              </div>
              <select
                value={selectedMonths.customers}
                onChange={(e) => setSelectedMonths((prev) => ({ ...prev, customers: e.target.value }))}
                className="bg-white border rounded-lg px-3 py-2 text-sm w-[130px] h-9 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-semibold">20 K</p>
                <p className="text-gray-500 text-sm">New Bookings</p>
              </div>
              <select
                value={selectedMonths.bookings}
                onChange={(e) => setSelectedMonths((prev) => ({ ...prev, bookings: e.target.value }))}
                className="bg-white border rounded-lg px-3 py-2 text-sm w-[130px] h-9 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
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

            <div className="space-y-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

