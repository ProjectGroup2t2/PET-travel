"use client"

import { AuthContext } from "@/context/Auth.context"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import { AdminHeader } from "@/components/ui/admin/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SailboatIcon as Sail } from "lucide-react"

export default function AddTourPage() {
  const { state } = useContext(AuthContext) 
  const router = useRouter()
    
  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || []
      if (!roles.includes("admin")) {
        router.push("/") 
      }
    } else if (!state.isLoggedIn) {
      router.push("/login") 
    }
  }, [state.isLoggedIn, state.user, router])

  if (!state.isLoggedIn || !state.user || !state.user.roles?.includes("admin")) {
    return null 
  }

  const [tourData, setTourData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    duration: "",
    capacity: "",
  })

  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setTourData((prev) => ({ ...prev, image: file }))
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Tour Data:", tourData)
  }

  return (
    <div className="flex-1">
      <AdminHeader title="Tours Management" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2A8470]">Add Tours</h2>
          <Button onClick={handleSubmit} className="bg-[#2A8470] hover:bg-[#236657]">
            SAVE
          </Button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* ส่วนอัปโหลดรูปภาพ */}
          <div className="mb-8">
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="mx-auto max-h-[200px] rounded-lg"
                />
              ) : (
                <div className="space-y-4">
                  <Sail className="w-16 h-16 mx-auto text-gray-400" />
                  <p className="text-gray-500">Upload your photo</p>
                  <div className="text-2xl text-gray-400">+</div>
                </div>
              )}
            </div>
          </div>

          {/* ฟอร์มกรอกข้อมูลทัวร์ */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* ชื่อทัวร์ */}
              <div>
                <label className="block text-sm font-medium mb-2">Tour Name</label>
                <Input
                  value={tourData.name}
                  onChange={(e) => setTourData((prev) => ({ ...prev, name: e.target.value }))}
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
                  placeholder="Enter Date"
                />
              </div>

              {/* จำนวนคนในแพ็คเกจ */}
              <div>
                <label className="block text-sm font-medium mb-2">Capacity</label>
                <Input
                  type="number"
                  value={tourData.capacity}
                  onChange={(e) => setTourData((prev) => ({ ...prev, capacity: e.target.value }))}
                  placeholder="Enter Capacity"
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
