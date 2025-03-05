"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Calendar, Plus, Pencil, Users, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages?populate=*`
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลทัวร์ได้");
        }
        const data = await response.json();

        const formattedTours = data.data.map((tour) => ({
          id: tour.id,
          name: tour.attributes.title || "ไม่มีชื่อ",
          price: `THB ${tour.attributes.price?.toLocaleString() || "0"}`,
          duration: tour.attributes.duration || "ไม่ระบุ",
          capacityMax: tour.attributes.capacity_max || 0,
          capacity: tour.attributes.capacity || 0,
          image: tour.attributes.images?.data?.[0]?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${tour.attributes.images.data[0].attributes.url}`
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

  const handleDeleteClick = (tour) => {
    setTourToDelete(tour);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tourToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages/${tourToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("ไม่สามารถลบทัวร์ได้");
      }

      setTours(tours.filter((tour) => tour.id !== tourToDelete.id));
      setShowDeletePopup(false);
      setTourToDelete(null);
    } catch (err) {
      setShowDeletePopup(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setTourToDelete(null);
  };

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
        <h2 className="text-2xl font-semibold text-[#2A8470] mb-6">Tours List</h2>

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
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{tour.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {tour.capacity}/{tour.capacityMax}
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{tour.duration}</span>
                </div>

                <p className="text-blue-600 font-medium leading-relaxed">
                  from {tour.price}
                </p>
              </div>

              {/* ปุ่ม Edit และ Delete */}
              <div className="absolute top-2 right-2 flex space-x-2">
                <Link href={`/admin/tours/edit/${tour.id}`}>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(tour)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
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

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">ยืนยันการลบ</h3>
            <p className="mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการลบทัวร์ "{tourToDelete?.name}" 
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}