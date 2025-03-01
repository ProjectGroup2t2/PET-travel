"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Star } from "lucide-react"
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react"

// Mock data for tours
const mockTours = [
  {
    id: 1,
    name: "ภูเก็ต",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "เมืองท่าภูเก็ตเป็นสถานที่ที่เต็มไปด้วยประวัติศาสตร์และเสน่ห์เฉพาะตัว อาคารบ้านเรือนในย่านเมืองเก่าของภูเก็ตมีสไตล์ชิโน-โปรตุกีส (Sino-Portuguese) ซึ่งผสมผสานระหว่างสถาปัตยกรรมยุโรปและจีนไว้อย่างลงตัว จุดเด่นคือคนที่นี่เป็นมิตรต่อการสัมผัสใกล้ ร้านค้าทำเก่าแก่ และบรรยากาศที่ย้อนยุค",
    rating: 4.0,
    reviews: 204,
    capacity: { current: 50, total: 60 },
    duration: "2 วัน 1 คืน",
    price: 3500,
    timeOfTour: ["morning", "all-day"],
    specials: ["halal", "english", "private"],
  },
  {
    id: 2,
    name: "เชียงใหม่",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "เชียงใหม่เป็นเมืองที่มีเสน่ห์ทางวัฒนธรรมล้านนา มีวัดเก่าแก่มากมาย อาหารอร่อย และธรรมชาติที่สวยงาม เหมาะสำหรับการพักผ่อนและสัมผัสวิถีชีวิตท้องถิ่น",
    rating: 4.5,
    reviews: 350,
    capacity: { current: 30, total: 40 },
    duration: "3 วัน 2 คืน",
    price: 5500,
    timeOfTour: ["afternoon", "all-day"],
    specials: ["english", "kids", "pickup"],
  },
  {
    id: 3,
    name: "กระบี่",
    image: "/placeholder.svg?height=400&width=600",
    description: "กระบี่มีชายหาดที่สวยงาม น้ำทะเลใสสีฟ้า เหมาะสำหรับการดำน้ำและกิจกรรมทางน้ำ มีเกาะน้อยใหญ่มากมายให้ท่องเที่ยว",
    rating: 4.8,
    reviews: 280,
    capacity: { current: 25, total: 30 },
    duration: "2 วัน 1 คืน",
    price: 4200,
    timeOfTour: ["morning"],
    specials: ["halal", "kids", "private"],
  },
  {
    id: 4,
    name: "พัทยา",
    image: "/placeholder.svg?height=400&width=600",
    description: "พัทยาเป็นเมืองท่องเที่ยวยอดนิยมที่มีชายหาดสวยงาม กิจกรรมทางน้ำมากมาย และแหล่งบันเทิงครบครัน",
    rating: 3.9,
    reviews: 420,
    capacity: { current: 80, total: 100 },
    duration: "1 วัน",
    price: 1500,
    timeOfTour: ["morning", "afternoon"],
    specials: ["english", "pickup"],
  },
]

const Package = () => {
  // Filter states
  const [dateRange, setDateRange] = useState("")
  const [priceRange, setPriceRange] = useState(10000)
  const [ratingFilter, setRatingFilter] = useState(0)
  const [timeFilters, setTimeFilters] = useState({
    morning: false,
    afternoon: false,
    allDay: false,
  })
  const [specialFilters, setSpecialFilters] = useState({
    halal: false,
    english: false,
    kids: false,
    private: false,
    pickup: false,
  })

  const [filteredTours, setFilteredTours] = useState(mockTours)

  useEffect(() => {
    let result = mockTours

    result = result.filter((tour) => tour.price <= priceRange)

    if (ratingFilter > 0) {
      result = result.filter((tour) => tour.rating >= ratingFilter)
    }

    const activeTimeFilters = Object.entries(timeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key)

    if (activeTimeFilters.length > 0) {
      result = result.filter((tour) => {
        return tour.timeOfTour.some((time) => {
          if (time === "morning" && timeFilters.morning) return true
          if (time === "afternoon" && timeFilters.afternoon) return true
          if (time === "all-day" && timeFilters.allDay) return true
          return false
        })
      })
    }

    const activeSpecialFilters = Object.entries(specialFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key)

    if (activeSpecialFilters.length > 0) {
      result = result.filter((tour) => {
        return activeSpecialFilters.every((special) => tour.specials.includes(special))
      })
    }

    setFilteredTours(result)
  }, [priceRange, ratingFilter, timeFilters, specialFilters])

  const handleTimeFilterChange = (filter) => {
    setTimeFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  const handleSpecialFilterChange = (filter) => {
    setSpecialFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-4xl font-bold mb-8">All Tour package</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">When are you traveling?</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Dates"
                  className="w-full p-2 border rounded-lg"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Price</h2>
              <input
                type="range"
                min="1500"
                max="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number.parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between mt-2">
                <span>1500 THB</span>
                <span>{priceRange} THB</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Rating</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="rating" checked={ratingFilter === 0} onChange={() => setRatingFilter(0)} />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="rating" checked={ratingFilter === 4} onChange={() => setRatingFilter(4)} />
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">& up</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Time of Tour</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={timeFilters.morning}
                    onChange={() => handleTimeFilterChange("morning")}
                  />
                  <div>
                    <div>Morning</div>
                    <div className="text-sm text-gray-500">Start 8:00 to 12:00</div>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={timeFilters.afternoon}
                    onChange={() => handleTimeFilterChange("afternoon")}
                  />
                  <div>
                    <div>Afternoon</div>
                    <div className="text-sm text-gray-500">After 13:00 to 15:00</div>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={timeFilters.allDay}
                    onChange={() => handleTimeFilterChange("allDay")}
                  />
                  <div>
                    <div>All day</div>
                    <div className="text-sm text-gray-500">Start 8:00 to 15:00</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Specials</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.halal}
                    onChange={() => handleSpecialFilterChange("halal")}
                  />
                  <span>อาหารฮาลาล</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.english}
                    onChange={() => handleSpecialFilterChange("english")}
                  />
                  <span>ไกด์ภาษาอังกฤษ</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.kids}
                    onChange={() => handleSpecialFilterChange("kids")}
                  />
                  <span>ที่นั่งสำหรับเด็กเล็ก</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.private}
                    onChange={() => handleSpecialFilterChange("private")}
                  />
                  <span>ทัวร์ส่วนตัว</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.pickup}
                    onChange={() => handleSpecialFilterChange("pickup")}
                  />
                  <span>ต้องการรถมารับหลังทำหมดการ</span>
                </label>
              </div>
            </div>
          </div>

          {/* Tour Listings */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div>{filteredTours.length} results</div>
              <select className="border rounded-md p-2">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {/* Tour Cards */}
            {filteredTours.length > 0 ? (
              filteredTours.map((tour) => (
                <div key={tour.id} className="border rounded-lg overflow-hidden">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="relative h-64 md:h-full">
                      <Image src="/1.jpg" alt={`${tour.name} tour image`} fill className="object-cover" />
                    </div>

                    <div className="p-4 md:col-span-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="font-semibold">{tour.rating.toFixed(1)}</span>
                          <span className="text-gray-500">({tour.reviews})</span>
                        </div>
                        <div className="text-gray-500">
                          {tour.capacity.current}/{tour.capacity.total}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
                      <p className="text-gray-600 mb-4">{tour.description}</p>
                      <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{tour.duration}</span>
                        </div>
                        <div>Free Cancellation</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mt-2">THB {tour.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 border rounded-lg">
                <p className="text-xl text-gray-500">ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา</p>
                <p className="text-gray-500 mt-2">กรุณาลองปรับเปลี่ยนตัวกรองใหม่</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-[#2D776E] text-white py-8 w-full mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image src="/logoW.png" alt="PETI Logo" width={170} height={90} />

            <div className="text-center">
              <p className="font-semibold">Contact us</p>
              <p>yimwired@gmail.com</p>
            </div>

            <div className="text-center">
              <p className="font-semibold">About</p>
              <p>@PET2025</p>
            </div>

            <div className="flex gap-4">
              <Facebook className="w-6 h-6" />
              <Instagram className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Package

