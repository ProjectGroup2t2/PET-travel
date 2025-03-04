"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddTourPage() {
  const [tourData, setTourData] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    capacity_max: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // ข้อมูลหลักใน key "data"
    const dataPayload = {
      title: tourData.title || "",
      price: parseFloat(tourData.price) || 0,
      duration: tourData.duration || "",
      capacity_max: parseInt(tourData.capacity_max) || 0,
      capacity: parseInt(tourData.capacity) || 0,
      description: tourData.description
        ? [
            {
              type: "paragraph",
              children: [{ type: "text", text: tourData.description }],
            },
          ]
        : null,
    };

    // Debug: ตรวจสอบ payload
    console.log("Data Payload:", JSON.stringify({ data: dataPayload }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQxMTEyMjU1LCJleHAiOjE3NDM3MDQyNTV9.ngw8OX3ObmTcmIqJhAAXat2uc88vGabKGBio4itlx00`,
          },
          body: JSON.stringify({ data: dataPayload }),
        }
      );

      const responseData = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.error?.message ||
            `Failed with status ${response.status}`
        );
      }

      setSuccess(true);
      setTourData({
        title: "",
        price: "",
        description: "",
        duration: "",
        capacity_max: "",
        capacity: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2A8470]">Add Tours</h2>
          <Button
            onClick={handleSubmit}
            className="bg-[#2A8470] hover:bg-[#236657]"
            disabled={loading}
          >
            {loading ? "กำลังบันทึก..." : "SAVE"}
          </Button>
        </div>

        {success && (
          <p className="text-green-600 mb-4">เพิ่มทัวร์สำเร็จ!</p>
        )}
        {error && (
          <p className="text-red-600 mb-4">เกิดข้อผิดพลาด: {error}</p>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tour Name</label>
                <Input
                  value={tourData.title}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter tour name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (THB)</label>
                <Input
                  value={tourData.price}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Enter price"
                  type="number"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Input
                  value={tourData.duration}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, duration: e.target.value }))
                  }
                  placeholder="Enter duration (e.g., 2 วัน 1 คืน)"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Capacity</label>
                <Input
                  type="number"
                  value={tourData.capacity_max}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, capacity_max: e.target.value }))
                  }
                  placeholder="Enter max capacity"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Capacity</label>
                <Input
                  type="number"
                  value={tourData.capacity}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, capacity: e.target.value }))
                  }
                  placeholder="Enter current capacity"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="block w-full rounded-md border border-gray-300 p-2"
                  value={tourData.description}
                  onChange={(e) =>
                    setTourData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Enter tour description"
                  rows={4}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}