"use client"

import { AuthContext } from "@/context/Auth.context"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AdminHeader } from "@/components/ui/admin/header"
import { Star, Clock, Users } from "lucide-react"

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
        // Get JWT token from sessionStorage
        const jwt = sessionStorage.getItem("auth.jwt")

        if (!jwt) {
          console.warn("No JWT token found in sessionStorage")
        }

        // Create headers with authorization
        const headers = jwt
          ? {
              Authorization: `Bearer ${jwt}`,
            }
          : {}

        // First, fetch packages with images
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages?populate[images][populate]=*`,
          { headers },
        )

        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลแพ็คเกจได้")
        }

        const data = await response.json()

        // Then, fetch reviews separately to calculate ratings
        const reviewsPromises = data.data.map((tour) =>
          fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/reviews?filters[package][id][$eq]=${tour.id}`, { headers })
            .then((res) => (res.ok ? res.json() : { data: [] }))
            .catch((err) => {
              console.error(`Error fetching reviews for package ${tour.id}:`, err)
              return { data: [] }
            }),
        )

        const reviewsResults = await Promise.all(reviewsPromises)

        const formattedTours = data.data
          .filter((tour) => (tour.attributes.capacity || 0) >= 1)
          .map((tour, index) => {
            // Get image URL
            let imageUrl = "/placeholder.svg"
            if (tour.attributes.images?.data?.[0]?.attributes?.url) {
              const imagePath = tour.attributes.images.data[0].attributes.url
              imageUrl = imagePath.startsWith("http") ? imagePath : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagePath}`
            }

            // Get reviews for this package
            const packageReviews = reviewsResults[index]?.data || []

            // Calculate average rating
            const totalReviews = packageReviews.length
            const totalRating = packageReviews.reduce((sum, review) => sum + (review.attributes.rating || 0), 0)

            const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0"

            console.log(`Package ${tour.id}:`, {
              title: tour.attributes.title,
              reviewsCount: totalReviews,
              totalRating,
              averageRating,
              imageUrl,
            })

            return {
              id: tour.id,
              image: imageUrl,
              title: tour.attributes.title || "ไม่มีชื่อ",
              rating: averageRating,
              reviews: totalReviews,
              capacity: `${tour.attributes.capacity || 0}/${tour.attributes.capacity_max || 0}`,
              duration: tour.attributes.duration || "ไม่ระบุ",
              price: `THB ${tour.attributes.price?.toLocaleString() || "0"}`,
              isSellOut: tour.attributes.capacity >= tour.attributes.capacity_max,
            }
          })

        setTourCards(formattedTours)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching packages:", err)
        setError(err.message || "ไม่สามารถดึงข้อมูลแพ็คเกจได้")
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
          {tourCards.length > 0 ? (
            tourCards.map((tour) => (
              <Link
                key={tour.id}
                href={`/admin/packages/${tour.id}`}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.log("Image failed to load:", tour.image)
                      e.target.src = "/placeholder.svg"
                    }}
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
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">ไม่พบแพ็คเกจที่มีจำนวนที่นั่งมากกว่า 1</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

