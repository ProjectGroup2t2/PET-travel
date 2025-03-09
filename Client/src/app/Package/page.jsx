"use client";

<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import Footer from "../footer/page";
import { usePackages } from "../../Hooks/usePackages";
import TourCard from "./TourCard";
import { useState } from "react";
=======
import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Star } from "lucide-react"
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
>>>>>>> origin/main

const Package = () => {
  const {
    dateRange,
    setDateRange,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    timeFilters,
    handleTimeFilterChange,
    specialFilters,
    handleSpecialFilterChange,
    filteredPackages,
    loading,
  } = usePackages();

  // State to track the selected sorting option
  const [sortOption, setSortOption] = useState("Recommended");

  // Function to sort packages based on the selected option
  const sortPackages = (packages) => {
    let sortedPackages = [...packages]; // Create a copy of the array to avoid mutating the original

    switch (sortOption) {
      case "Price: Low to High":
        sortedPackages.sort((a, b) => a.price - b.price); // Assuming each package has a 'price' property
        break;
      case "Price: High to Low":
        sortedPackages.sort((a, b) => b.price - a.price);
        break;
      case "Rating: High to Low":
        sortedPackages.sort((a, b) => b.rating - a.rating); // Assuming each package has a 'rating' property
        break;
      case "Recommended":
      default:
        // No sorting or custom logic for "Recommended" (could be based on a 'recommended' field or left as default)
        break;
    }

    return sortedPackages;
  };

  // Apply sorting to filtered packages
  const sortedPackages = sortPackages(filteredPackages);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <div className="container mx-auto p-4 flex-grow">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8"
        >
<<<<<<< HEAD
          All Tour Packages
=======
          All Tour package
>>>>>>> origin/main
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
<<<<<<< HEAD
            {/* Date Filter */}
=======
>>>>>>> origin/main
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">When will you travel?</h2>
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>
            </div>

            {/* Price Filter */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Price</h2>
              <input
                type="range"
                min="1500"
                max="15000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number.parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between mt-2">
                <span>1500 THB</span>
                <span>{priceRange} THB</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Rating</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 0}
                    onChange={() => setRatingFilter(0)}
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 1}
                    onChange={() => setRatingFilter(1)}
                  />
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400" />
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                    <span className="ml-2">1 star and up</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 2}
                    onChange={() => setRatingFilter(2)}
                  />
                  <div className="flex items-center">
                    {[...Array(2)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                    <span className="ml-2">2 stars and up</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 3}
                    onChange={() => setRatingFilter(3)}
                  />
                  <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                    <span className="ml-2">3 stars and up</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 4}
                    onChange={() => setRatingFilter(4)}
                  />
                  <div className="flex items-center">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-2">4 stars and up</span>
                  </div>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 5}
                    onChange={() => setRatingFilter(5)}
                  />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                    ))}
                    <span className="ml-2">5 stars</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Time Filter */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Tour Time Period</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="timeFilter"
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
                    type="radio"
                    name="timeFilter"
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
                    type="radio"
                    name="timeFilter"
                    checked={timeFilters.allDay}
                    onChange={() => handleTimeFilterChange("allDay")}
                  />
                  <div>
                    <div>All Day</div>
                    <div className="text-sm text-gray-500">Start 8:00 to 15:00</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Filters */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Special Features</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.Halal}
                    onChange={() => handleSpecialFilterChange("Halal")}
                  />
                  <span>Halal Food</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.english}
                    onChange={() => handleSpecialFilterChange("english")}
                  />
                  <span>English-Speaking Guide</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.kids}
                    onChange={() => handleSpecialFilterChange("kids")}
                  />
                  <span>Seats for Small Children</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.private}
                    onChange={() => handleSpecialFilterChange("private")}
                  />
                  <span>Private Tour</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={specialFilters.pickup}
                    onChange={() => handleSpecialFilterChange("pickup")}
                  />
                  <span>Pickup Service After Tour</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Tour Listings */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>{sortedPackages.length} Results</div>
              <select
                className="border rounded-md p-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="Recommended">Recommended</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Rating: High to Low">Rating: High to Low</option>
              </select>
            </div>

<<<<<<< HEAD
            {loading && (
              <div className="text-center py-10">
                <p className="text-xl text-gray-500">Loading data...</p>
              </div>
            )}

            <AnimatePresence>
              {!loading && sortedPackages.length > 0 ? (
                sortedPackages.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))
              ) : (
                !loading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-10 border rounded-lg"
                  >
                    <p className="text-xl text-gray-500">
                      No tours found matching your search criteria
                    </p>
                    <p className="text-gray-500 mt-2">
                      Please try adjusting the filters
                    </p>
                  </motion.div>
                )
=======
            {/* Tour Cards */}
            <AnimatePresence>
              {filteredTours.length > 0 ? (
                filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border rounded-lg overflow-hidden"
                  >
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
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-10 border rounded-lg"
                >
                  <p className="text-xl text-gray-500">ไม่พบทัวร์ที่ตรงกับเงื่อนไขการค้นหา</p>
                  <p className="text-gray-500 mt-2">กรุณาลองปรับเปลี่ยนตัวกรองใหม่</p>
                </motion.div>
>>>>>>> origin/main
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

<<<<<<< HEAD
      <Footer />
    </motion.div>
  );
};
=======
      <motion.footer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2D776E] text-white py-8 w-full mt-8"
      >
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
              {[Facebook, Instagram, MessageCircle, Twitter].map((Icon, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Icon className="w-6 h-6" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

export default Package
>>>>>>> origin/main

export default Package;