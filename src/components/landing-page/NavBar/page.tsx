"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide navbar
        setHidden(true);
      } else {
        // Scrolling up, show navbar
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 md:px-16 py-5 z-20 bg-gradient-to-r from-black/90 via-black/70 to-black/90 backdrop-blur-lg shadow-md transition-transform duration-300 
    ${hidden ? "-translate-y-full" : "translate-y-0"}
  `}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-lg font-bold">B</span>
        </div>
        <span className="text-xl font-semibold text-white tracking-wide">
          Braidzworld
        </span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex gap-10 ml-20 text-white font-medium">
        {["Accueil", "Services", "FAQ", "Contact"].map((item, index) => (
          <a
            key={item}
            href={`#${["home", "services", "faq", "contact"][index]}`}
            className="relative group text-white tracking-wide"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* CTA Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/auth/signup">
          <button className="px-5 py-2 text-white font-medium tracking-wide transition-all duration-300 ease-in-out hover:text-gray-400">
            Commencer
          </button>
        </Link>
        <Link href="/auth/login">
          <button className="px-5 py-2 bg-white/20 border border-white/30 text-white font-medium rounded-lg transition-all duration-300 ease-in-out hover:bg-white/30 hover:scale-105 hover:shadow-lg">
            Se connecter
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
        <div className="fixed top-0 left-0 w-full min-h-[100svh] bg-black/90 flex flex-col items-center justify-center text-white z-30">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-8 text-white text-2xl"
          >
            <FaTimes />
          </button>
          {["Accueil", "Services", "Tarifs", "Contact"].map((item, index) => (
            <a
              key={item}
              href={`#${["home", "services", "pricing", "contact"][index]}`}
              className="text-xl py-2"
              onClick={toggleMobileMenu}
            >
              {item}
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 mt-6">
            <Link href="/auth/signup">
              <button className="px-5 py-2 border border-white rounded-lg">
                Commencer
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-5 py-2 bg-white text-black rounded-lg">
                Se connecter
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
