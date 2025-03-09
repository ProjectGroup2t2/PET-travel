"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import Footer from "../footer/page";
import { usePackages } from "../../Hooks/usePackages";
import TourCard from "./TourCard";
import { useState } from "react";

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
          All Tour Packages
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