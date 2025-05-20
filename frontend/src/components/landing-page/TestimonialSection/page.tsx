"use client";

import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  location: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amélie Tremblay",
    location: "Limoilou, Québec",
    title: "Le seul endroit où je fais confiance pour mes tresses",
    message:
      "Je suis tellement contente d'avoir trouvé BraidzWorld. Ils prennent soin de mes cheveux et mes tresses sont toujours impeccables — nettes, stylées et elles durent super longtemps !",
    image: "/img/test-1.png",
  },
  {
    id: 2,
    name: "Sofia Desjardins",
    location: "Saint-Roch, Québec",
    title: "Mes cheveux sont une œuvre d'art à chaque fois",
    message:
      "BraidzWorld ne fait pas que tresser des cheveux, ils créent de véritables chefs-d'œuvre. Chaque visite me donne un boost de confiance — et ils s'assurent toujours que je reparte satisfaite.",
    image: "/img/test-2.png",
  },
  {
    id: 3,
    name: "Ethan Bélanger",
    location: "Montcalm, Québec",
    title: "Un service au top à chaque visite",
    message:
      "Entre le personnel chaleureux et la précision dans chaque tresse, BraidzWorld est vraiment dans une classe à part. Mes cheveux n'ont jamais été aussi beaux.",
    image: "/img/test-3.png",
  },
  {
    id: 4,
    name: "Olivia Bouchard",
    location: "Charlesbourg, Québec",
    title: "BraidzWorld, c'est une ambiance incroyable",
    message:
      "Ils captent toujours exactement ce que je veux — des tresses bohèmes aux cornrows classiques. En plus, l'ambiance est super fun et accueillante !",
    image: "/img/test-1.png",
  },
  {
    id: 5,
    name: "Nathan Gagnon",
    location: "Beauport, Québec",
    title: "La meilleure expérience de tresses à Québec",
    message:
      "Les stylistes de BraidzWorld sont incroyablement talentueux. Mes tresses sont toujours nettes, bien équilibrées et confortables — sans douleur ni tiraillement. Je recommande vivement.",
    image: "/img/test-2.png",
  },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, location, title, message, image } = testimonials[currentIndex];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto mb-12" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-gray-900 leading-tight inline-block relative">
          Ce que disent nos clients
          <span className="block w-16 h-1 bg-black mt-1"></span>
        </h3>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Testimonial Card 1 */}
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex items-center mb-4">
            <img
              src="/img/testimonial-1.jpg"
              alt="Client 1"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-800">Sarah M.</h4>
              <p className="text-gray-600 text-sm">Client fidèle</p>
            </div>
          </div>
          <p className="text-gray-700">
            "Une expérience exceptionnelle ! Le service est impeccable et le
            résultat est toujours au rendez-vous. Je recommande vivement !"
          </p>
        </div>

        {/* Testimonial Card 2 */}
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center mb-4">
            <img
              src="/img/testimonial-2.jpg"
              alt="Client 2"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-800">Marie L.</h4>
              <p className="text-gray-600 text-sm">Nouvelle cliente</p>
            </div>
          </div>
          <p className="text-gray-700">
            "J'ai été impressionnée par le professionnalisme et la créativité.
            Mes tresses sont magnifiques et tiennent parfaitement !"
          </p>
        </div>

        {/* Testimonial Card 3 */}
        <div
          className="bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex items-center mb-4">
            <img
              src="/img/testimonial-3.jpg"
              alt="Client 3"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-800">Sophie K.</h4>
              <p className="text-gray-600 text-sm">Client régulier</p>
            </div>
          </div>
          <p className="text-gray-700">
            "L'ambiance est chaleureuse et le personnel est très attentionné. Je
            me sens toujours bien accueillie et le résultat est toujours parfait
            !"
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
