"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-6 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">K</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">
          Korode Salon
        </span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex gap-8 text-black font-medium">
        <a href="#" className="hover:text-gray-600">
          Home
        </a>
        <a href="#services" className="hover:text-gray-600">
          Services
        </a>
        <a href="#pricing" className="hover:text-gray-600">
          Pricing
        </a>
        <a href="#contact" className="hover:text-gray-600">
          Contact
        </a>
      </div>

      {/* CTA Buttons - Desktop */}
      <div className="hidden md:flex gap-2">
        <button className="px-5 py-2 text-black">Get Started</button>
        <button className="px-5 py-2 bg-black text-white rounded-lg">
          Log in
        </button>
      </div>

      {/* Hamburger Icon - Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-900 focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[4.5rem] left-0 w-full bg-white shadow-lg py-4 rounded-lg z-20">
          <div className="flex flex-col items-center gap-4 text-gray-800 font-medium">
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
            <a href="#services" className="hover:text-gray-600">
              Services
            </a>
            <a href="#pricing" className="hover:text-gray-600">
              Pricing
            </a>
            <a href="#contact" className="hover:text-gray-600">
              Contact
            </a>
          </div>

          {/* Horizontal line separator */}
          <hr className="my-4 mx-auto w-3/4 border-t-2 border-gray-300" />

          <div className="flex flex-col items-center gap-4 mt-4">
            <button className="px-5 py-2 text-black">Get Started</button>
            <button className="px-5 py-2 bg-black text-white rounded-lg">
              Log in
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
