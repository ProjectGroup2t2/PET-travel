"use client";

import { useState, useContext, useEffect } from "react";
import { AdminHeader } from "@/components/ui/admin/header";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/Auth.context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, X, Upload, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function EditTourForm({ initialTour, error: initialError, tourId }) {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const [tour, setTour] = useState({
    ...initialTour,
    isAvailable: initialTour.isAvailable ?? "Not Available",
  });
  const [images, setImages] = useState(initialTour.images || []);
  const [imagePreviews, setImagePreviews] = useState(initialTour.images?.map((img) => img.url) || []);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(initialError);

  // Sync state กับ initialTour เมื่อ props เปลี่ยน
  useEffect(() => {
    setTour({
      ...initialTour,
      isAvailable: initialTour.isAvailable ?? "Not Available",
    });
    setImages(initialTour.images || []);
    setImagePreviews(initialTour.images?.map((img) => img.url) || []);
  }, [initialTour]);

  const handleChange = (name, value) => {
    setTour((prev) => {
      const newTour = { ...prev, [name]: value };
      console.log("Updated tour:", newTour);
      return newTour;
    });
  };

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
    if (imagePreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify({
        title: tour.title || "",
        price: parseFloat(tour.price) || 0,
        duration: tour.duration || "",
        capacity_max: parseInt(tour.capacity_max) || 0,
        capacity: parseInt(tour.capacity) || 0,
        description: tour.description
          ? [{ type: "paragraph", children: [{ type: "text", text: tour.description }] }]
          : null,
        isAvailable: tour.isAvailable,
      }));

      images.forEach((image) => {
        if (image instanceof File) {
          formData.append(`files.images`, image);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages/${tourId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: state.user?.token ? `Bearer ${state.user.token}` : "",
        },
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(`ไม่สามารถอัพเดทข้อมูลทัวร์ได้: ${data.error?.message || "Unknown error"}`);
      }

      toast({
        title: "Success!",
        description: "Tour has been updated successfully.",
        variant: "success",
      });
      router.push("/admin/tours");
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to update tour: ${err.message}`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
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
          Back to Tour List
        </button>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
                      disabled={submitting}
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
                    disabled={submitting}
                  />
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm text-center">Upload images</p>
                  <p className="text-xs text-gray-400 text-center mt-1">Click to browse</p>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Name
                </label>
                <Input
                  name="title"
                  value={tour.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter tour name"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (THB)
                </label>
                <Input
                  name="price"
                  type="number"
                  value={tour.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="Enter price"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <Input
                  name="duration"
                  value={tour.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="Enter duration (e.g., 2 วัน 1 คืน)"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Capacity
                </label>
                <Input
                  name="capacity_max"
                  type="number"
                  value={tour.capacity_max}
                  onChange={(e) => handleChange("capacity_max", e.target.value)}
                  placeholder="Enter max capacity"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Capacity
                </label>
                <Input
                  name="capacity"
                  type="number"
                  value={tour.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  placeholder="Enter current capacity"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={tour.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter tour description"
                  rows={4}
                  className="block w-full rounded-md border border-gray-300 p-2"
                  disabled={submitting}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={tour.isAvailable === "Available"}
                  onCheckedChange={(checked) =>
                    handleChange("isAvailable", checked ? "Available" : "Not Available")
                  }
                  disabled={submitting}
                />
                <label className="text-sm font-medium text-gray-700">
                  Open for Sale
                </label>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#2A8470] hover:bg-[#226A5A]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    บันทึกการเปลี่ยนแปลง
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}