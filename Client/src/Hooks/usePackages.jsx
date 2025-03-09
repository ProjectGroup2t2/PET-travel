// usePackages.js
import { useState, useEffect } from "react";

export const usePackages = () => {
  // Filter states
  const [dateRange, setDateRange] = useState(""); // คาดหวังรูปแบบเช่น "2025-03-10"
  const [priceRange, setPriceRange] = useState(15000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [timeFilters, setTimeFilters] = useState({
    morning: false,
    afternoon: false,
    allDay: false,
  });
  const [specialFilters, setSpecialFilters] = useState({
    Halal: false,
    english: false,
    kids: false,
    private: false,
    pickup: false,
  });

  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages?populate=*`
        );
        const data = await response.json();

        const formattedData = data?.data?.map((item) => ({
          id: item.id,
          name: item.attributes?.title || "No Title",
          image: item.attributes?.images?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.images.data[0].attributes.url}`
            : "/placeholder.svg",
          description: item.attributes?.description || "No description available",
          rating: calculateAverageRating(item.attributes?.reviews?.data) || 0.0,
          reviews: item.attributes?.reviews?.data?.length || 0,
          capacity: {
            current: item.attributes?.capacity || 0,
            total: item.attributes?.capacity_max || 0,
          },
          duration: item.attributes?.duration || "N/A",
          price: item.attributes?.price || 0,
          timeOfTour: item.attributes?.timeOfTour || [],
          specials: item.attributes?.specials || [],
          startDate: item.attributes?.startDate || null, // เพิ่มฟิลด์วันที่
        })) || [];

        setPackages(formattedData);
        setFilteredPackages(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Helper function to calculate average rating from reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + (review.attributes?.rating || 0), 0);
    return totalRating / reviews.length;
  };

  // Apply filters
  useEffect(() => {
    if (packages.length === 0) return;

    let result = [...packages];

    // Filter by dateRange
    if (dateRange) {
      const filterDate = new Date(dateRange); // แปลง dateRange เป็น Date object
      result = result.filter((tour) => {
        if (!tour.startDate) return false; // ถ้าไม่มีวันที่ในทัวร์ ข้ามไป
        const tourDate = new Date(tour.startDate);
        // เปรียบเทียบเฉพาะวันที่ (ไม่รวมเวลา)
        return (
          tourDate.getFullYear() === filterDate.getFullYear() &&
          tourDate.getMonth() === filterDate.getMonth() &&
          tourDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Filter by price
    result = result.filter((tour) => tour.price <= priceRange);

    // Filter by rating
    if (ratingFilter > 0) {
      result = result.filter((tour) => tour.rating >= ratingFilter);
    }

    // Filter by time
    const activeTimeFilters = Object.entries(timeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);
    if (activeTimeFilters.length > 0) {
      result = result.filter((tour) =>
        tour.timeOfTour.some((time) => activeTimeFilters.includes(time))
      );
    }

    // Filter by specials
    const activeSpecialFilters = Object.entries(specialFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);
    if (activeSpecialFilters.length > 0) {
      result = result.filter((tour) =>
        activeSpecialFilters.every((special) => tour.specials.includes(special))
      );
    }

    setFilteredPackages(result);
  }, [packages, dateRange, priceRange, ratingFilter, timeFilters, specialFilters]);

  const handleTimeFilterChange = (filter) => {
    setTimeFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handleSpecialFilterChange = (filter) => {
    setSpecialFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return {
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
  };
};