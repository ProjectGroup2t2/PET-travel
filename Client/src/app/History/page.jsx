"use client"
import { Card, CardContent } from "@/components/ui/card"
import { User, Clock, Heart, MapPin, Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';

export default function HistoryPage() {
    const bookings = [
        {
            id: 1,
            image: "/1.jpg",
            rating: 4.0,
            reviews: 204,
            title: "ภูเก็ต",
            travelers: 2,
            tourTime: "All day",
            pickupPoints: "Pick and drop off",
            location: "ระบุสถานที่",
            specials: ["อาหารกลางวัน"],
            price: "X,XXX",
            duration: "2 วัน 1 คืน",
            status: "ชำระเงินแล้ว",
        },
        {
            id: 2,
            image: "/1.jpg",
            rating: 4.0,
            reviews: 204,
            title: "ภูเก็ต",
            travelers: 2,
            tourTime: "All day",
            pickupPoints: "Pick and drop off",
            location: "ระบุสถานที่",
            specials: ["อาหารกลางวัน"],
            price: "X,XXX",
            duration: "2 วัน 1 คืน",
            status: "ยกเลิกทัวร์",
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 flex-grow">
                <h1 className="text-4xl font-bold mb-8">History</h1>

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
                                                <span className="font-medium">{booking.rating}</span>
                                                <span className="text-gray-500">({booking.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Clock className="h-4 w-4" />
                                                <span>{booking.duration}</span>
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
                                                        <div className="text-gray-500">Time of Tour</div>
                                                        <div>{booking.tourTime}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-5 w-5 text-gray-600" />
                                                    <div>
                                                        <div className="text-gray-500">Pickup points</div>
                                                        <div>{booking.pickupPoints}</div>
                                                        <div>: {booking.location}</div>
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
                                                            <span className="text-blue-600">THB {booking.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <dir>
                                    <div className="p-2">
                                    </div>
                                </dir>
                                <div className="bg-gray-50 p-2 text-right">
                                    <span className="text-gray-600">{booking.status}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            {/* Footer */}
      <footer className="bg-[#2D776E] text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* โลโก้ */}
            <Image
              src="/logoW.png"
              alt="PETI Logo"
              width={170}
              height={90}
            />

            {/* ข้อมูลติดต่อ */}
            <div className="text-center">
              <p className="font-semibold">Contact us</p>
              <p>yimwired@gmail.com</p>
            </div>

            {/* เกี่ยวกับ */}
            <div className="text-center">
              <p className="font-semibold">About</p>
              <p>@PET2025</p>
            </div>

            {/* ไอคอนโซเชียลมีเดียพร้อมลิงก์ */}
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#24685F]">
                <Facebook className="w-6 h-6" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="hover:text-[#24685F]">
                                <Instagram className="w-6 h-6" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-[#24685F]">
                                <MessageCircle className="w-6 h-6" />
                                <span className="sr-only">MessageCircle</span>
                            </Link>
                            <Link href="#" className="hover:text-[#24685F]">
                                <Twitter className="w-6 h-6" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

