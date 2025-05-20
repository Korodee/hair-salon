"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Quels services propose BraidzWorld ?",
    answer:
      "Nous sommes spécialisés dans les services de tressage de haute qualité, y compris les box braids, les tresses sans nœuds, les cornrows, et bien plus encore. Des styles personnalisés sont disponibles sur demande.",
  },
  {
    question: "Dois-je prendre un rendez-vous ?",
    answer:
      "Oui, il est recommandé de prendre rendez-vous pour garantir un service optimal. Un acompte de 25 $ est requis pour réserver votre séance. Les visites sans rendez-vous sont acceptées selon la disponibilité.",
  },
  {
    question: "Comment fonctionne le programme de récompenses ?",
    answer:
      "À chaque réservation, vous gagnez 40 points. Pour utiliser une récompense, vous devez accumuler au moins 200 points.",
  },
  {
    question: "Où se trouve BraidzWorld ?",
    answer:
      "Nous sommes situés à QC | 1999, 24e rue. Vous pouvez également nous contacter sur Instagram et TikTok pour obtenir des indications.",
  },
  {
    question: "Quels produits capillaires utilisez-vous ?",
    answer:
      "Nous utilisons des produits de qualité supérieure qui protègent vos cheveux et votre cuir chevelu. Nous pouvons également utiliser vos propres produits si vous le souhaitez.",
  },
  {
    question: "Comment puis-je contacter BraidzWorld ?",
    answer:
      "Vous pouvez nous contacter par e-mail à doukagag@outlook.com, ou nous envoyer un message directement sur Instagram et TikTok.",
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
        Questions Fréquemment Posées
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
              <span className="font-semibold text-lg pr-[0.3rem]">
                {faq.question}
              </span>
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
                openIndex === index ? "max-h-45" : "max-h-0"
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
