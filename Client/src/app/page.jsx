"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Calendar, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image
              src="/logo.svg"
              alt="PET Travel Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                15 KANCHANAWANICH ROAD, KHO HONG, HAT
              </p>
              <p className="text-gray-600">
                YAI DISTRICT, SONGKHLA 90110, THAILAND
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-gray-600">+ 1 234 567 890</p>
              <p className="text-gray-600">EMAIL@EMAIL.COM</p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-[#2A8470]">
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#2A8470]">
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#2A8470]">
                <span className="sr-only">Line</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.043-.068-.099-.068-.161v-5.235c0-.129.104-.233.233-.233h.838zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.043-.043-.067-.099-.067-.161v-5.235c0-.129.104-.233.233-.233h3.363zm-10.442.001c.129 0 .234.104.234.233v5.236c0 .129-.105.233-.234.233h-.838c-.129 0-.233-.104-.233-.233v-5.236c0-.129.104-.233.233-.233h.838zm2.481 0c.129 0 .234.104.234.233v5.236c0 .129-.105.233-.234.233h-.839c-.129 0-.233-.104-.233-.233v-5.236c0-.129.104-.233.233-.233h.839z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#2A8470]">
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;