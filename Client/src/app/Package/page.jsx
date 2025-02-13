import Image from "next/image";
import { Calendar, Star } from 'lucide-react';

const Package = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb */}

      <h1 className="text-4xl font-bold mb-8">All Tour package</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">When are you traveling?</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Select Dates" 
                className="w-full p-2 border rounded-lg"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Price</h2>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span>1500 THB</span>
              <span>10000 THB</span> 
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Rating</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="rating" value="5" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                </div>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="rating" value="4" />
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                  <span className="ml-2">& up</span>
                </div>
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Time of Tour</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <div>
                  <div>Morning</div>
                  <div className="text-sm text-gray-500">Start 8:00 to 12:00</div>
                </div>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <div>
                  <div>Afternoon</div>
                  <div className="text-sm text-gray-500">After 13:00 to 15:00</div>
                </div>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <div>
                  <div>All day</div>
                  <div className="text-sm text-gray-500">Start 8:00 to 15:00</div>
                </div>
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold mb-4">Specials</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>อาหารฮาลาล</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>ไกด์ภาษาอังกฤษ</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>ที่นั่งสำหรับเด็กเล็ก</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>ทัวร์ส่วนตัว</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>ต้องการรถมารับหลังทำหมดการ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tour Listings */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div>3 results</div>
            <select className="border rounded-md p-2">
              <option>Featured</option>
            </select>
          </div>

          {/* Tour Cards */}
          {[1, 2, 3].map((tour) => (
            <div key={tour} className="border rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/1.jpg"
                    alt="Tour image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="font-semibold">4.0</span>
                      <span className="text-gray-500">(204)</span>
                    </div>
                    <div className="text-gray-500">50/60</div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">ภูเก็ต</h3>
                  <p className="text-gray-600 mb-4">
                    เมืองท่าภูเก็ตเป็นสถานที่ที่เต็มไปด้วยประวัติศาสตร์และเสน่ห์เฉพาะตัว
                    อาคารบ้านเรือนในย่านเมืองเก่าของภูเก็ตมีสไตล์ชิโน-โปรตุกีส (Sino-Portuguese)
                    ซึ่งผสมผสานระหว่างสถาปัตยกรรมยุโรปและจีนไว้อย่างลงตัว
                    จุดเด่นคือคนที่นี่เป็นมิตรต่อการสัมผัสใกล้ ร้านค้าทำเก่าแก่ และบรรยากาศที่ย้อนยุค
                  </p>
                  <div className="flex items-center gap-4 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>2 วัน 1 คืน</span>
                    </div>
                    <div>Free Cancellation</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">THB X,XXX</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Package;