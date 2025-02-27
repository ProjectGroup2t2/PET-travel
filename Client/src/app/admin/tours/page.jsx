"use client"

import { AdminHeader } from "@/components/ui/admin/header"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ToursPage() {
  const tours = [
    { id: 1, name: "เมืองเก่าภูเก็ต", price: "THB 4,990", image: "/1.jpg" },
    { id: 2, name: "เกาะเฮ", price: "THB 5,500", image: "/2.jpg" },
    { id: 3, name: "เกาะไม้ท่อน", price: "THB 3,990", image: "/2.jpg" },
  ]

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-[#2A8470] mb-6">Add Tour</h2>

        {/* Grid of Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tour Cards */}
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Image
                src={tour.image || "/placeholder.svg"}
                alt={tour.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.name}</h3>
                <p className="text-blue-600 font-medium">{tour.price}</p>
              </div>
            </div>
          ))}

          {/* Add Tour Card */}
          <Link href="/admin/tours/add">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:border-[#2A8470] transition-colors cursor-pointer min-h-[280px]">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-500">Add your tour</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

