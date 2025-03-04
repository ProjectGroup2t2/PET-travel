// pages/admin/tours/edit/EditTourForm.jsx
"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Save, ArrowLeft } from "lucide-react";

export default function EditTourForm({ initialTour, error: initialError, tourId }) {
  const router = useRouter();
  const [tour, setTour] = useState(initialTour);
  const [error, setError] = useState(initialError);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages/${tourId}`;
      console.log("Updating at URL:", url);
      console.log("Request body:", {
        data: {
          title: tour.name,
          price: parseFloat(tour.price),
        },
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            title: tour.name,
            price: parseFloat(tour.price),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `ไม่สามารถอัพเดทข้อมูลทัวร์ได้: ${response.status} - ${errorData.error?.message || "Unknown error"}`
        );
      }

      router.push("/admin/tours");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
      console.error("Error updating tour:", err);
    }
  };

  if (error) {
    return (
      <div className="flex-1">
        <AdminHeader title="Edit Tour" />
        <div className="p-8">
          <p className="text-xl text-red-500">เกิดข้อผิดพลาด: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Edit Tour" />
      <div className="p-8">
        <button
          onClick={() => router.push("/admin/tours")}
          className="flex items-center text-gray-600 hover:text-[#2A8470] mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          กลับไปหน้ารายการทัวร์
        </button>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <Image
                src={tour.image}
                alt={tour.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-gray-500">
                การเปลี่ยนรูปภาพต้องอัพโหลดผ่าน Strapi admin panel
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อทัวร์
              </label>
              <input
                type="text"
                name="name"
                value={tour.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#2A8470] focus:border-[#2A8470]"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ราคา (THB)
              </label>
              <input
                type="number"
                name="price"
                value={tour.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#2A8470] focus:border-[#2A8470]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#2A8470] text-white p-3 rounded-lg hover:bg-[#226A5A] transition-colors flex items-center justify-center disabled:bg-gray-400"
            >
              <Save className="h-5 w-5 mr-2" />
              {submitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}