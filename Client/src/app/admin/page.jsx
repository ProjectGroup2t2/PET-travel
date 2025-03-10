"use client"

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AdminHeader } from "@/components/ui/admin/header";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/Auth.context";

export default function AdminDashboard() {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newBookings, setNewBookings] = useState(0);
  const [latestBookings, setLatestBookings] = useState([]);
  
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || [];
      if (!roles.includes("admin")) {
        router.push("/");
      }
    } else if (!state.isLoggedIn) {
      router.push("/login");
    }
  }, [state.isLoggedIn, state.user, router]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = sessionStorage.getItem("auth.jwt");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // Fetch payments
      const paymentsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments?populate=package,users_permissions_user`, { headers });
      const paymentsData = await paymentsRes.json();
      const earnings = paymentsData.data.reduce((sum, payment) => sum + payment.attributes.amount, 0);
      setTotalEarnings(earnings);
      setNewBookings(paymentsData.data.length);

      // Fetch total customers
      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users`, { headers });
      const usersData = await usersRes.json();
      setTotalCustomers(usersData.length);

      // Fetch latest bookings with name, tour, and date only
      const latest = paymentsData.data
        .sort((a, b) => new Date(b.attributes.payment_date) - new Date(a.attributes.payment_date))
        .slice(0, 5) // Get 5 most recent bookings
        .map((payment) => ({
          tour: payment.attributes.package?.data?.attributes.title || "N/A",
          name: payment.attributes.users_permissions_user?.data?.attributes.name || "N/A",
          date: payment.attributes.payment_date,
        }));
      setLatestBookings(latest);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50">
      <AdminHeader />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <DashboardCard title="Total Earning" value={`${totalEarnings.toLocaleString()} ฿`} />
          <DashboardCard title="Total Customer" value={totalCustomers} />
          <DashboardCard title="New Bookings" value={newBookings} />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Latest Tours Booking</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-2">Customer Name</th>
                    <th className="pb-2">Tour Package</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {latestBookings.map((booking, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 text-sm">{booking.name}</td>
                      <td className="py-3 text-sm font-semibold">{booking.tour}</td>
                      <td className="py-3 text-sm">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
}