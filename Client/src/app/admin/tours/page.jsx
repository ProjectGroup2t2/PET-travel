"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Plus, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages?populate=*`
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลทัวร์ได้");
        }
        const data = await response.json();

        const formattedTours = data.data.map((tour) => ({
          id: tour.id,
          name: tour.title || "ไม่มีชื่อ",
          price: `THB ${tour.price?.toLocaleString() || "0"}`,
          image: tour.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${tour.image[0].url}`
            : "/placeholder.svg",
        }));

        setTours(formattedTours);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex-1">
        <AdminHeader title="Tours Management" />
        <div className="p-8">
          <p className="text-xl text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        <AdminHeader title="Tours Management" />
        <div className="p-8">
          <p className="text-xl text-red-500">เกิดข้อผิดพลาด: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-[#2A8470] mb-6">Add Tour</h2>

        {/* Grid of Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tour Cards */}
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow relative"
            >
              <Image
                src={tour.image}
                alt={tour.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.name}</h3>
                <p className="text-blue-600 font-medium">{tour.price}</p>
              </div>
              {/* Edit Button */}
              <Link href={`/admin/tours/edit/${tour.id}`}>
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
              </Link>
            </div>
          ))}

          {/* Add Tour Card */}
          <Link href="/admin/tours/add">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:border-[#2A8470] transition-colors cursor-pointer min-h-[280px]">
              <Plus className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-500">Add your tour</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}