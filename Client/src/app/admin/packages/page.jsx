"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AdminHeader } from "@/components/ui/admin/header";

export default function Package() {
  const [tourCards, setTourCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          image: '/1.jpg',
          title: 'ภูเก็ต',
          rating: 4.0,
          reviews: 204,
          capacity: '50/60',
          duration: 'รายวัน',
          price: 'THB 5,590',
          isSellOut: false
        },
        {
          id: 2,
          image: '/login-pic.png',
          title: 'เกาะพีพีมาเล',
          rating: 4.5,
          reviews: 320,
          capacity: '30/40',
          duration: '3 วัน 2 คืน',
          price: 'THB 6,990',
          isSellOut: true
        }
      ];
      setTourCards(data);
    };

    fetchData();
  }, []);

  if (!tourCards.length) return <p>Loading...</p>;

  return (
    <div className="flex-1">
      <AdminHeader title="Packages Management" />
      <div className="text-3xl font-bold text-[#2A8470] p-2 ">Packages</div>
      {/* Tour Listings */}
      <div className="p-2 flex flex-wrap md:gap-4">
        {tourCards.map((tour, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link key={index} href={`/admin/packages/${tour.id}`} passHref>
              <div className="w-[300px] h-[200px] overflow-hidden">
                <Image 
                  src={tour.image} 
                  alt={tour.title} 
                  width={300} 
                  height={200} 
                  className="object-cover w-full h-full rounded-t-lg" 
                />
              </div>
              <div className='p-2'>
                <h1 className="text-lg font-bold mt-2">{tour.title}</h1>
                <p className="text-gray-600">⭐ {tour.rating} ({tour.reviews} รีวิว)</p>
                <p className="text-gray-600">⏳ {tour.duration}</p>
                <p className="text-gray-600">👥 {tour.capacity}</p>
                <p className="text-lg font-semibold text-blue-500">{tour.price}</p>
                {tour.isSellOut && <p className="text-red-500 font-bold">Sold Out</p>}
              </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
}
