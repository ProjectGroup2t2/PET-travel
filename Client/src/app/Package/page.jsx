// Package.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Star } from 'lucide-react';
import Footer from '../footer/page';
import { usePackages } from '../../Hooks/usePackages';
import TourCard from './TourCard';

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
          All Tour package
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Date Filter */}
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

            {/* Price Filter */}
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

            {/* Rating Filter */}
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

            {/* Time Filter */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-4">Time of Tour</h2>
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
                    <div>All day</div>
                    <div className="text-sm text-gray-500">Start 8:00 to 15:00</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Filters */}
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
          </motion.div>

          {/* Tour Listings */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>{filteredPackages.length} results</div>
              <select className="border rounded-md p-2">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
              </select>
            </div>

            {loading && (
              <div className="text-center py-10">
                <p className="text-xl text-gray-500">กำลังโหลดข้อมูล...</p>
              </div>
            )}

            <AnimatePresence>
              {!loading && filteredPackages.length > 0 ? (
                filteredPackages.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))
              ) : !loading && (
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
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Package;