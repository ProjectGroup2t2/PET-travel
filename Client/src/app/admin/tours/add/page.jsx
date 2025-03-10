"use client";

import { AuthContext } from "@/context/Auth.context";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function AddTourPage() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const [tourData, setTourData] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    capacity_max: "",
    capacity: "",
    isAvailable: "Not Available", // เริ่มต้นเป็น "Not Available" เหมือนใน EditTourForm
  });
  
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State สำหรับควบคุมการแสดง popup

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || [];
      setIsAdmin(roles.includes("admin"));
      if (!roles.includes("admin")) {
        router.push("/");
      }
    } else if (!state.isLoggedIn) {
      router.push("/login");
    }
  }, [state.isLoggedIn, state.user, router]);

  if (!state.isLoggedIn || !isAdmin) {
    return null;
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify({
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
        isAvailable: tourData.isAvailable, // ส่งค่าเป็น "Available" หรือ "Not Available"
      }));

      images.forEach((image, index) => {
        formData.append(`files.images`, image); 
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: state.user?.token ? `Bearer ${state.user.token}` : "",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      setSuccess(true);
      setShowSuccessPopup(true); // แสดง popup เมื่อสำเร็จ
      toast({
        title: "Success!",
        description: "Tour has been created successfully.",
        variant: "success",
      });
      
      // รีเซ็ตฟอร์มหลังจาก 3 วินาที (หรือเมื่อปิด popup)
      setTimeout(() => {
        setTourData({
          title: "",
          price: "",
          description: "",
          duration: "",
          capacity_max: "",
          capacity: "",
          isAvailable: "Not Available", // รีเซ็ตเป็น "Not Available"
        });
        setImages([]);
        setImagePreviews([]);
        setShowSuccessPopup(false); // ปิด popup หลังจากรีเซ็ต
      }, 3000);

    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to create tour: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchChange = (checked) => {
    setTourData((prev) => ({
      ...prev,
      isAvailable: checked ? "Available" : "Not Available",
    }));
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    // รีเซ็ตฟอร์มเมื่อปิด popup
    setTourData({
      title: "",
      price: "",
      description: "",
      duration: "",
      capacity_max: "",
      capacity: "",
      isAvailable: "Not Available",
    });
    setImages([]);
    setImagePreviews([]);
  };

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />
      <div className="px-8 pt-6">
        <button
          onClick={() => router.push("/admin/tours")}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-[#2A8470]"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-medium">Back to Tour List</span>
        </button>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-semibold text-[#2A8470] mb-6">Add Tours</h2>

        {error && (
          <p className="text-red-600 mb-4">เกิดข้อผิดพลาด: {error}</p>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Tour Images</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border h-40">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-4 h-40 cursor-pointer hover:border-[#2A8470] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                  disabled={isSubmitting}
                />
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm text-center">Upload images</p>
                <p className="text-xs text-gray-400 text-center mt-1">Click to browse</p>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tour Name</label>
                <Input
                  value={tourData.title}
                  onChange={(e) => setTourData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter tour name"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (THB)</label>
                <Input
                  value={tourData.price}
                  onChange={(e) => setTourData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                  type="number"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Input
                  value={tourData.duration}
                  onChange={(e) => setTourData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="Enter duration (e.g., 2 วัน 1 คืน)"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Capacity</label>
                <Input
                  type="number"
                  value={tourData.capacity_max}
                  onChange={(e) => setTourData((prev) => ({ ...prev, capacity_max: e.target.value }))}
                  placeholder="Enter max capacity"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Capacity</label>
                <Input
                  type="number"
                  value={tourData.capacity}
                  onChange={(e) => setTourData((prev) => ({ ...prev, capacity: e.target.value }))}
                  placeholder="Enter current capacity"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="block w-full rounded-md border border-gray-300 p-2"
                  value={tourData.description}
                  onChange={(e) => setTourData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter tour description"
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>

              {/* ปรับปรุง Switch ให้เหมือนใน EditTourForm */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={tourData.isAvailable === "Available"}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSubmitting}
                />
                <label className="text-sm font-medium text-gray-700">
                  Open for Sale
                </label>
              </div>
            </div>
          </div>

          {/* ปุ่ม SAVE ด้านล่าง */}
          <div className="mt-8">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#2A8470] hover:bg-[#236657]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "SAVE"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Popup สำหรับแจ้งเตือนสำเร็จ */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-green-600">สำเร็จ!</h3>
            <p className="mb-6">เพิ่มทัวร์สำเร็จ!</p>
            <div className="flex justify-end">
              <Button
                onClick={handleClosePopup}
                className="bg-[#2A8470] hover:bg-[#236657] text-white"
              >
                ปิด
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}