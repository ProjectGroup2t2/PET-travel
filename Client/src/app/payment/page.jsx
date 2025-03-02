'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Payment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    slip: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'slip') {
      setFormData({ ...formData, slip: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('ส่งข้อมูลเรียบร้อย!');
  };

  return (
    <div className="container mx-auto px-8 py-8 flex flex-col items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 border w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-white bg-[#24685F] p-4 rounded-t-lg text-center">PAYMENT</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between p-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded-lg p-6 w-full md:w-1/2">
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1">ชื่อ</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#24685F]"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1">นามสกุล</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#24685F]"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">อีเมล</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#24685F]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">เบอร์โทร</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#24685F]"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">อัปโหลดสลิป</label>
              <input
                type="file"
                name="slip"
                accept="image/*"
                onChange={handleChange}
                className="border rounded w-full px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-none file:bg-[#24685F] file:text-white cursor-pointer"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-[#24685F] hover:bg-[#1E5A50] text-white w-full py-2 text-lg rounded-lg"
            >
              ยืนยันการชำระเงิน
            </Button>
          </form>
          
          {/* QR Code */}
          <div className="flex flex-col items-center w-full md:w-1/2 mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold text-[#24685F]">QR CODE & PROMPT PAY</h2>
            <Image
              src="/qr.png"
              alt="QR Code"
              width={300}
              height={300}
              className="border p-2 rounded-lg mt-4"
            />
            <p className="text-lg font-semibold text-gray-700 mt-2">0935941899</p>
            <p className="text-md text-gray-600">นายณัฐพล ยิ้มน้อย</p>
          </div>
        </div>
      </div>
    </div>
  );
}
