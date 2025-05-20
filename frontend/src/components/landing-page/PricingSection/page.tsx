"use client";
import React, { useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import AOS from "aos";
import "aos/dist/aos.css";

const pricingData = [
  {
    price: "$30",
    title: "Male Haircut",
    services: [
      "Lorem ipsum",
      "Dolor sit amet",
      "Consectetur adipiscing",
      "Eli mattis sit phasellus",
      "Mollis sit aliquam sit nullam",
    ],
  },
  {
    price: "$40",
    title: "Female Haircut",
    services: [
      "Lorem ipsum",
      "Dolor sit amet",
      "Consectetur adipiscing",
      "Eli mattis sit phasellus",
      "Mollis sit aliquam sit nullam",
    ],
    highlight: true, // Marks this as the emphasized card
  },
  {
    price: "$10",
    title: "Child Haircut",
    services: [
      "Lorem ipsum",
      "Dolor sit amet",
      "Consectetur adipiscing",
      "Eli mattis sit phasellus",
      "Mollis sit aliquam sit nullam",
    ],
  },
];

const PricingSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <section
      id="pricing"
      className=" bg-[#1C0336] py-20 px-4 md:px-0 text-center"
    >
      <div data-aos="flip-left">
        <h3 className="text-3xl font-extrabold text-white">Pricing</h3>
        <p className="text-gray-200 mt-3 max-w-xl mx-auto">
          We believe great hair should be accessible to everyone, no matter the
          budget.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto px-4 sm:px-0">
          {pricingData.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ${
                plan.highlight
                  ? "border-[1px] scale-105 border-[#171A31]"
                  : "border border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-3 right-2 bg-[#171A31] text-white text-xs font-bold px-2 py-1 rounded-xl">
                  Most Popular
                </span>
              )}
              <h3 className="text-4xl font-extrabold text-[#1E255E]">
                {plan.price}
              </h3>
              <h4 className="text-lg font-semibold text-[#1E255E] mt-2">
                {plan.title}
              </h4>
              <p className="text-[#667085] text-sm mt-1">
                Includes the services below
              </p>
              <ul className="mt-4 space-y-2 text-[#667085] text-sm">
                {plan.services.map((service, i) => (
                  <li key={i} className="flex items-center gap-1 text-sm">
                    <div className="bg-[#D1FADF] rounded-full p-1">
                      <GiCheckMark className="text-[#12B76A] text-sm" />
                    </div>
                    {service}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-[#171A31] text-white py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
                Book an appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
