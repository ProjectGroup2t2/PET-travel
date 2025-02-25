"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AdminHeader } from "@/components/ui/admin/header"
import { Plus, Star, Clock, Users } from "lucide-react"

export default function Package() {
  const [tourCards, setTourCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          image: "/1.jpg",
          title: "ภูเก็ต",
          rating: 4.0,
          reviews: 204,
          capacity: "50/60",
          duration: "รายวัน",
          price: "THB 5,590",
          isSellOut: false,
        },
        {
          id: 2,
          image: "/login-pic.png",
          title: "เกาะพีพีมาเล",
          rating: 4.5,
          reviews: 320,
          capacity: "30/40",
          duration: "3 วัน 2 คืน",
          price: "THB 6,990",
          isSellOut: true,
        },
      ]
      setTourCards(data)
    }

    fetchData()
  }, [])

  if (!tourCards.length) return <div className="p-8">Loading...</div>

  return (
    <div className="flex-1">
      {/* Header ของหน้า Packages Management */}
      <AdminHeader title="Packages Management" />

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-[#2A8470] mb-6">Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tourCards.map((tour) => (
            <Link
              key={tour.id}
              href={`/admin/packages/${tour.id}`}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* สำหรับรูปภาพ */}
              <div className="relative w-full h-48">
                <Image
                  src={tour.image || "/placeholder.svg"}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* ข้อมูลรายละเอียดการ์ด */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{tour.title}</h3>

                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                  <span>{tour.rating}</span>
                  <span className="ml-1">({tour.reviews} รีวิว)</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{tour.duration}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{tour.capacity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">{tour.price}</span>
                  {tour.isSellOut && <span className="text-red-500 font-medium">Sold Out</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
