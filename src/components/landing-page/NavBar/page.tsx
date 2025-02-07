"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-6 z-20 bg-black/80 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">B</span>
        </div>
        <span className="text-lg font-semibold text-white">braidzworld</span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex gap-8 text-white font-medium">
        <a href="#" className="relative group">
          Home
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#services" className="relative group">
          Services
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#pricing" className="relative group">
          Pricing
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#contact" className="relative group">
          Contact
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* CTA Buttons - Desktop */}
      <div className="hidden md:flex gap-2">
        <Link href="/auth/signup">
          <button className="px-5 py-2 text-white ">Get Started</button>
        </Link>
        <Link href="/auth/login">
          <button className="px-5 py-2 bg-black text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            Log in
          </button>
        </Link>
      </div>

      {/* Hamburger Icon - Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-[90vh] bg-black/90 flex flex-col items-center justify-center text-white z-30">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-8 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <a href="#" className="text-xl py-2" onClick={toggleMobileMenu}>
            Home
          </a>
          <a
            href="#services"
            className="text-xl py-2"
            onClick={toggleMobileMenu}
          >
            Services
          </a>
          <a
            href="#pricing"
            className="text-xl py-2"
            onClick={toggleMobileMenu}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-xl py-2"
            onClick={toggleMobileMenu}
          >
            Contact
          </a>
          <div className="flex flex-col items-center gap-4 mt-6">
            <Link href="/auth/signup">
              <button className="px-5 py-2 border border-white rounded-lg">
                Get Started
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-5 py-2 bg-white text-black rounded-lg">
                Log in
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
