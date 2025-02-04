"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

const AboutUsSection: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 max-w-5xl mx-auto px-6 py-16">
      {/* Left Section: Text */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">About us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad.
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
      <div className="lg:w-1/2 flex items-center justify-center gap-6">
        <div className="flex flex-col gap-6">
          <img
            src="/img/staff1.png"
            alt="Stylist 1"
            className="rounded-xl w-40 h-60 object-cover"
          />
          <img
            src="/img/staff2.png"
            alt="Salon"
            className="rounded-xl w-40 h-60 object-cover"
          />
        </div>
        <img
          src="/img/staff3.png"
          alt="Stylist 2"
          className="rounded-xl w-40 h-60 object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUsSection;
