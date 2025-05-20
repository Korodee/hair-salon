"use client";

import React from "react";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { icon: FaInstagram, link: "https://www.instagram.com/braidz_world/" },
  {
    icon: FaTiktok,
    link: "https://www.tiktok.com/@braidz_world?_t=ZS-8uLUJAZGEAq&_r=1",
  },
  { icon: FaFacebook, link: "#" }, // Add Facebook link when available
];

const Footer: React.FC = () => {
  const logoText = "Braidzworld";
  const address = "QC | 1999, 24e rue";
  const contactEmail = "doukagag@outlook.com";

  return (
    <footer className="relative bg-gray-900 text-white pt-12 pb-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-12 lg:space-y-0">
        {/* Logo & Contact Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">B</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-semibold tracking-wide text-white">
              {logoText}
            </span>
          </div>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-8 py-2 border border-gray-400 rounded-full text-white text-sm font-medium tracking-wide transition transform hover:scale-105 hover:bg-purple-600 hover:border-purple-600"
          >
            Contactez-nous
          </a>
        </div>

        {/* Navigation Links */}
        <div className="text-center lg:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">
            Liens rapides
          </h4>
          <nav className="flex flex-col space-y-2 text-sm font-medium text-center text-gray-400">
            <a href="#" className="hover:text-white transition">
              Accueil
            </a>
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </nav>
        </div>

        {/* Social Links & Address */}
        <div className="text-center space-y-6">
          <h4 className="text-lg font-semibold text-white">Suivez-nous</h4>
          <div className="flex justify-center space-x-6">
            {socialLinks.map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-purple-500 transition transform hover:scale-110"
              >
                <Icon />
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="purplePinkGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 13.25 9.75 19.92 11.39 21.88C11.72 22.3 12.27 22.3 12.6 21.88C14.25 19.92 19 13.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="url(#purplePinkGradient)"
              />
            </svg>

            <span className="text-sm">{address}</span>
          </div>
        </div>
      </div>

      {/* Bottom Divider & Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {logoText}. Tous droits réservés.
        </p>
      </div>

      {/* Decorative Gradient Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-700 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-pink-500 opacity-30 blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
