'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Cart = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const checkAuth = () => {
    const token = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (token) {
      setIsAuthenticated(true);
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setCartItems(storedCart);
      const totalPrice = storedCart.reduce((acc, item) => acc + (item.attributes?.price || 0) * (item.quantity || 1), 0);
      setTotal(totalPrice);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setCartItems(storedCart);
      setTotal(0);
    }
  };

  useEffect(() => {
    checkAuth();
    const handleStorageChange = (e) => {
      if (e.key === "jwt" || e.key === "user" || e.key === "cart") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const uniqueItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity++;
    }
    return acc;
  }, {});
  const uniqueCartItems = Object.values(uniqueItems);

  const calculateTotalPriceProduct = (item) => {
    return (item.attributes?.price || 0) * (item.quantity || 1);
  };

  const removeFromCart = (itemId) => {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: 'คุณแน่ใจหรือไม่ที่ต้องการลบสินค้านี้ออกจากตะกร้า?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        Swal.fire('ลบสำเร็จ!', 'สินค้าถูกลบออกจากตะกร้าแล้ว', 'success');
        checkAuth();
      }
    });
  };

  const handleBook = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'โปรดเข้าสู่ระบบก่อน',
        icon: 'error',
        text: 'ต้องเข้าสู่ระบบก่อนถึงจะสามารถสั่งซื้อได้',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }

    if (uniqueCartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเพิ่มสินค้า!',
        text: 'ไม่มีสินค้าในตะกร้า โปรดเพิ่มสินค้าก่อนที่จะสั่งซื้อ',
      });
      router.push('/Package');
      return;
    }

    try {
      // รวมข้อมูลจาก cart items
      const combinedTitle = uniqueCartItems.map(item => `${item.attributes?.title} (${item.quantity})`).join(', ');
      const totalQuantity = uniqueCartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
      const totalPrice = uniqueCartItems.reduce((acc, item) => acc + calculateTotalPriceProduct(item), 0);
      const combinedSpecial = uniqueCartItems.map(item => item.attributes?.specials || 'halal').join(', ');

      const bookingData = {
        data: {
          username: user?.username || JSON.parse(localStorage.getItem("user"))?.username,
          title: combinedTitle,
          Number: totalQuantity,
          price: totalPrice,
          special: combinedSpecial,
          Date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        }
      };

      console.log('Booking Data being sent:', JSON.stringify(bookingData, null, 2));

      const response = await fetch('http://localhost:1337/api/history-packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`เกิดข้อผิดพลาดในการบันทึกข้อมูลการจอง: ${response.status} - ${errorText}`);
      }

      localStorage.removeItem('cart');
      setCartItems([]);
      setTotal(0);

      Swal.fire({
        icon: 'success',
        title: 'จองสำเร็จ!',
        text: 'การจองของคุณสำเร็จเรียบร้อยแล้ว',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/payment');
      });

    } catch (error) {
      console.error('Error booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message || 'ไม่สามารถบันทึกข้อมูลการจองได้ กรุณาลองใหม่',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">ตะกร้าสินค้า</h1>

        {uniqueCartItems.length === 0 ? (
          <p className="text-gray-600">ไม่มีสินค้าในตะกร้า</p>
        ) : (
          uniqueCartItems.map((item, index) => (
            <div key={item.id} className="border rounded-lg p-6 mb-6 relative">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 h-48 relative">
                  <Image
                    src={item.attributes?.image || "/1.jpg"}
                    alt={item.attributes?.title || "Item"}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 relative">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{item.attributes?.title || "Item"}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">จำนวน</div>
                          <div className="text-gray-600">{item.quantity || 1} ชิ้น</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium">ราคาต่อหน่วย</div>
                          <div className="text-gray-600">THB {item.attributes?.price || 0}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-48 absolute bottom-6 right-6 text-right">
                  <div className="flex justify-end items-center gap-2 text-xl font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">THB {calculateTotalPriceProduct(item)}</span>
                  </div>
                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ลบ
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}

        {uniqueCartItems.length > 0 && (
          <div className="flex justify-end items-center gap-6">
            <div className="text-xl font-bold">
              ยอดรวมทั้งหมด: THB {total}
            </div>
            <Button
              onClick={handleBook}
              className="bg-[#24685F] hover:bg-[#1E5A50] text-white px-8 py-2 text-lg"
            >
              จองเลย
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;