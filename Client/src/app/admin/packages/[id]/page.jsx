"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { AdminHeader } from "@/components/ui/admin/header"

export default function PackageDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [packageData, setPackageData] = useState(null)
  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null) // สำหรับแจ้งเตือน

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const token = sessionStorage.getItem('auth.jwt')
        if (!token) throw new Error('No authentication token found')

        // Fetch Package Details
        const packageResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/packages/${id}?populate=*`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        })
        if (!packageResponse.ok) throw new Error('Failed to fetch package details')
        const packageResult = await packageResponse.json()

        // Fetch Related Payments with explicit populate for payment_slip
        const paymentsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments?filters[package][id]=${id}&populate[users_permissions_user][populate]=*&populate[payment_slip][populate]=*`,
          {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
          }
        )
        if (!paymentsResponse.ok) throw new Error('Failed to fetch payments')
        const paymentsResult = await paymentsResponse.json()

        console.log("Payments data:", paymentsResult.data)

        setPackageData(packageResult.data)
        const transformedCustomers = paymentsResult.data ? paymentsResult.data.map(payment => {
          console.log("Payment slip for payment", payment.id, ":", payment.attributes.payment_slip)
          return {
            id: payment.id,
            name: payment.attributes.users_permissions_user?.data?.attributes?.name || 'N/A',
            email: payment.attributes.users_permissions_user?.data?.attributes?.email || 'N/A',
            phone: payment.attributes.users_permissions_user?.data?.attributes?.phone || 'N/A',
            booking: payment.attributes.payment_status || 'Pending',
            paymentAmount: payment.attributes.amount || 0,
            paymentDate: payment.attributes.payment_date || null,
            slip: payment.attributes.payment_slip?.data?.attributes?.url || null
          }
        }) : []
        setCustomers(transformedCustomers)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching package details:", error)
        setError(error)
        setIsLoading(false)
      }
    }

    if (id) fetchPackageDetails()
  }, [id])

  const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
      const token = sessionStorage.getItem('auth.jwt')
      if (!token) throw new Error('No authentication token found')

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            payment_status: newStatus
          }
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Failed to update payment status')
      }

      // อัปเดต state ในตาราง
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === paymentId ? { ...customer, booking: newStatus } : customer
        )
      )

      // อัปเดต selectedCustomer ใน Modal ถ้ามีการเปลี่ยนแปลง
      if (selectedCustomer && selectedCustomer.id === paymentId) {
        setSelectedCustomer(prev => ({ ...prev, booking: newStatus }))
      }

      // แจ้งเตือนลูกค้า
      setNotification(`Payment status updated to ${newStatus} for payment ID ${paymentId}`)
      setTimeout(() => setNotification(null), 3000) // ลบการแจ้งเตือนหลัง 3 วินาที

      // ดึงข้อมูลใหม่เพื่อรีเฟรชสลิป (ถ้ามีการเปลี่ยนแปลงที่อาจกระทบสลิป)
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments/${paymentId}?populate[payment_slip][populate]=*`,
        {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        }
      )
      if (paymentResponse.ok) {
        const paymentResult = await paymentResponse.json()
        const updatedPayment = paymentResult.data
        const updatedSlip = updatedPayment.attributes.payment_slip?.data?.attributes?.url || null
        setCustomers(prevCustomers =>
          prevCustomers.map(customer =>
            customer.id === paymentId ? { ...customer, slip: updatedSlip } : customer
          )
        )
        if (selectedCustomer && selectedCustomer.id === paymentId) {
          setSelectedCustomer(prev => ({ ...prev, slip: updatedSlip }))
        }
      }
    } catch (error) {
      console.error("Error updating payment status:", error.message)
      alert(`Failed to update payment status: ${error.message}`)
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading package details: {error.message}</p>
  if (!packageData) return <p>Package not found</p>

  const { title, price, duration, description, images, capacity, capacity_max } = packageData.attributes

  return (
    <div className="flex-1">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <AdminHeader title="Packages Management" />
        
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-[#2A8470] mb-4">{title}</h1>

          {/* Package Image */}
          <div className="w-full h-[250px] overflow-hidden rounded-lg mb-8">
            <Image
              src={images.data ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${images.data[0].attributes.url}` : "/placeholder.svg"}
              alt={title}
              width={1000}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Package Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#2A8470]">Package Description</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm max-h-[200px] overflow-y-auto border border-gray-200">
                {description?.[0]?.children?.[0]?.text || "No description available"}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-[#2A8470]">Package Information</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm min-h-[100px]">
                <ul className="space-y-2">
                  <li><strong>Duration:</strong> {duration}</li>
                  <li><strong>Price:</strong> THB {price}</li>
                  <li><strong>Capacity:</strong> {capacity} - {capacity_max} persons</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Booking Information */}
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-[#2A8470] mb-4">Customer Information</h2>
            <div className="overflow-x-auto">
              {customers.length > 0 ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Email</th>
                      <th className="border p-2 text-left">Payment Status</th>
                      <th className="border p-2 text-left">Amount</th>
                      <th className="border p-2 text-left">Payment Date</th>
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
                          <select
                            value={customer.booking}
                            onChange={(e) => updatePaymentStatus(customer.id, e.target.value)}
                            className={`border rounded p-1 font-medium ${
                              customer.booking === "Approved"
                                ? "text-green-500 border-green-500"
                                : customer.booking === "Pending"
                                ? "text-yellow-500 border-yellow-500"
                                : "text-red-500 border-red-500"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Pending" className="text-yellow-500">Pending</option>
                            <option value="Approved" className="text-green-500">Approved</option>
                            <option value="Rejected" className="text-red-500">Rejected</option>
                          </select>
                        </td>
                        <td className="border p-2">THB {customer.paymentAmount}</td>
                        <td className="border p-2">
                          {customer.paymentDate 
                            ? new Date(customer.paymentDate).toLocaleDateString() 
                            : 'N/A'}
                        </td>
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
              ) : (
                <p className="text-gray-500 text-center">No bookings found for this package</p>
              )}
            </div>
          </div>

          {/* Customer Details Modal */}
          {showModal && selectedCustomer && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">Customer Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-5">
                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <span className="text-lg font-semibold text-gray-700">Name</span>
                    </div>
                    <div>
                      <span className="text-lg text-gray-600">{selectedCustomer.name}</span>
                    </div>

                    <div>
                      <span className="text-lg font-semibold text-gray-700">Email</span>
                    </div>
                    <div>
                      <span className="text-lg text-gray-600">{selectedCustomer.email}</span>
                    </div>

                    <div>
                      <span className="text-lg font-semibold text-gray-700">Phone</span>
                    </div>
                    <div>
                      <span className="text-lg text-gray-600">{selectedCustomer.phone}</span>
                    </div>

                    <div>
                      <span className="text-lg font-semibold text-gray-700">Payment Status</span>
                    </div>
                    <div>
                      <span
                        className={`text-lg font-medium ${
                          selectedCustomer.booking === "Approved"
                            ? "text-green-500"
                            : selectedCustomer.booking === "Pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {selectedCustomer.booking}
                      </span>
                    </div>
                  </div>

                  {/* Payment Slip */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Slip</h3>
                    {selectedCustomer.slip ? (
                      <div className="flex justify-center">
                        {console.log("Slip URL:", `${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedCustomer.slip}`)}
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${selectedCustomer.slip}`}
                          alt="Payment Slip"
                          width={300}
                          height={400}
                          className="object-contain rounded-lg shadow-md max-h-[400px] w-auto"
                          onError={(e) => console.error("Error loading slip image:", e)}
                        />
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center">No slip available</p>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-[#2A8470] text-white px-5 py-2 rounded-lg hover:bg-[#1f6354] transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}