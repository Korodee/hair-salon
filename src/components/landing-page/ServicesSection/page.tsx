"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image"; // Import Image component

const servicesData = [
  {
    icon: "/img/service1.jpg",
    title: "Makeup & Beauty",
    description:
      "Some example text is placed here to show what this component will look like fully built out.",
  },
  {
    icon: "/img/service2.jpg",
    title: "Haircuts & Styling",
    description:
      "Some example text is placed here to show what this component will look like fully built out.",
  },
  {
    icon: "/img/service3.jpg",
    title: "Massage & Spa",
    description:
      "Some example text is placed here to show what this component will look like fully built out.",
  },
];

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);
  return (
    <section id="services" className="py-20 text-center px-4 bg-[#1C0336] ">
      <div data-aos="zoom-in">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          Services
        </h2>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto">
          We believe great hair should be accessible to everyone, no matter the
          budget.
        </p>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-pink-100 flex items-center justify-center rounded-full overflow-hidden">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80} // Set the width of the image
                  height={80} // Set the height of the image
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h4 className="text-lg font-bold text-gray-900 mt-4">
                {service.title}
              </h4>
              <p className="text-gray-600 text-sm mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
