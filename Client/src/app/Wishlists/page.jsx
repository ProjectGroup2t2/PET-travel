"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Clock, Heart } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';

export default function WishlistsPage() {
    const [wishlistItems] = useState([
        {
            id: 1,
            image: "/1.jpg",
            rating: 4.0,
            reviews: 204,
            capacity: "50/60",
            duration: "ราชวัน",
            location: "ภูเก็ต",
            price: "X,XXX",
            isFavorite: true,
        },
        {
            id: 2,
            image: "/1.jpg",
            rating: 4.0,
            reviews: 204,
            capacity: "50/60",
            duration: "ราชวัน",
            location: "ภูเก็ต",
            price: "X,XXX",
            isFavorite: false,
        },
    ]);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto py-8 px-4 flex-1">
                <h1 className="text-4xl font-bold mb-8">Wishlists</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <Link key={item.id} href={`/infomation/${item.id}`} passHref>
                            <Card className="overflow-hidden border rounded-lg">
                                <div className="relative">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt="Tour destination"
                                        className="w-full h-48 object-cover"
                                    />
                                    <Button
                                        size="icon"
                                        className="absolute top-2 right-2 bg-white/80 rounded-full h-8 w-8 p-1 shadow-md"
                                    >
                                        <Heart className={`h-5 w-5 ${item.isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
                                    </Button>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-teal-600">★</span>
                                        <span className="font-medium">{item.rating}</span>
                                        <span className="text-gray-500">({item.reviews})</span>
                                        <span className="mx-2 text-gray-400">•</span>
                                        <User className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-500">{item.capacity}</span>
                                        <span className="mx-2 text-gray-400">•</span>
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-500">{item.duration}</span>
                                    </div>
                                    <h3 className="text-lg font-medium mb-1">{item.location}</h3>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-500">from</div>
                                        <div>
                                            <span className="text-blue-600 font-bold">THB {item.price}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">Price varies by group size</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
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
    );
}
