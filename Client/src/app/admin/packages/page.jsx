"use client"

import { AuthContext } from "@/context/Auth.context"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AdminHeader } from "@/components/ui/admin/header"
import { Plus, Star, Clock, Users } from "lucide-react"

export default function Package() {
  const [tourCards, setTourCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages?populate=*`
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลแพ็คเกจได้")
        }
        const data = await response.json()

        const formattedTours = data.data.map((tour) => ({
          id: tour.id,
          image: tour.attributes.images?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${tour.attributes.images.data[0].attributes.url}`
            : "/placeholder.svg",
          title: tour.attributes.title || "ไม่มีชื่อ",
          rating: tour.attributes.rating || 4.0,
          reviews: tour.attributes.reviews || 0,
          capacity: `${tour.attributes.capacity || 0}/${tour.attributes.capacity_max || 0}`,
          duration: tour.attributes.duration || "ไม่ระบุ",
          price: `THB ${tour.attributes.price?.toLocaleString() || "0"}`,
          isSellOut: tour.attributes.capacity >= tour.attributes.capacity_max
        }))

        setTourCards(formattedTours)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  if (!state.isLoggedIn || !state.user || !state.user.roles?.includes("admin")) {
    return null
  }

  if (loading) {
    return (
      <div className="flex-1">
        <AdminHeader title="Packages Management" />
        <div className="p-8">
          <p className="text-xl text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1">
        <AdminHeader title="Packages Management" />
        <div className="p-8">
          <p className="text-xl text-red-500">เกิดข้อผิดพลาด: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
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
              <div className="relative w-full h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
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
          
          {/* Add Package Card */}
          <Link href="/admin/packages/add">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:border-[#2A8470] transition-colors cursor-pointer min-h-[280px]">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-500">Add new package</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}