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
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold mb-4 text-center">Payment</h1>

      <div className="flex justify-center mb-8">
        <div className="border p-4 inline-block">
          <Image
            src="/qr.jpeg" 
            alt="QR Code"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      </div>


      <form onSubmit={handleSubmit} className="max-w-md mx-auto">

        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-1">ชื่อ</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        {/* นามสกุล */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-1">นามสกุล</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        {/* เบอร์โทร */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">เบอร์โทร</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        {/* อีเมล */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">อีเมล</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        {/* อัปโหลดสลิป */}
        <div className="mb-4">
          <label htmlFor="slip" className="block mb-1">อัปโหลดสลิป</label>
          <input
            type="file"
            id="slip"
            name="slip"
            accept="image/*"
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <Button
          type="submit"
          className="bg-[#24685F] hover:bg-[#1E5A50] text-white px-8 py-2 text-lg"
        >
          ยืนยันการชำระเงิน
        </Button>
      </form>
    </div>
  );
}
