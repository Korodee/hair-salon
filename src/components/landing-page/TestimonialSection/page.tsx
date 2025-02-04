"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    location: "Miami, El Salvador",
    message:
      "It is a long established fact that a reader will be distracted by the readable content of a page is when looking at its layout. The point of using Lorem of distribution it look like readable English.",
    image: "/img/testimonialImage1.png",
  },
  {
    id: 2,
    name: "John Doe",
    location: "New York, USA",
    message:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It has survived not only five centuries, but also the leap into electronic typesetting.",
    image: "/img/about2.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    location: "London, UK",
    message:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    image: "/img/about1.jpg",
  },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, location, message, image } = testimonials[currentIndex];

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  return (
    <div
      className="flex flex-col px-6 py-6 items-center gap-6"
      data-aos="fade-right"
    >
      {/* Testimonial Content */}
      <h3 className="text-3xl font-extrabold text-[#171A31]">Testimonials</h3>
      <div className="bg-[#1E0536] z-0 py-12 text-white p-8 rounded-xl max-w-4xl w-full flex flex-col md:flex-row h-[600px] md:h-[300px]">
        {/* Left: Image Section */}
        <div className="relative w-full md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
          <div className="absolute z-[-1] bg-[#FB3CB2] w-8 h-[8rem] rounded-full left-[0rem] top-0 hidden md:block"></div>
          <div className="absolute z-[-1] bg-[#FB3CB2] w-8 h-[16rem] rounded-full left-[2.5rem] hidden md:block"></div>

          <Image
            src={image}
            alt={name}
            width={160} // Set width for the image
            height={160} // Set height for the image
            className="w-40 h-40 rounded-full border-4 border-white"
          />
        </div>

        {/* Right: Text Section */}
        <div className="w-full md:w-2/3 pl-0 md:pl-8 flex flex-col justify-center">
          <h4 className="text-lg font-semibold text-center md:text-left">
            {name}
          </h4>
          <p className="text-sm text-gray-300 text-center md:text-left">
            {location}
          </p>
          <h3 className="text-2xl font-semibold mt-3 text-center md:text-left">
            {name} has been my home for hair for years
          </h3>
          <p className="text-gray-400 mt-2 text-center md:text-left">
            “ {message} ”
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          className="w-9 h-9 flex items-center justify-center bg-[#FB3CB2] rounded-full text-white text-xl transition-all duration-300 ease-in-out hover:bg-[#e0329e] hover:scale-110 hover:shadow-md active:scale-95"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 flex items-center justify-center bg-[#1A2D61] rounded-full text-white text-xl transition-all duration-300 ease-in-out hover:bg-[#162652] hover:scale-110 hover:shadow-md active:scale-95"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSection;
