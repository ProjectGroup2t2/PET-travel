"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../../footer/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import { use } from "react"; // เพิ่มการนำเข้า React.use

const PackageDetail = ({ params: paramsPromise }) => {
  const params = use(paramsPromise); // Unwrap params ด้วย React.use
  const router = useRouter();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async (retries = 3) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/packages?filters[id][$eq]=${params.id}&populate=*`
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลแพ็คเกจได้");
        }
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
          throw new Error("ไม่พบข้อมูลแพ็คเกจ");
        }

        const product = data.data[0];
        const formattedData = {
          id: product.id,
          name: product.title || "ไม่มีชื่อ",
          image: product.image?.[0]?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${product.image[0].url}`
            : "/placeholder.svg",
          description:
            product.description?.[0]?.children?.[0]?.text || "ไม่มีคำอธิบาย",
          rating: 4.0,
          reviews: 100,
          capacity: {
            current: product.capacity || 0,
            total: product.capacity_max || 0,
          },
          duration: product.duration || "ไม่ระบุ",
          price: product.price || 0,
          timeOfTour: product.timeOfTour || ["morning"],
          specials: product.specials || ["english"],
        };

        setPackageData(formattedData);
        setLoading(false);
      } catch (err) {
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchPackage(retries - 1);
        }
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackage();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!packageData) return;

    const cartItem = {
      id: packageData.id,
      attributes: {
        title: packageData.name,
        price: packageData.price,
        image: packageData.image,
        duration : packageData.duration,
        timeOfTour: packageData.timeOfTour,
        specials: packageData.specials,
      },
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
    Swal.fire({
        icon: "success",
        title: "เพิ่มลงตะกร้าสำเร็จ!",
        text: `${packageData.name} ถูกเพิ่มลงในตะกร้าแล้ว`,
        showCancelButton: true,
        confirmButtonText: "ไปที่ตะกร้า",
        cancelButtonText: "จองต่อ",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/cart");
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">เกิดข้อผิดพลาด: {error}</p>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">ไม่พบข้อมูลแพ็คเกจ</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <div className="container mx-auto p-4 flex-grow">
        <div className="mb-6">
          <Link href="/Package" className="text-blue-600 hover:underline">
            กลับไปหน้าทัวร์ทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src={packageData.image}
                alt={`${packageData.name} tour image`}
                fill
                className="object-cover"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{packageData.name}</h1>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{packageData.rating.toFixed(1)}</span>
                <span className="text-gray-500">({packageData.reviews} รีวิว)</span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="font-semibold mb-2">ราคา</h2>
              <p className="text-2xl font-bold text-blue-600">
                THB {packageData.price.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                จำนวนที่ว่าง: {packageData.capacity.current}/{packageData.capacity.total}
              </p>
            </div>

            <div className="mt-2 text-gray-600">
            <span>ช่วงเวลา: {Array.isArray(packageData.timeOfTour) ? packageData.timeOfTour.join(", ") : packageData.timeOfTour}</span>
            </div>
            <div className="mt-2 text-gray-600">
            <span>สิ่งพิเศษ: {Array.isArray(packageData.specials) ? packageData.specials.join(", ") : packageData.specials}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label={`จองทัวร์ ${packageData.name}`}
              onClick={handleAddToCart}
            >
              จองทัวร์นี้
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">รายละเอียดทัวร์</h2>
          <p className="text-gray-600">{packageData.description}</p>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default PackageDetail;