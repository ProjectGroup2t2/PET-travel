import { AdminHeader } from "@/components/ui/admin/header";

export default function ToursPage() {
  const tours = [
    { id: 1, name: "เมืองเก่าภูเก็ต", price: "THB 4,990", image: "/1.jpg"},
    { id: 2, name: "เกาะเฮ", price: "THB 5,500", image: "/2.jpg"},
    { id: 3, name: "เกาะไม้ท่อน", price: "THB 3,990", image: "/2.jpg" },
  ];

  return (
     <div className="flex-1">
          <AdminHeader title="Tours Management" />
          <div className="text-3xl font-bold text-[#2A8470] p-2 ">Add Tour </div>
          {/* Tour Listings */}
      {/* Grid of Tours */}
      <div className="grid grid-cols-4 gap-6">
        {/* Tour Cards */}
        {tours.map((tour) => (
          <div key={tour.id} className="border rounded-xl shadow-lg p-4">
            <img src={tour.image} alt={tour.name} className="w-full h-40 rounded-lg object-cover mb-2" />
            <h3 className="text-lg font-semibold">{tour.name}</h3>
            <p className="text-blue-600">{tour.price}</p>
          </div>
        ))}
        
        {/* Add Tour Card */}
        <div className="border rounded-xl shadow-lg p-4 flex flex-col items-center justify-center bg-gray-50 text-gray-500">
          <span className="text-4xl"></span>
          <p>Add your tour</p>
          <button className="text-lg font-bold text-gray-600">+</button>
        </div>
      </div>
    </div>
  );
}
