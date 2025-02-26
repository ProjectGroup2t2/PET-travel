"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Star } from "lucide-react"

export default function PackageDetail() {
    const { id } = useParams()
    const [selectedImage, setSelectedImage] = useState(0)
    const [travelers, setTravelers] = useState(2)
    const [selectedDate, setSelectedDate] = useState("")

    const images = ["/ppp/4f575727-7e5c-47a8-87ee-2f7fc48685ac.jpg", "/ppp/151574405_4060265390664121_2469216028614535966_o-e1616495101304.jpg", "/ppp/PromthepCape-1-1024x576.jpg", "/ppp/ทัวร์เกาะพีพีเต็มวันด้วยเรือสปีดโบ๊ทจากภูเก็ตโดยSeastar-Klookประเทศไทย.jpg"]

    const relatedTours = [
        {
            id: 1,
            title: "ภูเก็ต",
            image: "/1.jpg",
            price: "X,XXX",
            rating: 4.0,
            reviews: 204,
        },
        {
            id: 2,
            title: "เกาะที่มาเล",
            image: "/1.jpg",
            price: "X,XXX",
            rating: 4.0,
            reviews: 204,
            isSellOut: true,
        },
        {
            id: 3,
            title: "ทะเล",
            image: "/1.jpg",
            price: "X,XXX",
            rating: 4.0,
            reviews: 204,
        },
    ]

    return (
        <div className="container mx-auto px-4 py-8">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Sidebar - Thumbnails */}
                <div className="md:col-span-1 flex md:flex-col gap-2">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer border-2 ${selectedImage === index ? "border-green-500" : "border-transparent"}`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <img src={img || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} className="w-24 h-20 object-cover" />
                        </div>
                    ))}
                </div>

                {/* Main Image */}
                <div className="md:col-span-7 relative">
                    <img
                        src={images[selectedImage] || "/placeholder.svg"}
                        alt="Main view"
                        className="rounded-lg w-full h-[500px] object-cover"
                    />
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">4.0</span>
                        <span className="text-sm text-gray-500">(125 reviews)</span>
                    </div>
                </div>

                {/* Right Sidebar - Booking Form */}
                <div className="md:col-span-4">
                    <div className="border rounded-lg p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded inline-block text-sm">Special Offer</div>
                            <h2 className="text-2xl font-semibold">
                                From THB X,XXX <span className="text-sm font-normal text-gray-500">per person</span>
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Date and Travelers</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full p-2 border rounded-md mb-2"
                                />
                                <input
                                    type="number"
                                    value={travelers}
                                    onChange={(e) => setTravelers(Number.parseInt(e.target.value))}
                                    min={1}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Number of travelers"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Time of Tour</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="time" value="morning" className="mr-2" />
                                        Morning (8:00 to 12:00)
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="time" value="afternoon" className="mr-2" />
                                        Afternoon (13:00 to 16:00)
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="time" value="allday" className="mr-2" />
                                        All day (8:00 to 16:00)
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Specials</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        อาหารกลางวัน
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        ไกด์ภาษาอังกฤษ
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        ที่นั่งสำหรับเด็กเล็ก
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                            >
                                ใส่ตะกร้า
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Tour Information */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">INFORMATION</h2>
                <div className="prose max-w-none">
                    <p>เนื่องจากเป็นสถานที่ที่เต็มไปด้วยประวัติศาสตร์และเสน่ห์เฉพาะตัว</p>
                    <h3 className="text-xl font-semibold mt-4 mb-2">สถานที่สำคัญในทัวร์</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>ถนนถลาง (Thalang Road): ถนนสายหลักของย่านเก่า เต็มไปด้วยร้านค้า ร้านอาหาร และงานสถาปัตย์</li>
                        <li>พิพิธภัณฑ์ภูเก็ต: สถานที่เรียนรู้ประวัติศาสตร์ความเป็นมาของจังหวัดภูเก็ต</li>
                    </ul>
                </div>
            </div>

            {/* Related Tours */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">ดูรายละเอียดทัวร์อื่นๆ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedTours.map((tour) => (
                        <div key={tour.id} className="border rounded-lg overflow-hidden">
                            <div className="relative">
                                <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-48 object-cover" />
                                {tour.isSellOut && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">Sell Out</div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="flex items-center space-x-1 text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span>{tour.rating}</span>
                                    <span className="text-gray-500">({tour.reviews})</span>
                                </div>
                                <h3 className="font-semibold mt-2">{tour.title}</h3>
                                <p className="mt-2">from THB {tour.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

