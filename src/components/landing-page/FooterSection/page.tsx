"use client";

import React from "react";
import { FaInstagram, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black/90 text-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
        {/* Left Section */}
        <div className="text-center lg:text-center">
          <h3 className="text-xl font-bold">Braidzworld</h3>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=doukagag@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-2 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition"
          >
            Contact Us
          </a>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-32 border-l border-purple-300"></div>

        {/* Middle Section (Navigation Links) */}
        <div className="text-center lg:text-left space-y-2">
          <div className="flex flex-col items-center font-bold text-sm space-y-2">
            <a href="#" className="hover:text-gray-300">
              HOME
            </a>
            <a href="#services" className="hover:text-gray-300">
              SERVICES
            </a>
            <a href="#faq" className="hover:text-gray-300">
              FAQ
            </a>
            <a href="#contact" className="hover:text-gray-300">
              CONTACT
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-32 border-l border-purple-300"></div>

        {/* Right Section (Social Icons + Address) */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center space-x-6 text-xl">
            <a
              href="https://www.instagram.com/braidz_world/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@braidz_world?_t=ZS-8uLUJAZGEAq&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 transition"
            >
              <FaTiktok />
            </a>
            <FaFacebook className="hover:text-purple-500 transition cursor-pointer" />
          </div>
          {/* Address */}
          <p className="text-sm text-gray-400 text-center flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-purple-500" />
            <span>QC | 1999, 24e rue</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
