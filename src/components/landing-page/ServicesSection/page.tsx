"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";

const servicesData = [
  {
    icon: "/img/service1.jpg",
    title: "Maquillage & Beauté",
    description:
      "Sublimez votre beauté naturelle avec des services de maquillage adaptés à votre style unique.",
  },
  {
    icon: "/img/about3.jpg",
    title: "Coupes & Coiffures",
    description:
      "Coupes précises, coiffures créatives et soins personnalisés pour des cheveux sublimes à chaque mouvement.",
  },
  {
    icon: "/img/gal1.jpg",
    title: "Massages & Bien-être",
    description:
      "Détendez-vous, ressourcez-vous et rechargez-vous avec des soins spa luxueux conçus pour vous dorloter.",
  },
];

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100, // Trigger animation slightly earlier
      easing: "ease-out",
    });
  }, []);

  return (
    <section
      id="services"
      className="relative py-16 text-center px-6 bg-[#171A31]"
    >
      {/* Pops */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FB3CB2] rounded-full blur-3xl opacity-30"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">
        <h2
          className="text-3xl font-extrabold text-white leading-tight"
          data-aos="fade-up"
        >
          Nos Services
        </h2>
        <p
          className="text-white mt-3 text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Découvrez des soins professionnels conçus pour révéler le meilleur de
          vous-même — de la tête aux pieds.
        </p>

        {/* Services Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-3 transition duration-500 ease-in-out"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={400}
                  height={192} // 16:9 ratio
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={index < 3} // Prioritize first 3 images
                />
              </div>

              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full group-hover:w-32 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
