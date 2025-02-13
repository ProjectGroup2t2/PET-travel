import React from 'react';
import Image from 'next/image';
import { Search, Calendar, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Homepage = () => {
  const tourCards = [
    {
      image: '/1.jpg',
      title: 'ภูเก็ต',
      rating: 4.0,
      reviews: 204,
      capacity: '50/60',
      duration: 'รายวัน',
      price: 'THB X,XXX',
      isSellOut: false
    },
    {
      image: '/1.jpg',
      title: 'เกาะพีพีมาเล',
      rating: 4.0,
      reviews: 204,
      capacity: '50/60',
      duration: '2 วัน 1 คืน',
      price: 'THB X,XXX',
      isSellOut: true
    },
    {
      image: '/1.jpg',
      title: 'ทะเล',
      rating: 4.0,
      reviews: 204,
      capacity: '50/60',
      duration: 'รายวัน',
      price: 'THB X,XXX',
      isSellOut: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <Image
          src='/1.jpg'
          alt="Thai boats"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">Let's go with PET</h1>
          <p className="text-white text-xl mb-8">Plan better with travel experiences!</p>
          
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
        
        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#2A8470] mb-8">Special offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tourCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={card.image || "'/1.jpg'"}
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
                    <span className="text-xl font-bold text-blue-600 ml-1">{card.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Package Section */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-[#2A8470] mb-8">Recommended Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tourCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Same card structure as Special Offers */}
              {/* ... */}
            </div>
          ))}
        </div>
      </div>

      {/* Free Cancellation Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Free cancellation</h2>
          <p className="text-gray-600">
            You'll receive a full refund if you cancel at least<br />
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
            <p className="text-sm text-gray-500 mt-2">Based on 12,241 reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {/* Review Cards */}
            {/* Add your review cards here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;