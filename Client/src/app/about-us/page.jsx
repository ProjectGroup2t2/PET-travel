import React from "react";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';

const AboutUs = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/1.jpg"
          alt="Thai longtail boats"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">About us</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* WHO WE ARE */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#2A8470] mb-4 flex items-center gap-2">
                WHO WE ARE? <span className="text-3xl">👤</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                เป็นบริษัททัวร์ชั้นนำในจังหวัดภูเก็ตที่เชี่ยวชาญในการให้บริการแพ็คเกจท่องเที่ยวสุดพิเศษ ไม่ว่าจะเป็นทัวร์เกาะ ทัวร์ดำน้ำ ทัวร์วัฒนธรรม และกิจกรรมผจญภัยต่าง ๆ เรามุ่งมั่นที่จะมอบประสบการณ์ที่ดีที่สุดให้กับนักท่องเที่ยว ทั้งชาวไทยและชาวต่างชาติ ให้ทุกการเดินทางเต็มไปด้วยความสุข ความสะดวก และความประทับใจ
              </p>
            </div>
            <div className="w-full md:w-[400px]">
              <Image
                src="/1.jpg"
                alt="Beach view"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* OUR EXPERIENCE */}
        <div className="mb-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-[#2A8470] text-center mb-6">OUR EXPERIENCE</h2>
          <p className="text-gray-700 text-center max-w-3xl mx-auto">
            ก่อตั้งขึ้นในปี 2015 เรามีประสบการณ์ในอุตสาหกรรมท่องเที่ยวมากกว่า 9 ปี และให้บริการนักท่องเที่ยวมาแล้วกว่า 50,000 คน ทีมงานของเราประกอบด้วยไกด์มืออาชีพที่มีใบอนุญาต และผู้เชี่ยวชาญด้านการท่องเที่ยวที่รู้จักภูเก็ตเป็นอย่างดี ไม่ว่าคุณจะมองหาทัวร์ทะเลสวย ๆ หรือกิจกรรมแอดเวนเจอร์ที่เร้าใจ เราพร้อมดูแลคุณตลอดการเดินทาง
          </p>
        </div>

        {/* WHY CHOOSE US */}
        <div>
          <h2 className="text-2xl font-bold text-[#2A8470] text-center mb-8">WHY CHOOSE US?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="space-y-4">
            <Image
                src="/1.jpg"
                alt="Pier view"
                width={400}
                height={250}
                className="rounded-lg w-full"
              />
              <h3 className="font-bold text-xl mb-2">ทีมที่มืออาชีพ</h3>
              <p className="text-gray-600">
                ทีมไกด์ของเรามืออาชีพและมีใบอนุญาตโดยเป็นผู้เชี่ยวชาญเฉพาะด้านที่ผ่านการฝึกอบรมและผ่านประสบการณ์มาอย่างดี รวมถึงมีความรู้ด้านประวัติศาสตร์ วัฒนธรรม และจุดเด่นของแต่ละสถานที่ รวมทั้งความปลอดภัยในแต่ละกิจกรรมที่เหมาะสมที่สุดสำหรับนักท่องเที่ยวแต่ละกลุ่ม
              </p>
            </div>

            {/* Card 2 */}
            <div className="space-y-4">
              <Image
                src="/1.jpg"
                alt="Pier view"
                width={400}
                height={250}
                className="rounded-lg w-full"
              />
              <h3 className="font-bold text-xl">บริการครบวงจร</h3>
              <p className="text-gray-600">
                เรามอบประสบการณ์การท่องเที่ยวที่ใช้เวลาอย่างคุ้มค่าครอบคลุมสถานที่ท่องเที่ยวยอดนิยมและเพิ่มเติมสถานที่ที่ครอบคลุมทุกมุมมอง รวมทั้งจัดเตรียมอาหารท้องถิ่นรสชาติดั้งเดิมจากร้านอาหาร พร้อมอุปกรณ์ที่อำนวยความสะดวกในการบริการต่างๆ เช่น ถ่ายรูป ทีมงาน สำหรับนักท่องเที่ยวทั้งไทย เราจัดเตรียมรถรับส่งเพื่อเพิ่มความสะดวกและปลอดภัย เพื่อให้ทุกท่าได้รับความสะดวกสบายตลอดการเดินทาง
              </p>
            </div>

            {/* Card 3 */}
            <div className="space-y-4">
              <Image
                src="/1.jpg"
                alt="Family on beach"
                width={400}
                height={250}
                className="rounded-lg w-full"
              />
              <h3 className="font-bold text-xl">ประกันการเดินทาง ครอบคลุมทุกกรณี</h3>
              <p className="text-gray-600">
                เราได้มีประกันการเดินทางที่ครอบคลุมในทุกกิจกรรมให้กับทุกท่านที่มาท่องเที่ยวกับเราทุกแพ็คเกจการเดินทาง ที่ครอบคลุม อุบัติเหตุ ค่ารักษาพยาบาล และครอบคลุมถึง ทรัพย์สินที่เสียหายในกรณีที่เกิดอุบัติเหตุระหว่างใช้บริการเดินทาง ทั้งนี้เพื่อให้ท่านเดินทางได้อย่างสบายใจการบริการไม่ติดขัดเป็นไป ลูกค้าจะได้รับการดูแลอย่างดีที่สุด
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image
              src="/logo.svg"
              alt="PETI Logo"
              width={200}
              height={150}
            />
            <div className="text-gray-600 text-center md:text-left">
              <p>15 KANCHANAWANICH ROAD, KHO HONG, HAT</p>
              <p>YAI DISTRICT, SONGKHLA 90110, THAILAND</p>
            </div>
            <div className="text-gray-600">
              <p>+1 234 567 890</p>
              <p>EMAIL@GMAIL.COM</p>
            </div>
            <div className="flex gap-4">
              <Facebook className="w-6 h-6" />
              <Instagram className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;