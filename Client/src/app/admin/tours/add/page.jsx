"use client"

import { AuthContext } from "@/context/Auth.context"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import { AdminHeader } from "@/components/ui/admin/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function AddTourPage() {
  const { state } = useContext(AuthContext)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tourData, setTourData] = useState({
    tourname: "",
    price: "",
    description: "",
    duration: "",
    capacity: "",
    capacitymax: "",
  })

  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || []
      setIsAdmin(roles.includes("admin"))
      if (!roles.includes("admin")) {
        router.push("/")
      }
    } else if (!state.isLoggedIn) {
      router.push("/login")
    }
  }, [state.isLoggedIn, state.user, router])

  if (!state.isLoggedIn || !isAdmin) {
    return null
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)

    if (files.length > 0) {
      // Add new files to existing images
      setImages((prevImages) => [...prevImages, ...files])

      // Create previews for new files
      const newPreviews = files.map((file) => URL.createObjectURL(file))
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
    }
  }

  const removeImage = (index) => {
    // Remove image and preview at the specified index
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index])
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))
  }

  const uploadImagesToStrapi = async () => {
    if (images.length === 0) return []

    const uploadPromises = images.map(async (image) => {
      const formData = new FormData()
      formData.append("files", image)

      try {
        // Use the token from AuthContext
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: state.user?.token ? `Bearer ${state.user.token}` : "",
          },
        })

        if (!response.ok) {
          console.error("Upload response:", await response.text())
          throw new Error(`Upload failed with status: ${response.status}`)
        }

        const data = await response.json()
        return data[0].id // Return the ID of the uploaded image
      } catch (error) {
        console.error("Error uploading image:", error)
        throw error
      }
    })

    return Promise.all(uploadPromises)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Upload images to Strapi
      const imageIds = await uploadImagesToStrapi()

      // 2. Create tour with image references
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.user?.token ? `Bearer ${state.user.token}` : "",
        },
        body: JSON.stringify({
          data: {
            ...tourData,
            price: Number.parseFloat(tourData.price),
            capacity: Number.parseInt(tourData.capacity, 10),
            capacitymax: Number.parseInt(tourData.capacitymax, 10),
            images: imageIds.length > 0 ? { connect: imageIds } : undefined,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Create tour error:", errorText)
        throw new Error(`Failed to create tour: ${response.status}`)
      }

      // Success! Redirect to tours page
      toast({
        title: "Success!",
        description: "Tour has been created successfully.",
        variant: "success",
      })
      router.push("/admin/tours")
    } catch (error) {
      console.error("Error creating tour:", error)
      toast({
        title: "Error",
        description: "Failed to create tour. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2A8470]">Add Tours</h2>
          <Button onClick={handleSubmit} className="bg-[#2A8470] hover:bg-[#236657]" disabled={isSubmitting}>
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

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Multiple Image Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Tour Images</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {/* Display image previews */}
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden border h-40">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Add image button */}
              <label className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-4 h-40 cursor-pointer hover:border-[#2A8470] transition-colors">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm text-center">Upload images</p>
                <p className="text-xs text-gray-400 text-center mt-1">Click to browse</p>
              </label>
            </div>
          </div>

          {/* ฟอร์มกรอกข้อมูลทัวร์ */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* ชื่อทัวร์ */}
              <div>
                <label className="block text-sm font-medium mb-2">Tour Name</label>
                <Input
                  value={tourData.tourname}
                  onChange={(e) => setTourData((prev) => ({ ...prev, tourname: e.target.value }))}
                  placeholder="Enter tour name"
                />
              </div>

              {/* ราคา */}
              <div>
                <label className="block text-sm font-medium mb-2">Price (THB)</label>
                <Input
                  value={tourData.price}
                  onChange={(e) => setTourData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                  type="number"
                />
              </div>

              {/* ระยะเวลา */}
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Input
                  value={tourData.duration}
                  onChange={(e) => setTourData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="Enter Duration (e.g., 3 วัน 2 คืน)"
                />
              </div>

              {/* จำนวนคนในแพ็คเกจ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Capacity (Current)</label>
                  <Input
                    type="number"
                    value={tourData.capacity}
                    onChange={(e) => setTourData((prev) => ({ ...prev, capacity: e.target.value }))}
                    placeholder="Current capacity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capacity (Maximum)</label>
                  <Input
                    type="number"
                    value={tourData.capacitymax}
                    onChange={(e) => setTourData((prev) => ({ ...prev, capacitymax: e.target.value }))}
                    placeholder="Maximum capacity"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="block w-full rounded-md border border-gray-300 p-2"
                  value={tourData.description}
                  onChange={(e) => setTourData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter tour description"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

