"use client"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react"
import { motion } from "framer-motion"

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        <Image src="/hero.jpg" alt="Stunning Phuket view" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-semibold text-white tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg text-white mt-3 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover the heart of PET Sea Travel, where unforgettable Phuket experiences begin.
          </motion.p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* WHO WE ARE */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1">
            <motion.h2
              className="text-3xl font-semibold text-[#2A8470] mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Who We Are
            </motion.h2>
            <motion.p
              className="text-gray-600 leading-relaxed text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              At PET Sea Travel, we are passionate about creating unique and memorable travel experiences in Phuket. Our
              carefully curated tours combine breathtaking landscapes, cultural heritage, and world-class service to
              ensure every journey is extraordinary.
            </motion.p>
          </div>
          <motion.div
            className="w-full md:w-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Image
              src="/who-we-are.png"
              alt="Luxury travel experience"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* OUR EXPERIENCE */}
        <motion.div
          className="my-20 bg-gray-100 p-12 rounded-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-semibold text-[#2A8470] mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Experience
          </motion.h2>
          <motion.p
            className="text-gray-700 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Since 2024, we have guided over 50,000 travelers through the stunning Andaman Sea. With a team of certified
            guides and local experts, we ensure a seamless and enriching journey.
          </motion.p>
        </motion.div>

        {/* WHY CHOOSE US */}
        <div>
          <motion.h2
            className="text-3xl font-semibold text-[#2A8470] text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                src: "/team.jpg",
                alt: "Professional team",
                title: "Expert Team",
                description:
                  "Our licensed guides bring years of experience and deep local knowledge, ensuring a safe and enriching adventure.",
              },
              {
                src: "/service.jpg",
                alt: "Luxury travel service",
                title: "Premium Services",
                description:
                  "From private yacht tours to cultural excursions, we provide top-tier experiences tailored to your needs.",
              },
              {
                src: "/insurance.jpg",
                alt: "Travel insurance",
                title: "Comprehensive Insurance",
                description:
                  "Your safety is our priority. We offer full travel insurance covering all activities for worry-free exploration.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src={card.src || "/placeholder.svg"}
                  alt={card.alt}
                  width={400}
                  height={250}
                  className="rounded-md mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{card.title}</h3>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2D776E] text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <Image src="/logoW.png" alt="PET Sea Travel Logo" width={170} height={90} />

            {/* Contact Info */}
            <div className="text-center">
              <p className="font-semibold">Contact us</p>
              <p>yimwired@gmail.com</p>
            </div>

            {/* About */}
            <div className="text-center">
              <p className="font-semibold">About</p>
              <p>@PET2025</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[Facebook, Instagram, MessageCircle, Twitter].map((Icon, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="#" className="hover:text-[#24685F]">
                    <Icon className="w-6 h-6" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default AboutUs

