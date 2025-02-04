"use client";
import NavBar from "@/components/landing-page/NavBar/page";
import Image from "next/image";
import heroImage from "../../../../public/img/heroImage.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-20 bg-gradient-to-r from-gray-100 to-[#8c38e7]">
      {/* NavBar */}
      <NavBar />

      {/* Hero Content */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between mt-10 md:mt-20">
        {/* Left Image (Hidden on Mobile) */}
        <div
          className="hidden md:flex w-2/3 justify-center"
          data-aos="fade-right"
        >
          <Image
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div
          className="w-full md:w-1/3 max-w-lg text-center md:text-left"
          data-aos="fade-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Graceful Hair <br />
            <span className="text-gray-900">Truly, yours.</span>
          </h1>
          <p className="text-gray-200 mt-4 text-base md:text-lg">
            Good hair gets you anywhere. We are more than a salon, we are a
            creative space where we give you a whole new hair experience.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
            Book an appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
