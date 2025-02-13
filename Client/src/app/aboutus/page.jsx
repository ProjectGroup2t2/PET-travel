import Image from "next/image"
import { User, Facebook, Instagram, MessageCircle, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src="/1.jpg"
          alt="Thai longtail boats"
          width={1200}
          height={400}
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">About us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {/* Who We Are Section */}
        <div className="relative bg-gray-50 rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-teal-800">WHO WE ARE?</h2>
            <User className="w-6 h-6 text-teal-800" />
          </div>
          <div className="grid md:grid-cols-[1fr,400px] gap-8">
            <p className="text-gray-600 leading-relaxed">
              เป็นบริษัททัวร์ชั้นนำในจังหวัดภูเก็ตที่เชี่ยวชาญในการให้บริการแพ็กเกจท่องเที่ยวสุดพิเศษ ไม่ว่าจะเป็นทัวร์เกาะ ทัวร์ดำน้ำ ทัวร์วัฒนธรรม
              และกิจกรรมผจญภัยต่าง ๆ เรามุ่งมั่นที่จะมอบประสบการณ์ที่ดีที่สุดให้กับนักท่องเที่ยว ทั้งชาวไทยและชาวต่างชาติ
              ให้ทุกการเดินทางเต็มไปด้วยความสุข ความสะดวก และความประทับใจ
            </p>
            <div className="relative h-[250px] w-full">
              <Image
                src="/1.jpg"
                alt="Beautiful beach"
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Our Experience Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">OUR EXPERIENCE</h2>
          <p className="text-gray-600 leading-relaxed">
            ก่อตั้งขึ้นในปี 2015 เรามีประสบการณ์ในอุตสาหกรรมท่องเที่ยวมากกว่า 9 ปี และให้บริการนักท่องเที่ยวมาแล้วกว่า 50,000 คน
            ทีมงานของเราประกอบด้วยไกด์มืออาชีพที่มีใบอนุญาต และผู้เชี่ยวชาญด้านการท่องเที่ยวที่รู้จักภูเก็ตเป็นอย่างดี ไม่ว่าคุณจะมองหาทัวร์ทะเลสวย ๆ
            หรือกิจกรรมแอดเวนเจอร์ที่เร้าใจ เราพร้อมดูแลคุณตลอดการเดินทาง
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div>
          <h2 className="text-2xl font-bold text-teal-800 text-center mb-12">WHY CHOOSE US?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="space-y-4">
              <div className="relative h-[200px]">
                <Image
                  src="/1.jpg"
                  alt="Professional guides"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-xl text-teal-800">ทีมไกด์มืออาชีพ</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ทีมไกด์ของเราคัดเลือกมาอย่างดีโดยเป็นผู้ที่มีความเชี่ยวชาญในสถานที่ท่องเที่ยวแต่ละแห่ง มีความรู้ลึกเกี่ยวกับประวัติศาสตร์ วัฒนธรรม
                และจุดเด่นของแต่ละสถานที่ รวมถึงสามารถให้คำแนะนำเกี่ยวกับกิจกรรมที่เหมาะสมสำหรับนักท่องเที่ยวแต่ละกลุ่ม
              </p>
            </div>

            {/* Card 2 */}
            <div className="space-y-4">
              <div className="relative h-[200px]">
                <Image
                  src="/1.jpg"
                  alt="Comprehensive services"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-xl text-teal-800">บริการครบวงจร</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                เรามอบประสบการณ์การท่องเที่ยวที่ไร้กังวลด้วยบริการรถรับ-ส่งจากโรงแรมหรือจุดนัดพบ อาหารและเครื่องดื่มที่ครอบคลุมทุกเมนู
                รวมถึงตัวเลือกพิเศษสำหรับมังสวิรัติและฮาลาล พร้อมอุปกรณ์ท่องเที่ยวครบครันสำหรับกิจกรรมต่างๆ
              </p>
            </div>

            {/* Card 3 */}
            <div className="space-y-4">
              <div className="relative h-[200px]">
                <Image
                  src="/1.jpg"
                  alt="Travel insurance"
                  width={400}
                  height={200}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-xl text-teal-800">ประกันการเดินทาง ครอบคลุมทุกกรณี</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                เรายังมีประกันการเดินทางเพื่อเพิ่มความมั่นใจให้กับลูกค้า ทุกแพ็กเกจทัวร์ของเรารวมประกันการเดินทาง ที่ครอบคลุม อุบัติเหตุ
                ค่ารักษาพยาบาล และกรณีฉุกเฉิน โดยลูกค้าจะได้รับความคุ้มครองตลอดการเดินทาง
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image src="/1.jpg" alt="PET Sea Travel Logo" width={100} height={50} className="h-12 w-auto" />
            <div className="text-gray-600 text-sm text-center md:text-left">
              15 KANCHANAWANICH ROAD, KHO HONG, HAT YAI DISTRICT, SONGKHLA 90110, THAILAND
            </div>
            <div className="flex items-center gap-4">
              <div className="text-gray-600">
                +1 234 567 890
                <br />
                EMAIL@GMAIL.COM
              </div>
              <div className="flex gap-4">
                <Facebook className="w-6 h-6 text-gray-600" />
                <Instagram className="w-6 h-6 text-gray-600" />
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <Twitter className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

