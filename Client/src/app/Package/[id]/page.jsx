"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../footer/page";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Removed useParams since params are directly passed
import Swal from "sweetalert2";
import { use } from "react"; // Import React.use for unwrapping params Promise

const PackageDetail = ({ params: paramsPromise }) => {
  // Unwrap params Promise using React.use (for Server Component compatibility)
  const params = use(paramsPromise);
  const router = useRouter();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [travelers, setTravelers] = useState(2); // Default to 2 travelers
  const [timeOfTour, setTimeOfTour] = useState("morning"); // Default to morning
  const [pickupOption, setPickupOption] = useState(""); // Pickup option state
  const [specials, setSpecials] = useState({
    halal: false,
    english: false,
    kids: false,
    private: false,
    pickup: false,
  });

  useEffect(() => {
    const fetchPackage = async (retries = 3) => {
      try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        if (!strapiUrl) {
          throw new Error("Strapi URL is not defined in environment variables");
        }

        const response = await fetch(
          `${strapiUrl}/api/packages?filters[id][$eq]=${params.id}&populate=*`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch package data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
          throw new Error("Package data not found");
        }

        const product = data.data[0];
        const formattedData = {
          id: product.id,
          name: product.attributes.title || "No name", // Adjust for Strapi v4 response structure
          images: product.attributes.images?.data?.map((img) =>
            `${strapiUrl}${img.attributes.url}`
          ) || ["/placeholder.svg"],
          description:
            product.attributes.description?.[0]?.children?.[0]?.text || "No description", // Adjust for Strapi v4 response
          rating:
            product.attributes.reviews?.data?.length > 0
              ? product.attributes.reviews.data.reduce(
                  (sum, review) => sum + (review.attributes.rating || 0),
                  0
                ) / product.attributes.reviews.data.length
              : 0,
          reviews: product.attributes.reviews?.data?.length || 0,
          capacity: {
            current: product.attributes.capacity || 0,
            total: product.attributes.capacity_max || 0,
          },
          duration: product.attributes.duration || "Not specified",
          price: product.attributes.price || 0,
          timeOfTour: product.attributes.timeOfTour || { morning: true, afternoon: false, allDay: false },
          specials: product.attributes.specials || { Halal: false, english: false, kids: false, private: false, pickup: false },
        };

        setPackageData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err); // Log the error for debugging
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchPackage(retries - 1);
        }
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!packageData) return;

    const cartItem = {
      id: packageData.id,
      attributes: {
        title: packageData.name,
        price: packageData.price,
        image: packageData.images[0], // Use the first image
        duration: packageData.duration,
        timeOfTour: timeOfTour,
        specials: Object.keys(specials).filter((key) => specials[key]),
        selectedDate,
        travelers,
        pickupOption,
      },
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = currentCart.findIndex((item) => item.id === cartItem.id);

    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    Swal.fire({
      icon: "success",
      title: "Added to Cart Successfully!",
      text: `${packageData.name} has been added to your cart`,
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Booking",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/cart");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Package data not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <div className="container mx-auto p-4 flex-grow">
        <div className="mb-6">
          <Link
            href="/Package"
            className="inline-flex items-center px-4 py-2 bg-[#2A8470] text-white rounded-full hover:bg-[#2A8470] transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <span className="mr-2">←</span> Back to Packages
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content (Tour Images and Info) */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-4">
              <Image
                src={packageData.images[0]}
                alt={`${packageData.name} tour image`}
                fill
                className="object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder.svg")} // Use placeholder if image fails
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {packageData.images.slice(1, 4).map((img, index) => (
                <div key={index} className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={img}
                    alt={`${packageData.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg")} // Use placeholder if image fails
                  />
                </div>
              ))}
            </div>

            {/* Tour Information */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-bold mb-4">Tour Details</h2>
              <p className="text-gray-600">{packageData.description}</p>
            </motion.div>
          </motion.div>

          {/* Sidebar (Filters and Booking) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{packageData.name}</h1>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{packageData.rating.toFixed(1)}</span>
                <span className="text-gray-500">({packageData.reviews} reviews)</span>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-red-600 font-bold">Special Offer</p>
              <p className="text-lg font-semibold">
                From THB {packageData.price.toLocaleString()} per person
              </p>
              <p className="text-sm text-gray-500">Price varies by group size</p>
            </div>

            {/* Date and Travelers */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Select Date and Travelers</h2>
              <input
                type="date"
                className="w-full p-2 border rounded-lg mb-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                value={travelers}
                min="1"
                onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                placeholder="Number of travelers"
              />
            </div>

            {/* Time of Tour */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Time of Tour</h2>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name="timeOfTour"
                  checked={timeOfTour === "morning"}
                  onChange={() => setTimeOfTour("morning")}
                />
                <span>Morning (8:00 to 12:00)</span>
              </label>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name="timeOfTour"
                  checked={timeOfTour === "afternoon"}
                  onChange={() => setTimeOfTour("afternoon")}
                />
                <span>Afternoon (13:00 to 15:00)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timeOfTour"
                  checked={timeOfTour === "allDay"}
                  onChange={() => setTimeOfTour("allDay")}
                />
                <span>All Day (8:00 to 15:00)</span>
              </label>
            </div>

            {/* Pickup Points */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Pickup Points</h2>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={pickupOption === "pickAndDrop"}
                  onChange={() => setPickupOption("pickAndDrop")}
                />
                <span>Pick and drop off</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={pickupOption === "split"}
                  onChange={() => setPickupOption("split")}
                />
                <span>Pick - Drop (Split)</span>
              </label>
              {pickupOption === "split" && (
                <>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg mt-2"
                    placeholder="Pick up location"
                    value={specials.pickupLocation || ""}
                    onChange={(e) => setSpecials({ ...specials, pickupLocation: e.target.value })}
                  />
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg mt-2"
                    placeholder="Drop off location"
                    value={specials.dropoffLocation || ""}
                    onChange={(e) => setSpecials({ ...specials, dropoffLocation: e.target.value })}
                  />
                </>
              )}
            </div>

            {/* Specials */}
            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">Specials</h2>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={specials.halal}
                  onChange={(e) => setSpecials({ ...specials, halal: e.target.checked })}
                />
                <span>Halal Food</span>
              </label>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={specials.english}
                  onChange={(e) => setSpecials({ ...specials, english: e.target.checked })}
                />
                <span>English-Speaking Guide</span>
              </label>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={specials.kids}
                  onChange={(e) => setSpecials({ ...specials, kids: e.target.checked })}
                />
                <span>Seats for Small Children</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={specials.private}
                  onChange={(e) => setSpecials({ ...specials, private: e.target.checked })}
                />
                <span>Private Tour</span>
              </label>
            </div>

            <button
              className="w-full bg-[#2A8470] text-white py-3 rounded-lg hover:bg-[#2A8470] transition-colors flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <span>Book This Tour</span>
              <span>THB {packageData.price.toLocaleString()}</span>
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default PackageDetail;