'use client';

import React from "react";
import Image from "next/image";
import { Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; 

const Cart = () => {
  const router = useRouter(); 

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}

      <h1 className="text-4xl font-bold mb-8">Cart</h1>

      {/* Cart Item */}
      <div className="border rounded-lg p-6 mb-6 relative">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tour Image */}
          <div className="w-full md:w-64 h-48 relative">
            <Image
              src="/1.jpg"
              alt="ภูเก็ต"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Tour Details */}
          <div className="flex-1 relative">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">ภูเก็ต</h2>
            </div>

            <div className="absolute top-0 right-0 text-gray-600">จำนวนคน 50/60</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Travelers</div>
                    <div className="text-gray-600">2 คน</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium">Time of Tour</div>
                    <div className="text-gray-600">All day</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Pickup points</div>
                  <div className="text-gray-600">
                    Pick and drop off
                    <br />: ระบุสถานที่
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-medium">Specials</div>
                  <div className="text-gray-600">อาหารฮาลาล</div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>2 วัน 1 คืน</span>
                </div>

                <div className="text-green-600">Free Cancellation</div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="w-full md:w-48 absolute bottom-6 right-6 text-right">
            <div className="flex justify-end items-center gap-2 text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">THB X,XXX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Book Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => router.push('/payment')} 
          className="bg-[#24685F] hover:bg-[#1E5A50] text-white px-8 py-2 text-lg"
        >
          จองเลย
        </Button>
      </div>
    </div>
  );
};

export default Cart;
