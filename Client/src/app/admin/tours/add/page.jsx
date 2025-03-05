"use client";

import { AuthContext } from "@/context/Auth.context";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  });
  
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      toast({
        title: "Success!",
        description: "Tour has been created successfully.",
        variant: "success",
      });
      
      // รีเซ็ตฟอร์ม
      setTourData({
        title: "",
        price: "",
        description: "",
        duration: "",
        capacity_max: "",
        capacity: "",
      });
      setImages([]);
      setImagePreviews([]);

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

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2A8470]">Add Tours</h2>
          <Button
            onClick={handleSubmit}
            className="bg-[#2A8470] hover:bg-[#236657]"
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

        {success && (
          <p className="text-green-600 mb-4">เพิ่มทัวร์สำเร็จ!</p>
        )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}