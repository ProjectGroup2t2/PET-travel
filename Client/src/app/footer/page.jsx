'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"; // เพิ่มการ import Image จาก Next.js



const Footer = () => {

  return (
    <footer className="bg-[#2D776E] text-white py-8 w-full">
    <div className="container mx-auto px-4">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* โลโก้ */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
          <Image src="/logoW.png" alt="PETI Logo" width={170} height={90} />
        </motion.div>

        {/* ข้อมูลติดต่อ */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="font-semibold">Contact us</p>
          <p>yimwired@gmail.com</p>
        </motion.div>

        {/* เกี่ยวกับ */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <p className="font-semibold">About</p>
          <p>@PET2025</p>
        </motion.div>

        {/* ไอคอนโซเชียลมีเดียพร้อมลิงก์ */}
        <div className="flex gap-4">
          {[Facebook, Instagram, MessageCircle, Twitter].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="#" className="hover:text-[#24685F]">
                <Icon className="w-6 h-6" />
                <span className="sr-only">{Icon.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </footer>
  );
};

export default Footer;
