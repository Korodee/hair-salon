"use client";

import React, { useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";

const GetInTouch: React.FC = () => {
  return (
    <div id="contact" className="max-w-2xl mx-auto px-6 py-16">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
        <p className="text-lg text-gray-600">
          There are many variations of passages of Lorem Ipsum available, but
          hair is what matters.
        </p>
      </div>

      {/* Form Section */}
      <form className="md:bg-white md:shadow-lg rounded-lg md:p-8 space-y-6">
        <div className="space-y-4">
          {/* First Name Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="First name"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-0 focus:border-indigo-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaUser size={20} />
            </span>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-0 focus:border-indigo-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaEnvelope size={20} />
            </span>
          </div>

          {/* Phone Field */}
          <div className="relative">
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-0 focus:border-indigo-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaPhone size={20} />
            </span>
          </div>

          {/* Service of Interest Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Service of your interest"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-0 focus:border-indigo-500"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaClipboardList size={20} />
            </span>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              placeholder="A message for korode Salon"
              rows={4}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-0 focus:border-indigo-500"
            ></textarea>
            <span className="absolute left-4 top-4 text-gray-400">
              <FaCommentDots size={20} />
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 text-white bg-[#171A31] rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default GetInTouch;
