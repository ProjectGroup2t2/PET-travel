// TourCard.js
import Image from "next/image";
import Link from "next/link";
import { Calendar, Star } from 'lucide-react';
import { motion } from "framer-motion";

const TourCard = ({ tour, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border rounded-lg overflow-hidden"
    >
      <Link href={`/Package/${tour.id}`} className="grid md:grid-cols-3 gap-4">
        <div className="relative h-64 md:h-full">
          <Image
            src={tour.image || "/placeholder.svg"}
            alt={`${tour.name} tour image`}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 md:col-span-2">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">{tour.rating.toFixed(1)}</span>
              <span className="text-gray-500">({tour.reviews})</span>
            </div>
            <div className="text-gray-500">
              {tour.capacity.current}/{tour.capacity.total}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{tour.name}</h3>
          <p className="text-gray-600 mb-4">
            {typeof tour.description === 'string'
              ? tour.description
              : tour.description?.[0]?.children?.[0]?.text || "No description available"}
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{tour.duration}</span>
            </div>
            <div>Free Cancellation</div>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">
            THB {tour.price.toLocaleString()}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TourCard;