"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PackageDetail() {
  const { id } = useParams(); // ดึง id จาก URL
  const [tour, setTour] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false); // สถานะคอนเฟิร์ม

  useEffect(() => {
    const tourData = {
      1: {
        image: "/1.jpg",
        title: "ภูเก็ต",
        customerName: "สมชาย ใจดี",
        email: "somchai@example.com",
        phone: "081-234-5678",
        paymentStatus: "Paid", // Paid หรือ Unpaid
        price: "THB X,XXX",
      },
      2: {
        image: "/login-pic.png",
        title: "เชียงใหม่",
        customerName: "นางสาวพิมพ์ใจ สายลม",
        email: "pimjai@example.com",
        phone: "090-123-4567",
        paymentStatus: "Unpaid",
        price: "THB Y,YYY",
      },
    };

    setTour(tourData[id]);
  }, [id]);

  if (!tour) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-[#2A8470] p-2">{tour.title}</h1>
      <div key={tour} className="border rounded-lg overflow-hidden"></div>
      <div className="w-[300px] h-[200px] overflow-hidden mt-1">
        <Image
          src={tour.image}
          alt={tour.title}
          width={300} 
          height={200}
          className="object-cover w-full h-full rounded-t-lg shadow-md"
        />
      </div>
      
      <div className="mt-2 border p-2 rounded-lg shadow-md w-[300px] h-[200px]">
        <p className="text-lg"><strong>ลูกค้า:</strong> {tour.customerName}</p>
        <p><strong>Email:</strong> {tour.email}</p>
        <p><strong>เบอร์โทร:</strong> {tour.phone}</p>
        <p><strong>ราคา:</strong> <span className="text-blue-500">{tour.price}</span></p>
        <p><strong>สถานะการชำระเงิน:</strong> 
          <span className={tour.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}>
            {tour.paymentStatus}
          </span>
        </p>
      </div>

      {/* ปุ่มคอนเฟิร์ม */}
      {!isConfirmed ? (
        <button 
          onClick={() => setIsConfirmed(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ✅ ยืนยันการจอง
        </button>
      ) : (
        <p className="mt-4 text-green-500 font-bold">✔ ทัวร์นี้ได้รับการยืนยันแล้ว</p>
      )}
    </div>
  );
}
