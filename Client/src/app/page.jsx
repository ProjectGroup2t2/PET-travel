"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Calendar, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';
import Link from "next/link";

const Homepage = () => {
  const [SpecialtourCards, setSpecialTourCards] = useState([]);
  const [RecommendtourCards, setRecommendTourCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/special-offers?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const formattedData =
          data?.data?.map((offer) => ({
            id: offer.id,
            image: offer?.image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${offer.image.url}`
              : "/1.jpg",
            title: offer?.title || "No Title",
            rating: offer?.rating || 0,
            reviews: offer?.reviews || 0,
            capacity: offer?.capacity || "N/A",
            duration: offer?.duration || "N/A",
            price: offer?.price
              ? `THB ${offer.price.toLocaleString()}`
              : "THB X,XXX",
            isSellOut: offer?.isSellOut || false,
          })) || [];

        setSpecialTourCards(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/recommended-pakages?populate=*`
    )
      .then((res) => res.json())
      .then((data) => {
        const formattedData =
          data?.data?.map((pakage) => ({
            id: pakage.id,
            image: pakage?.image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${pakage.image.url}`
              : "/1.jpg",
            title: pakage?.title || "No Title",
            rating: pakage?.rating || 0,
            reviews: pakage?.reviews || 0,
            capacity: pakage?.capacity || "N/A",
            duration: pakage?.duration || "N/A",
            price: pakage?.price
              ? `THB ${pakage.price.toLocaleString()}`
              : "THB X,XXX",
            isSellOut: pakage?.isSellOut || false,
          })) || [];

        setRecommendTourCards(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const reviews = [
    {
      rating: 4,
      author: "ธงชัย ชอบมาก พลเมือง",
      text: "ไกด์นำเที่ยวเก่งมาก ให้การบริการดีมาก เที่ยว ก็สนุก",
      time: "1 hour ago",
    },
    {
      rating: 4,
      author: "สวัสดีทุกคน มาแชทกัน",
      text: "บริการดีมาก 5 ดาวเต็ม เดินทางสนุก คุ้มค่าเงินไปเลย",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <Image src="/1.jpg" alt="Thai boats" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Let's go with PET
          </h1>
          <p className="text-white text-xl mb-8">
            Plan better with travel experiences!
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-full p-2 flex items-center w-full max-w-3xl">
            <div className="flex-1 flex items-center px-4 border-r">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Where to?"
                className="w-full outline-none text-gray-700"
              />
            </div>
            <div className="flex-1 flex items-center px-4">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="When?"
                className="w-full outline-none text-gray-700"
              />
            </div>
            <Button className="rounded-full bg-[#2A8470] hover:bg-[#1f6254]">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-center text-5xl font-bold text-[#2A8470] mb-8">
          Special offers
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {SpecialtourCards.map((card) => (
              <Link key={card.id} href={`/infomation/${card.id}`} passHref>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    {card.isSellOut && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        Sell Out
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{card.rating}</span>
                        <span className="text-gray-500 ml-1">({card.reviews})</span>
                      </div>
                      <span className="text-gray-500">{card.capacity}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{card.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-500">from</span>
                        <span className="text-xl font-bold text-blue-600 ml-1">
                          {card.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Package Section */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-center text-5xl font-bold text-[#2A8470] mb-8">
          Recommended Package
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {RecommendtourCards.map((card) => (
            <Link key={card.id} href={`/infomation/${card.id}`} passHref>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  {card.isSellOut && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Sell Out
                    </div>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{card.rating}</span>
                      <span className="text-gray-500 ml-1">({card.reviews})</span>
                    </div>
                    <span className="text-gray-500">{card.capacity}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{card.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">from</span>
                      <span className="text-xl font-bold text-blue-600 ml-1">
                        {card.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Cancellation Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#2A8470] mb-1">
            Free cancellation
          </h2>
          <p className="text-gray-600">
            You'll receive a full refund if you cancel at least
            <br />
            24 hours in advance of most experiences.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <h3 className="text-2xl font-bold mb-2">Excellent</h3>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-[#2A8470] fill-current" />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Based on 12,241 reviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#2A8470] fill-current"
                    />
                  ))}
                </div>
                <p className="font-semibold mb-1">{review.author}</p>
                <p className="text-gray-600 text-sm mb-2">{review.text}</p>
                <p className="text-gray-400 text-sm">{review.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
};

export default Homepage;