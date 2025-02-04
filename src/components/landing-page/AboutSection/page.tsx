"use client";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image"; // Importing Image component

const AboutUsSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 max-w-5xl mx-auto px-6 py-16">
      {/* Left Section: Text */}
      <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">About us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.
        </p>
        <div className="flex items-center justify-center lg:justify-start gap-4 bg-white shadow-md rounded-lg p-4 max-w-sm">
          <div className="text-3xl font-bold text-gray-900">5.0</div>
          <div className="border-l border-gray-300 pl-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">4700+ Reviews</p>
          </div>
        </div>
      </div>

      {/* Right Section: Images */}
      <div
        className="lg:w-1/2 flex items-center justify-center gap-6"
        data-aos="fade-left" // Add AOS animation to this section
      >
        <div className="flex flex-col gap-6">
          <div className="relative w-40 h-60">
            <Image
              src="/img/about1.jpg"
              alt="Stylist 1"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
          <div className="relative w-40 h-60">
            <Image
              src="/img/about2.jpg"
              alt="Salon"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="relative w-40 h-60">
          <Image
            src="/img/about3.jpg"
            alt="Stylist 2"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
