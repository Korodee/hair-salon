"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What services does BraidzWorld offer?",
    answer:
      "We specialize in high-quality braiding services, including box braids, knotless braids, cornrows, and more. Custom styles available on request.",
  },
  {
    question: "Do I need to book an appointment?",
    answer:
      "Yes, appointments are recommended to ensure we can give you the best service possible. A $25 deposit is required to secure your session. Walk-ins are accepted based on availability.",
  },
  {
    question: "How does the rewards system work?",
    answer:
      "With every booking you make as a user, you earn 40 points. To redeem a reward, you need to accumulate at least 200 points.",
  },
  {
    question: "Where is BraidzWorld located?",
    answer:
      "We're located at QC | 1999, 24e rue. You can also reach us through our Instagram and TikTok for directions.",
  },
  {
    question: "What hair products do you use?",
    answer:
      "We use premium products that protect your hair and scalp. We’re also happy to accommodate product preferences if you bring your own.",
  },
  {
    question: "How can I contact BraidzWorld?",
    answer:
      "You can contact us via email at doukagag@outlook.com, or DM us directly on Instagram and TikTok.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-3xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
              openIndex === index
                ? "bg-gradient-to-br from-purple-500 to-indigo-300"
                : "bg-white"
            }`}
          >
            <button
              className={`w-full flex justify-between items-center p-6 text-left transition-all duration-300 ${
                openIndex === index
                  ? "text-white"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <span>
                {openIndex === index ? (
                  <FaChevronUp className="text-white" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <div
                className={`p-6 text-gray-800 bg-white ${
                  openIndex === index ? "border-t border-purple-300" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
