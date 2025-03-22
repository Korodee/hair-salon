"use client";
import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";

interface Service {
  icon: string;
  title: string;
  details?: { style: string; duration: string; price: string }[];
  variations?: {
    short: { style: string; duration: string; price: string }[];
    long: { style: string; duration: string; price: string }[];
  };
}

const servicesData: Service[] = [
  {
    icon: "/img/twists.png",
    title: "Twists",
  },
  {
    icon: "/img/cornrows.png",
    title: "Cornrows",
    details: [
      {
        style: "2-10 Straight Cornrows",
        duration: "4 heures 30 minutes",
        price: "$130.00 CAD",
      },
      {
        style: "12-16 Straight Cornrows",
        duration: "4 heures 30 minutes",
        price: "$170.00 CAD",
      },
      {
        style: "Freestyle Cornrows",
        duration: "6 heures 30 minutes",
        price: "$200.00 CAD",
      },
    ],
  },
  {
    icon: "/img/invicible-locs.png",
    title: "Invisible Locs",
    details: [
      {
        style: "Small Locs",
        duration: "6 heures 30 minutes",
        price: "$225.00 CAD",
      },
      {
        style: "Smedium Locs",
        duration: "5 heures 30 minutes",
        price: "$180.00 CAD",
      },
    ],
  },
  {
    icon: "/img/knotless-braids.png",
    title: "Knotless Braids",
    variations: {
      short: [
        {
          style: "X Small Knotless",
          duration: "12 heures",
          price: "$350.00 CAD",
        },
        {
          style: "Small Knotless",
          duration: "8 heures 30 minutes",
          price: "$225.00 CAD",
        },
        {
          style: "SMedium Knotless",
          duration: "6 heures 30 minutes",
          price: "$180.00 CAD",
        },
        {
          style: "Medium Knotless",
          duration: "5 heures 30 minutes",
          price: "$140.00 CAD",
        },
        {
          style: "Large Knotless",
          duration: "3 heures 30 minutes",
          price: "$100.00 CAD",
        },
      ],
      long: [
        {
          style: "X Small knotless",
          duration: "15 heures",
          price: "$450.00 CAD",
        },
        {
          style: "Small Knotless",
          duration: "10 heures",
          price: "$350.00 CAD",
        },
        {
          style: "SMedium Knotless",
          duration: "7 heures 30 minutes",
          price: "$230.00 CAD",
        },
        {
          style: "Medium Knotless",
          duration: "6 heures 30 minutes",
          price: "$190.00 CAD",
        },
        {
          style: "Large Knotless",
          duration: "4 heures 30 minutes",
          price: "$160.00 CAD",
        },
      ],
    },
  },
  {
    icon: "/img/sen-twists.png",
    title: "Senegalese Twists",
    variations: {
      short: [
        {
          style: "Short Twist",
          duration: "7 heures 30 minutes",
          price: "$200.00 CAD",
        },
        {
          style: "Smedium Twist",
          duration: "6 heures 30 minutes",
          price: "$180.00 CAD",
        },
        {
          style: "Medium Twist",
          duration: "6 heures",
          price: "$140.00 CAD",
        },
        {
          style: "Large Twist",
          duration: "4 heures 30 minutes",
          price: "$100.00 CAD",
        },
      ],
      long: [
        { style: "Small Twist", duration: "9 heures", price: "$300.00 CAD" },
        {
          style: "Smedium Twist",
          duration: "7 heures 30 minutes",
          price: "$225.00 CAD",
        },
        {
          style: "Medium Twist",
          duration: "5 heures 30 minutes",
          price: "$190.00 CAD",
        },
        {
          style: "Large Twist",
          duration: "4 heures 30 minutes",
          price: "$140.00 CAD",
        },
      ],
    },
  },
  {
    icon: "/img/fulani-braids.png",
    title: "Fulani Braids",
    variations: {
      short: [
        {
          style: "Flip Over Braids",
          duration: "7 heures",
          price: "$200.00 CAD",
        },
        {
          style: "Freestyle Braids",
          duration: "6 heures",
          price: "$190.00 CAD",
        },
        {
          style: "Basic Fulani Style",
          duration: "6 heures",
          price: "$150.00 CAD",
        },
      ],
      long: [
        {
          style: "Flip Over Braids",
          duration: "8 heures 30 minutes",
          price: "$250.00 CAD",
        },
        {
          style: "Freestyle Braids",
          duration: "7 heures 30 minutes",
          price: "$230.00 CAD",
        },
        {
          style: "Basic Fulani Style",
          duration: "7 heures 30 minutes",
          price: "$200.00 CAD",
        },
      ],
    },
  },
  {
    icon: "/img/fake-locs.png",
    title: "Faux Locs",
    details: [
      {
        style: "Smedium Locs",
        duration: "4 heures 30 minutes",
        price: "$180.00 CAD",
      },
    ],
  },
  {
    icon: "/img/service1.jpg",
    title: "Men's Hair",
    details: [
      { style: "Small Twist", duration: "2 heures", price: "70.00 $CA" },
      {
        style: "Medium Twist",
        duration: "1 heure 45 minutes",
        price: "60.00 $CA",
      },
      { style: "Large Twist", duration: "1 heure", price: "50,00 $CA" },
      {
        style: "Small Tresses",
        duration: "2 heures 30 minutes",
        price: "70.00 $CA",
      },
      {
        style: "Medium Braidz",
        duration: "1 heure 45 minutes",
        price: "60.00 $CA",
      },
      { style: "Large Braidz", duration: "1 heure", price: "50.00 $CA" },
      {
        style: "2-12 Nattes",
        duration: "1 heure 45 minutes",
        price: "50.00 $CA",
      },
      { style: "14-20 Nattes", duration: "2 heures", price: "60.00 $CA" },
      { style: "Retwist au peigne", duration: "Varie", price: "75.00 $CA" },
      { style: "Retwist interlock", duration: "Varie", price: "95.00 $CA" },
      { style: "Retwist Freeform", duration: "Varie", price: "190.00 $CA" },
      {
        style: "Starter Locs (Comb coils)",
        duration: "3 heures 30 minutes",
        price: "85.00 $CA",
      },
    ],
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<"short" | "long">(
    "short"
  );

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedService]);

  const openModal = (service: Service) => {
    {
      setSelectedService(service);
    }
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section
      id="services"
      className="relative py-16 text-center px-6 bg-[#171A31]"
    >
      <div className="relative z-10">
        <h2
          className="text-3xl font-extrabold text-white leading-tight"
          data-aos="fade-up"
        >
          Services et Tarifs
        </h2>
        <p
          className="text-white mt-3 text-lg max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Des tresses sur mesure, tissées avec soin pour refléter votre
          personnalité et votre style unique.
        </p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-7xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {servicesData.map((service, index) => (
            <div
              key={index}
              onClick={() => openModal(service)}
              className="cursor-pointer group relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-3 transition duration-500 ease-in-out"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={index < 3}
                />
              </div>

              <div className="p-3 text-center">
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300">
                  {service.title}
                </h4>
              </div>

              <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-600 mx-auto rounded-full group-hover:w-32 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-t-3xl text-white text-center">
              <h3 className="text-3xl font-extrabold tracking-wide">
                {selectedService.title}
              </h3>
            </div>
            <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
              {selectedService.details ? (
                <ul className="space-y-4">
                  {selectedService.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center p-5 bg-gray-50 border rounded-xl shadow-sm"
                    >
                      <div className="flex flex-col">
                        <span className="text-lg text-left font-semibold text-gray-900">
                          {detail.style}
                        </span>
                        <p className="text-sm text-left text-gray-500">
                          {detail.duration}
                        </p>
                      </div>
                      <span className="text-md font-bold text-gray-800 bg-pink-100 px-3 py-1 rounded-lg">
                        {detail.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : selectedService.variations ? (
                <>
                  <div className="flex justify-center gap-4">
                    <div className="flex space-x-4 justify-center">
                      <button
                        onClick={() => setSelectedVariation("short")}
                        className="px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-pink-700 focus:ring-2 focus:ring-pink-400"
                      >
                        Short
                      </button>
                      <button
                        onClick={() => setSelectedVariation("long")}
                        className="px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400"
                      >
                        Long
                      </button>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {selectedService.variations[selectedVariation].map(
                      (detail, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center p-5 bg-gray-50 border rounded-xl shadow-sm"
                        >
                          <div className="text-left">
                            <span className="text-lg text-left font-semibold text-gray-900">
                              {detail.style}
                            </span>
                            <p className="text-sm text-left text-gray-500">
                              {detail.duration}
                            </p>
                          </div>
                          <span className="text-md font-bold text-gray-800 bg-pink-100 px-3 py-1 rounded-lg">
                            {detail.price}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </>
              ) : (
                <p className="text-gray-500 text-center text-lg">
                  No information available.
                </p>
              )}
            </div>
            <button
              onClick={closeModal}
              className="absolute top-6 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition duration-200 shadow-md flex items-center justify-center w-8 h-8"
              title="Close services dialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
