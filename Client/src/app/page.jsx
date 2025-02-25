"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Calendar, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            {SpecialtourCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
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
                      <span className="text-gray-500 ml-1">
                        ({card.reviews})
                      </span>
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
          {RecommendtourCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
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
          ))}
        </div>
      </div>

      {/* Free Cancellation Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Free cancellation</h2>
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
            <h3 className="text-2xl font-bold mb-2 text-black">Excellent</h3>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-[#2A8470] fill-current"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Based on 12,241 reviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {/* Review 1 (Left) */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#2A8470] fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                ดีมาก บริการเยี่ยมมาก ประทับใจสุดๆ
              </p>
              <p className="text-gray-500 text-xs">1 hour ago</p>
            </div>

            {/* Review 2 (Right) */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#2A8470] fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                ดีค่ะ บริการครบครัน คุ้มค่ากับเงินที่จ่าย
              </p>
              <p className="text-gray-500 text-xs">1 hour ago</p>
            </div>
          </div>
        </div>

        {/* Footer Section (Contact Info) */}
        <div className="bg-[#D9D9D9] py-4 mt-8 flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center mb-4 md:mb-0">
            <Image
              src="/pet-logo.png" // Replace with your actual logo path
              alt="PET SEA Travel"
              width={100}
              height={50}
              className="mr-4"
            />
            <span className="text-black font-bold">PET SEA Travel</span>
          </div>
          <div className="text-black mb-4 md:mb-0">
            15 KANCHANAWICH ROAD, KHO HONG, HAT YAI DISTRICT, SONGKHA 90110,
            THAILAND
          </div>
          <div className="text-black mb-4 md:mb-0">+1 234 567 890</div>
          <div className="text-black mb-4 md:mb-0">EMAIL@GMAIL.COM</div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/facebook-icon.png" // Replace with your actual icon path
                alt="Facebook"
                width={24}
                height={24}
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/instagram-icon.png" // Replace with your actual icon path
                alt="Instagram"
                width={24}
                height={24}
              />
            </a>
            <a href="https://line.me" target="_blank" rel="noopener noreferrer">
              <Image
                src="/line-icon.png" // Replace with your actual icon path
                alt="Line"
                width={24}
                height={24}
              />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/x-icon.png" // Replace with your actual icon path
                alt="X"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
