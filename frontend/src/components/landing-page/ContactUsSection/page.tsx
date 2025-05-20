"use client";

import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaCommentDots,
} from "react-icons/fa";

const GetInTouch: React.FC = () => {
  return (
    <div id="contact" className="mx-auto max-w-4xl px-4 md:px-6 py-20">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          Entrons en contact
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Que vous cherchiez une consultation ou que vous soyez prêt à
          collaborer, nous serions ravis de vous entendre. Faites-nous savoir
          comment nous pouvons vous aider à concrétiser votre vision.
        </p>
      </div>

      {/* Form Card Wrapper */}
      <div className="md:bg-white md:shadow-xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left - Contact Info / Graphic Section */}
          <div className="hidden md:flex flex-col justify-center relative bg-[#171A31] text-white px-8 py-12 overflow-hidden rounded-lg shadow-xl">
            {/* Background Gradient Pops */}
            <div className="absolute w-48 h-48 bg-[#FB3CB2] rounded-full blur-[100px] opacity-40 top-[-50px] left-[-50px]"></div>
            <div className="absolute w-32 h-32 bg-[#FB3CB2] rounded-full blur-[90px] opacity-30 bottom-4 right-4"></div>
            <div className="absolute w-20 h-20 bg-[#FB3CB2] rounded-full blur-[60px] opacity-25 top-1/3 left-1/2 transform -translate-x-1/2"></div>

            {/* Content */}
            <h3 className="text-4xl font-bold mb-6 relative z-10">
              Discutons-en !
            </h3>
            <p className="text-lg opacity-90 mb-8 relative z-10">
              Contactez-nous et créons quelque chose d’extraordinaire ensemble.
            </p>
            <div className="space-y-5 relative z-10">
              <div className="flex items-center space-x-4">
                <FaPhone className="text-pink-400" />
                <span className="text-white text-lg">+123 456 7890</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-pink-400" />
                <span className="text-white text-lg">doukagag@outlook.com</span>
              </div>
            </div>
          </div>

          {/* Right - Form Section */}
          <form className="md:p-8 space-y-6 md:bg-gray-50">
            {/* Input Wrapper */}
            <div className="space-y-4 p-2 md:bg-gray-50">
              {/* Full Name */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaUser size={18} />
                </span>
                <input
                  type="text"
                  placeholder=" Nom Complet"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaEnvelope size={18} />
                </span>
                <input
                  type="email"
                  placeholder="Adresse E-mail"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaPhone size={18} />
                </span>
                <input
                  type="tel"
                  placeholder="Numéro de Téléphone"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Service of Interest */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaClipboardList size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Service Qui Vous Intéresse"
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">
                  <FaCommentDots size={18} />
                </span>
                <textarea
                  placeholder="Votre Message"
                  rows={5}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 text-white bg-black rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-[1.02] shadow-lg"
            >
              Envoyer le Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
