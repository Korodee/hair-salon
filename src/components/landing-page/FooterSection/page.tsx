"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#1C0336] text-white overflow-hidden">
      {/* Background Curves */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1C0336"
            d="M0,192L60,176C120,160,240,128,360,112C480,96,600,96,720,112C840,128,960,160,1080,181.3C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
        {/* Left Section */}
        <div className="text-center lg:text-center">
          <h3 className="text-xl font-bold">Braidzworld</h3>
          <button className="mt-6 px-6 py-2 border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition">
            Contact Us
          </button>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-32 border-l border-pink-500"></div>

        {/* Middle Section (Navigation Links) */}
        <div className="text-center lg:text-left space-y-2">
          <div className="flex flex-col items-center font-bold text-sm space-y-2">
            <a href="#" className="hover:text-gray-300">
              HOME
            </a>
            <a href="#services" className="hover:text-gray-300">
              SERVICES
            </a>
            {/* <a href="#pricing" className="hover:text-gray-300">
              PRICING
            </a> */}
            <a href="#contact" className="hover:text-gray-300">
              CONTACT
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-32 border-l border-pink-500"></div>

        {/* Right Section (Social Icons) */}
        <div className="flex justify-center space-x-6 text-xl">
          <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
          <FaTwitter className="hover:text-pink-500 transition cursor-pointer" />
          <FaFacebook className="hover:text-pink-500 transition cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
