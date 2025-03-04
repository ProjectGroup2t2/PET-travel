"use client"
import { Card, CardContent } from "@/components/ui/card"
import { User, Clock, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserBookings = async () => {
        try {
            const token = localStorage.getItem("jwt");
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (!token || !storedUser?.username) {
                setBookings([]);
                setLoading(false);
                return;
            }

            setUser(storedUser);

            const response = await fetch('http://localhost:1337/api/history-packages', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch booking history');
            }

            const result = await response.json();
            
            const userBookings = result.data.map(booking => ({
                id: booking.id,
                image: "/1.jpg",
                title: booking.title?.split(' (')[0] || "Unknown",
                travelers: booking.Number || 0,
                price: booking.price?.toLocaleString() || "0",
                specials: [booking.special || "ไม่ระบุ"],
                date: booking.Date || "ไม่ระบุ",
                status: booking.publishedAt ? "รอชำระเงิน" : "ชำระเงินเรียบร้อยแล้ว" // ใช้ publishedAt เพื่อกำหนดสถานะ
            }));

            setBookings(userBookings);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
            setLoading(false);
        }
    };

    const handlePayment = (bookingId) => {
        router.push(`/payment?bookingId=${bookingId}`);
    };

    useEffect(() => {
        fetchUserBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>กำลังโหลด...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-4xl font-bold mb-8">History</h1>

                {bookings.length === 0 ? (
                    <p className="text-gray-600">ไม่มีประวัติการจอง</p>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <Card key={booking.id} className="overflow-hidden border rounded-lg">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/4 relative h-48 md:h-auto">
                                            <Image
                                                src={booking.image || "/placeholder.svg"}
                                                alt={booking.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-1 text-teal-600">
                                                    <Heart className="h-5 w-5 fill-teal-600" />
                                                    <span className="font-medium">4.0</span>
                                                    <span className="text-gray-500">(204)</span>
                                                </div>
                                            </div>

                                            <h2 className="text-2xl font-bold mt-2">{booking.title}</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <div className="text-gray-500">Travelers</div>
                                                            <div>{booking.travelers} คน</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <div className="text-gray-500">Booking Date</div>
                                                            <div>{booking.date}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="mb-2">
                                                        <h3 className="font-semibold text-lg">Specials</h3>
                                                        {booking.specials.map((special, index) => (
                                                            <div key={index} className="text-gray-600">
                                                                {special}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="mt-auto flex justify-end items-end h-full">
                                                        <div className="text-right">
                                                            <div className="text-xl">Total</div>
                                                            <div className="text-2xl font-bold">
                                                                <span className="text-blue-600"> {booking.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-2 flex justify-between items-center">
                                        <span className="text-gray-600">{booking.status}</span>
                                        {booking.status === "รอชำระเงิน" && (
                                            <div className="mt-2">
                                                <Button
                                                    onClick={() => handlePayment(booking.id)}
                                                    className="bg-[#24685F] hover:bg-[#1E5A50] text-white"
                                                >
                                                    ชำระเงิน
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-[#2D776E] text-white py-8 w-full">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <Image src="/logoW.png" alt="PETI Logo" width={170} height={90} />
                        <div className="text-center">
                            <p className="font-semibold">Contact us</p>
                            <p>yimwired@gmail.com</p>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">About</p>
                            <p>@PET2025</p>
                        </div>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[#24685F]"><Facebook className="w-6 h-6" /><span className="sr-only">Facebook</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><Instagram className="w-6 h-6" /><span className="sr-only">Instagram</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><MessageCircle className="w-6 h-6" /><span className="sr-only">MessageCircle</span></Link>
                            <Link href="#" className="hover:text-[#24685F]"><Twitter className="w-6 h-6" /><span className="sr-only">Twitter</span></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}