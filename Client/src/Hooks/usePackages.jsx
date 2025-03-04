// usePackages.js
import { useState, useEffect } from "react";
import conf from "../../conf";

export const usePackages = () => {
  // Filter states
  const [dateRange, setDateRange] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [timeFilters, setTimeFilters] = useState({
    morning: false,
    afternoon: false,
    allDay: false,
  });
  const [specialFilters, setSpecialFilters] = useState({
    halal: false,
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
          `${process.env.NEXT_PUBLIC_STRAPI_URL || `${conf.apiPrefix}`}/api/packages?populate=*`
        );
        const data = await response.json();

        const formattedData = data?.data?.map((item) => ({
          id: item.id,
          name: item?.title || "No Title",
          image: item?.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || `${conf.apiPrefix}`}${item.image[0].url}`
            : "/placeholder.svg",
          description: item?.description || "No description available",
          rating: 4.0,
          reviews: 100,
          capacity: {
            current: item?.capacity || 0,
            total: item?.capacity_max || 0,
          },
          duration: item?.duration || "N/A",
          price: item?.price || 0,
          timeOfTour: item?.timeOfTour,
          specials: item?.specials,
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

  // Apply filters
  useEffect(() => {
    if (packages.length === 0) return;

    let result = [...packages];

    result = result.filter((tour) => tour.price <= priceRange);

    if (ratingFilter > 0) {
      result = result.filter((tour) => tour.rating >= ratingFilter);
    }

    const activeTimeFilters = Object.entries(timeFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    if (activeTimeFilters.length > 0) {
      result = result.filter((tour) =>
        tour.timeOfTour.some((time) => activeTimeFilters.includes(time))
      );
    }

    const activeSpecialFilters = Object.entries(specialFilters)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key);

    if (activeSpecialFilters.length > 0) {
      result = result.filter((tour) =>
        activeSpecialFilters.every((special) => tour.specials.includes(special))
      );
    }

    setFilteredPackages(result);
  }, [packages, priceRange, ratingFilter, timeFilters, specialFilters]);

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