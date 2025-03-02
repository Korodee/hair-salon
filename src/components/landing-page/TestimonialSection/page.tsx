"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  location: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amélie Tremblay",
    location: "Limoilou, Quebec City",
    title: "The only place I trust with my braids",
    message:
      "I’m so glad I found BraidzWorld. They treat my hair with so much care and the braids are always flawless — neat, stylish, and they last forever!",
    image: "/img/testimonialImage1.png",
  },
  {
    id: 2,
    name: "Sofia Desjardins",
    location: "Saint-Roch, Quebec City",
    title: "My hair feels like art every time",
    message:
      "BraidzWorld doesn’t just braid hair, they create masterpieces. Every visit is a confidence boost — and they make sure you leave happy.",
    image: "/img/about1.jpg",
  },
  {
    id: 3,
    name: "Ethan Bélanger",
    location: "Montcalm, Quebec City",
    title: "Top-notch service every time",
    message:
      "From the friendly staff to the precision in every braid, BraidzWorld is in a league of its own. My hair has never looked better.",
    image: "/img/gal6.jpg",
  },
  {
    id: 4,
    name: "Olivia Bouchard",
    location: "Charlesbourg, QC",
    title: "BraidzWorld is a vibe and a half",
    message:
      "They always get my vision just right — from boho braids to classic cornrows. Plus, the atmosphere is so fun and welcoming!",
    image: "/img/about3.jpg",
  },
  {
    id: 5,
    name: "Nathan Gagnon",
    location: "Beauport, QC",
    title: "Best braiding experience in Quebec City",
    message:
      "The stylists at BraidzWorld are incredibly skilled. My braids are always clean, even, and comfortable — no tightness or pain. Highly recommend.",
    image: "/img/about1.jpg",
  },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, location, title, message, image } = testimonials[currentIndex];

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#171A31] py-8">
      {/* Top Pops */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>

      {/* Centered content */}
      <div
        className="flex flex-col px-6 md:px-16 py-6 items-center gap-6 relative z-10"
        data-aos="fade-right"
      >
        <h3 className="text-3xl font-extrabold text-white">Testimonials</h3>

        <div className="py-8 lg:py-12 text-white p-8 rounded-xl max-w-4xl w-full flex flex-col md:flex-row h-[600px] md:h-[320px] overflow-hidden relative">
          {/* Background Pops inside card */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#FB3CB2] rounded-full blur-2xl opacity-60 hidden md:block"></div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FB3CB2] rounded-full blur-2xl opacity-60 hidden md:block"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#FB3CB2] rounded-full blur-2xl opacity-60 hidden md:block"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FB3CB2] rounded-full blur-2xl opacity-60 hidden md:block"></div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex w-full h-full flex-col md:flex-row items-center"
            >
              <div className="relative w-full md:w-1/3 flex items-center justify-center mb-6 md:mb-0">
                <div className="absolute z-[-1] bg-[#FB3CB2] w-8 h-[8rem] rounded-full left-[0rem] top-0 hidden md:block"></div>
                <div className="absolute z-[-1] bg-[#FB3CB2] w-8 h-[16rem] rounded-full left-[2.5rem] hidden md:block"></div>

                <Image
                  src={image}
                  alt={name}
                  width={160}
                  height={160}
                  className="w-40 h-40 rounded-full border-4 border-white object-cover"
                />
              </div>

              <div className="w-full md:w-2/3 pl-0 md:pl-8 flex flex-col justify-center">
                <h4 className="text-lg font-semibold text-center md:text-left">
                  {name}
                </h4>
                <p className="text-sm text-gray-300 text-center md:text-left">
                  {location}
                </p>
                <h3 className="text-2xl font-semibold mt-3 text-center md:text-left">
                  {title}
                </h3>
                <p className="text-gray-400 mt-2 text-center md:text-left">
                  “{message}”
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center bg-[#FB3CB2] rounded-full text-white text-xl transition-all duration-200 ease-in-out hover:bg-[#e0329e] hover:scale-110 hover:shadow-md active:scale-95"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full text-xl transition-all duration-200 ease-in-out hover:bg-[#FB3CB2] hover:text-white hover:scale-110 hover:shadow-md active:scale-95"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Bottom Pops */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>
    </div>
  );
};

export default TestimonialSection;
