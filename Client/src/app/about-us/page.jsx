import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        <Image
          src="/hero.jpg"
          alt="Stunning Phuket view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-semibold text-white tracking-wide">About Us</h1>
          <p className="text-lg text-white mt-3 max-w-lg">
            Discover the heart of PET Sea Travel, where unforgettable Phuket experiences begin.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* WHO WE ARE */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-[#2A8470] mb-4">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              At PET Sea Travel, we are passionate about creating unique and memorable travel experiences in Phuket.
              Our carefully curated tours combine breathtaking landscapes, cultural heritage, and world-class service to
              ensure every journey is extraordinary.
            </p>
          </div>
          <div className="w-full md:w-[500px]">
            <Image
              src="/who-we-are.png"
              alt="Luxury travel experience"
              width={500}
              height={350}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* OUR EXPERIENCE */}
        <div className="my-20 bg-gray-100 p-12 rounded-lg text-center">
          <h2 className="text-3xl font-semibold text-[#2A8470] mb-4">Our Experience</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Since 2024, we have guided over 50,000 travelers through the stunning Andaman Sea.
            With a team of certified guides and local experts, we ensure a seamless and enriching journey.
          </p>
        </div>

        {/* WHY CHOOSE US */}
        <div>
          <h2 className="text-3xl font-semibold text-[#2A8470] text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image
                src="/team.jpg"
                alt="Professional team"
                width={400}
                height={250}
                className="rounded-md mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Expert Team</h3>
              <p className="text-gray-600 mt-2">
                Our licensed guides bring years of experience and deep local knowledge, ensuring a safe and enriching adventure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image
                src="/service.jpg"
                alt="Luxury travel service"
                width={400}
                height={250}
                className="rounded-md mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Premium Services</h3>
              <p className="text-gray-600 mt-2">
                From private yacht tours to cultural excursions, we provide top-tier experiences tailored to your needs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Image
                src="/insurance.jpg"
                alt="Travel insurance"
                width={400}
                height={250}
                className="rounded-md mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">Comprehensive Insurance</h3>
              <p className="text-gray-600 mt-2">
                Your safety is our priority. We offer full travel insurance covering all activities for worry-free exploration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (unchanged) */}
      <footer className="bg-[#2D776E] text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <Image
              src="/logoW.png"
              alt="PET Sea Travel Logo"
              width={170}
              height={90}
            />

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
              <Link href="#" className="hover:text-[#24685F]">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <MessageCircle className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-[#24685F]">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;