"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Star } from "lucide-react"

// Mock data
const mockTours = [
  {
    id: 1,
    title: "ภูเก็ต",
    image: "/1.jpg",
    description:
      "เมืองท่าภูเก็ตเป็นสถานที่ที่เต็มไปด้วยประวัติศาสตร์และเสน่ห์เฉพาะตัว อาคารบ้านเรือนในย่านเมืองเก่าของภูเก็ตมีสไตล์ชิโน-โปรตุกีส (Sino-Portuguese) ซึ่งผสมผสานระหว่างสถาปัตยกรรมยุโรปและจีนไว้อย่างลงตัว จุดเด่นคือคนที่นี่เป็นมิตรต่อการสัมผัสใกล้ ร้านค้าทำเก่าแก่ และบรรยากาศที่ย้อนยุค",
    rating: 4.0,
    reviews: 204,
    capacity: {
      current: 50,
      total: 60,
    },
    duration: "2 วัน 1 คืน",
    price: 5000,
    timeOfTour: "morning",
    specials: ["halal", "english_guide"],
  },
  {
    id: 2,
    title: "เกาะพีพี",
    image: "/1.jpg",
    description: "เกาะพีพีเป็นหมู่เกาะที่มีชื่อเสียงระดับโลก ด้วยความสวยงามของชายหาดและน้ำทะเลใส เหมาะสำหรับการดำน้ำและพักผ่อน",
    rating: 4.5,
    reviews: 150,
    capacity: {
      current: 30,
      total: 40,
    },
    duration: "1 วัน",
    price: 3500,
    timeOfTour: "afternoon",
    specials: ["english_guide", "private_tour"],
  },
  {
    id: 3,
    title: "เกาะสมุย",
    image: "/1.jpg",
    description:
      "เกาะสมุยเป็นเกาะที่ใหญ่เป็นอันดับ 3 ของประเทศไทย มีชายหาดที่สวยงาม วัฒนธรรมท้องถิ่นที่น่าสนใจ และสิ่งอำนวยความสะดวกครบครัน",
    rating: 4.2,
    reviews: 180,
    capacity: {
      current: 40,
      total: 45,
    },
    duration: "3 วัน 2 คืน",
    price: 8000,
    timeOfTour: "all_day",
    specials: ["halal", "child_seat"],
  },
]

const Package = () => {
  // Filter states
  const [selectedDate, setSelectedDate] = useState("")
  const [priceRange, setPriceRange] = useState(1500)
  const [selectedRating, setSelectedRating] = useState(0)
  const [timeOfTour, setTimeOfTour] = useState({
    morning: false,
    afternoon: false,
    all_day: false,
  })
  const [specials, setSpecials] = useState({
    halal: false,
    english_guide: false,
    child_seat: false,
    private_tour: false,
    pickup_service: false,
  })

  // Filtered tours state
  const [filteredTours, setFilteredTours] = useState(mockTours)

  // Apply filters
  useEffect(() => {
    let results = mockTours

    // Filter by price
    results = results.filter((tour) => tour.price <= priceRange)

    // Filter by rating
    if (selectedRating > 0) {
      results = results.filter((tour) => tour.rating >= selectedRating)
    }

    // Filter by time of tour
    const selectedTimes = Object.entries(timeOfTour)
      .filter(([_, isSelected]) => isSelected)
      .map(([time]) => time)
    if (selectedTimes.length > 0) {
      results = results.filter((tour) => selectedTimes.includes(tour.timeOfTour))
    }

    // Filter by specials
    const selectedSpecials = Object.entries(specials)
      .filter(([_, isSelected]) => isSelected)
      .map(([special]) => special)
    if (selectedSpecials.length > 0) {
      results = results.filter((tour) => selectedSpecials.every((special) => tour.specials.includes(special)))
    }

    setFilteredTours(results)
  }, [priceRange, selectedRating, timeOfTour, specials])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">All Tour package</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">When are you traveling?</h2>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Price</h2>
            <input
              type="range"
              min="1500"
              max="10000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
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
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === 5}
                  onChange={() => setSelectedRating(5)}
                  className="accent-yellow-400"
                />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === 4}
                  onChange={() => setSelectedRating(4)}
                  className="accent-yellow-400"
                />
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
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
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timeOfTour.morning}
                  onChange={(e) => setTimeOfTour((prev) => ({ ...prev, morning: e.target.checked }))}
                  className="accent-blue-600"
                />
                <div>
                  <div>Morning</div>
                  <div className="text-sm text-gray-500">Start 8:00 to 12:00</div>
                </div>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timeOfTour.afternoon}
                  onChange={(e) => setTimeOfTour((prev) => ({ ...prev, afternoon: e.target.checked }))}
                  className="accent-blue-600"
                />
                <div>
                  <div>Afternoon</div>
                  <div className="text-sm text-gray-500">After 13:00 to 15:00</div>
                </div>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timeOfTour.all_day}
                  onChange={(e) => setTimeOfTour((prev) => ({ ...prev, all_day: e.target.checked }))}
                  className="accent-blue-600"
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
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={specials.halal}
                  onChange={(e) => setSpecials((prev) => ({ ...prev, halal: e.target.checked }))}
                  className="accent-blue-600"
                />
                <span>อาหารฮาลาล</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={specials.english_guide}
                  onChange={(e) => setSpecials((prev) => ({ ...prev, english_guide: e.target.checked }))}
                  className="accent-blue-600"
                />
                <span>ไกด์ภาษาอังกฤษ</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={specials.child_seat}
                  onChange={(e) => setSpecials((prev) => ({ ...prev, child_seat: e.target.checked }))}
                  className="accent-blue-600"
                />
                <span>ที่นั่งสำหรับเด็กเล็ก</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={specials.private_tour}
                  onChange={(e) => setSpecials((prev) => ({ ...prev, private_tour: e.target.checked }))}
                  className="accent-blue-600"
                />
                <span>ทัวร์ส่วนตัว</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={specials.pickup_service}
                  onChange={(e) => setSpecials((prev) => ({ ...prev, pickup_service: e.target.checked }))}
                  className="accent-blue-600"
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
            </select>
          </div>

          {/* Tour Cards */}
          {filteredTours.map((tour) => (
            <div key={tour.id} className="border rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-64 md:h-full">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={`${tour.title} tour image`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-gray-500">({tour.reviews})</span>
                    </div>
                    <div className="text-gray-500">
                      {tour.capacity.current}/{tour.capacity.total}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Package

