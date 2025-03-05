"use client"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Calendar, Star, Heart } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Footer from '../app/footer/page';
import conf from "../../conf";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [tourCards, setTourCards] = useState([])
  const [loading, setLoading] = useState(true)

  const heroImages = ["/1.jpg", "/login-pic.png", "/hero.jpg"]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }, [heroImages])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || `${conf.apiPrefix}`}/api/packages?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const formattedData =
          data?.data?.map((item) => ({
            id: item.id,
            image: item?.image?.[0]?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL || `${conf.apiPrefix}`}${item.image[0].url}`
              : "/placeholder.svg",
            title: item?.title || "No Title",
            duration: item?.duration || "N/A",
            capacity: item?.capacity || 0,
            capacity_max: item?.capacity_max || 0,
            price: item?.price ? `THB ${item.price.toLocaleString()}` : "THB X,XXX",
          })) || []

        setTourCards(formattedData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
        setLoading(false)
      })
  }, [])

  const reviews = [
    {
      rating: 4,
      author: "ธงชัย ชอบมาก พลเมือง",
      text: "ไกด์นำเที่ยวเก่งมาก ให้การบริการดีมาก เที่ยว ก็สนุก",
      time: "1 hour ago",
    },
    {
      rating: 4,
      author: "สวัสดีทุกคน มาแชทกัน",
      text: "บริการดีมาก 5 ดาวเต็ม เดินทางสนุก คุ้มค่าเงินไปเลย",
      time: "1 hour ago",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide] || "/placeholder.svg"}
              alt="Hero image"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl text-white font-bold mb-4 text-center"
          >
            Let's go with PET
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-xl mb-8 text-center"
          >
            Plan better with travel experiences!
          </motion.p>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition-colors p-2 rounded-full text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition-colors p-2 rounded-full text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tours Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center text-5xl font-bold text-[#2A8470] mb-8"
        >
          Tours
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {tourCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/Package/${card.id}`}>
                  <motion.div
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div className="relative h-48">
                      <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                      <button
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full z-10"
                        onClick={(e) => {
                          e.preventDefault()
                          // Add to favorites logic here
                        }}
                      >
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{card.title}</h3>
                        <span className="text-gray-500">
                          {card.capacity}/{card.capacity_max}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{card.duration}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">from</span>
                        <span className="text-xl font-bold text-blue-600 ml-1">{card.price}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Free Cancellation Section */}
      <div className="bg-gray-50 py-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl font-bold text-[#2A8470] mb-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              Free cancellation
            </motion.h2>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              You'll receive a full refund if you cancel at least
              <br />
              24 hours in advance of most experiences.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-2">Excellent</h3>
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: -30, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Star className="w-8 h-8 text-[#2A8470] fill-current" />
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">Based on 12,241 reviews</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#2A8470] fill-current" />
                  ))}
                </div>
                <p className="font-semibold mb-1">{review.author}</p>
                <p className="text-gray-600 text-sm mb-2">{review.text}</p>
                <p className="text-gray-400 text-sm">{review.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Homepage

