import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div>
      {/* ส่วนหัว - Background Image */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
        <Image
          src="/1.jpg" // ✅ รูปพื้นหลัง
          alt="About Us Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10"
        />
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        </div>
      </div>

      {/* ส่วนเนื้อหา */}
      <div className="container mx-auto px-6 py-12">
        
        {/* WHO WE ARE */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center">
            WHO WE ARE? <span className="ml-2">🧑‍💼</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            เป็นบริษัทชั้นนำในจังหวัดภูเก็ตที่เชี่ยวชาญในการให้บริการแพ็คเกจท่องเที่ยวสุดพิเศษ ไม่ว่าจะเป็นทัวร์เกาะ 
            ทัวร์ดำน้ำ ทัวร์วัฒนธรรม และกิจกรรมผจญภัยต่าง ๆ เรามุ่งมั่นที่จะมอบประสบการณ์ที่ดีที่สุดให้นักท่องเที่ยว ทั้งชาวไทยและชาวต่างชาติ 
            ให้ทุกการเดินทางเต็มไปด้วยความสุข ความสะดวก และความประทับใจ
          </p>
          <div className="absolute right-4 top-4 w-40">
            <Image
              src="/1.jpg" // ✅ รูปข้างขวา
              alt="Who We Are"
              width={160}
              height={100}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* OUR EXPERIENCE */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-green-900 mb-4">OUR EXPERIENCE</h2>
          <p className="text-gray-700 leading-relaxed">
            ก่อตั้งขึ้นในปี <strong>2015</strong> เรามีประสบการณ์ในอุตสาหกรรมท่องเที่ยวมากกว่า <strong>9 ปี</strong> และให้บริการนักท่องเที่ยวมาแล้วกว่า 
            <strong>50,000</strong> คน ทีมงานของเราประกอบด้วยไกด์มืออาชีพที่มีใบอนุญาต และผู้เชี่ยวชาญด้านการท่องเที่ยวที่มีความรู้เกี่ยวกับภูเก็ตเป็นอย่างดี 
            ไม่ว่าคุณจะมองหาทัวร์ทะเลสวย ๆ หรือกิจกรรมแนวแอดเวนเจอร์ที่น่าตื่นเต้น เราพร้อมดูแลคุณตลอดการเดินทาง
          </p>
        </div>

        {/* WHY CHOOSE US */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-green-900 text-center mb-6">WHY CHOOSE US?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* ข้อ 1 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <Image src="/1.jpg" alt="Professional Team" width={250} height={150} className="rounded-md" />
              <h3 className="font-semibold text-lg mt-4">ทีมที่มีมืออาชีพ</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                ทีมงานของเราผ่านการฝึกอบรมเป็นอย่างดีและมีใบอนุญาตประกอบอาชีพเพื่อให้มั่นใจว่าคุณจะได้รับบริการที่ดีที่สุด
              </p>
            </div>

            {/* ข้อ 2 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <Image src="/1.jpg" alt="Our Services" width={250} height={150} className="rounded-md" />
              <h3 className="font-semibold text-lg mt-4">บริการของเรา</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                เรามีแพ็คเกจทัวร์ที่หลากหลาย ตั้งแต่การล่องเรือ ดำน้ำชมปะการัง ไปจนถึงกิจกรรมผจญภัยสุดเร้าใจ
              </p>
            </div>

            {/* ข้อ 3 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <Image src="/1.jpg" alt="Customer Satisfaction" width={250} height={150} className="rounded-md" />
              <h3 className="font-semibold text-lg mt-4">บริการที่เป็นมิตร ครอบคลุมทุกการเดินทาง</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                เราให้บริการที่เน้นความสะดวกสบาย และความปลอดภัยของลูกค้า พร้อมการดูแลระดับ VIP เพื่อให้การเดินทางของคุณพิเศษที่สุด
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
