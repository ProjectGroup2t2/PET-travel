"use client"

import { AuthContext } from "@/context/Auth.context"
import { useRouter } from "next/navigation"
import { useState, useContext, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { AdminHeader } from "@/components/ui/admin/header"

export default function PackageDetail() {
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

  const { id } = useParams() // ดึง id จาก URL
  const [tour, setTour] = useState(null)
  const [isConfirmed, setIsConfirmed] = useState(false) // สถานะคอนเฟิร์ม
  const [customers, setCustomers] = useState([
    { id: 1, name: "Yim Yim", email: "example@gmail.com", booking: "Paid", unit: "", status: "" },
    { id: 2, name: "Imy Imy", email: "example@gmail.com", booking: "Unpaid", unit: "", status: "" },
    { id: 3, name: "Myi Myi", email: "example@gmail.com", booking: "Unpaid", unit: "", status: "" },
    { id: 4, name: "Yim Yim", email: "example@gmail.com", booking: "Unpaid", unit: "", status: "" },
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    const tourData = {
      1: {
        image: "/1.jpg",
        title: "เมืองเก่าภูเก็ต",
        customerName: "สมชาย ใจดี",
        email: "somchai@example.com",
        phone: "081-234-5678",
        paymentStatus: "Paid", // Paid หรือ Unpaid
        price: "THB X,XXX",
      },
      2: {
        image: "/login-pic.png",
        title: "เชียงใหม่",
        customerName: "นางสาวพิมพ์ใจ สายลม",
        email: "pimjai@example.com",
        phone: "090-123-4567",
        paymentStatus: "Unpaid",
        price: "THB Y,YYY",
      },
    }

    setTour(tourData[id])
  }, [id])

  if (!tour) return <p>Loading...</p>

  return (
    <div className="flex-1">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Packages Management" />
        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-[#2A8470] mb-4">{tour.title}</h1>

          {/* Tour Image */}
          <div className="w-full h-[250px] overflow-hidden rounded-lg mb-8">
            <Image
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              width={1000}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Tour Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#2A8470]">กำหนดการเดินทาง</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm min-h-[100px]">
                <div className="flex items-center gap-2">
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>วันที่ 1	12.00-14.00	รับที่สนามบิน, ไปที่พัก (โรงแรมฮอลิเดย์ อินน์)</li>
                      <li>วันที่ 1	15.00-18.00	เที่ยวหาดป่าตอง</li>
                      <li>วันที่ 2	08.00-17.00	ทริปเกาะพีพี</li>
                      <li>วันที่ 3	09.00-12.00	พิพิธภัณฑ์เหมืองแร่</li>
                      <li>วันที่ 3	13.00-16.00	วัดฉลอง</li>
                      <li>วันที่ 4	09.00-11.00	ช้อปปิ้ง, ส่งสนามบิน</li>
                    </ul>
                  </div>
                </div>
                {/* Travel schedule content would go here */}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#2A8470]">สถานที่ท่องเที่ยว</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm min-h-[100px]">
                <div className="flex items-center gap-2">
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>หาดป่าตอง</li>
                      <li>เกาะพีพี</li>
                      <li>พิพิธภัณฑ์เหมืองแร่</li>
                      <li>วัดฉลอง</li>
                    </ul>
                  </div>
                </div>
                {/* Tourist attractions content would go here */}
              </div>
            </div>
          </div>

          {/* Customer Booking Information */}
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#2A8470] mb-4">ข้อมูลการจองของลูกค้า</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Full name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Booking</th>
                    <th className="border p-2 text-left">Unit</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedCustomer(customer)
                        setShowModal(true)
                      }}
                    >
                      <td className="border p-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            👤
                          </div>
                          {customer.name}
                        </div>
                      </td>
                      <td className="border p-2">{customer.email}</td>
                      <td className="border p-2">
                        <span className={customer.booking === "Paid" ? "text-green-500" : "text-red-500"}>
                          {customer.booking}
                        </span>
                      </td>
                      <td className="border p-2">{customer.unit || "All day"}</td>
                      <td className="border p-2">{customer.unit || "Successful"}</td>
                      <td className="border p-2">
                        <button
                          className="bg-[#2A8470] text-white px-2 py-2 rounded-lg hover:bg-[#1f6354] transition"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCustomer(customer)
                            setShowModal(true)
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsConfirmed(true)}
              className="bg-[#2A8470] text-white px-8 py-2 rounded-lg hover:bg-[#1f6354] transition"
            >
              SAVE
            </button>
          </div>
        </div>
        {showModal && selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <h2 className="text-4xl font-bold mb-8">Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-1/2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">👤</span>
                      <span className="text-xl text-gray-500">Travelers</span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <span className="text-xl">2 คน</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-1/2">
                    <span className="text-xl font-bold">Time of Tour</span>
                  </div>
                  <div className="w-1/2">
                    <span className="text-xl text-gray-500">All day</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-1/2">
                    <span className="text-xl font-bold">Pickup points</span>
                  </div>
                  <div className="w-1/2">
                    <span className="text-xl">Pick and drop off</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-1/2">
                    <span className="text-xl text-gray-500">ระบุสถานที่ :</span>
                  </div>
                  <div className="w-1/2">
                    <span className="text-xl text-gray-500">โรงแรมยิม</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-1/2">
                    <span className="text-xl font-bold">Specials :</span>
                  </div>
                  <div className="w-1/2">
                    <span className="text-xl text-gray-500">อาหารฮาลาล</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
