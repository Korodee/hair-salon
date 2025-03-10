"use client";
import { useEffect } from "react";
import Image from "next/image";
import ownerImage from "@/../../public/img/owner-img.png";
import AOS from "aos";
import "aos/dist/aos.css";

const StaffSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className=" py-16 px-6 md:px-12 lg:px-20">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto mb-12" data-aos="fade-up">
        <h3 className="text-3xl font-bold text-gray-900 leading-tight inline-block relative">
          Rencontrez la Fondatrice
          <span className="block w-16 h-1 bg-black mt-1"></span>{" "}
          {/* Directly under the text */}
        </h3>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Founder Image */}
        <div className="relative w-full md:w-[18rem] mx-auto h-[18rem] rounded-3xl overflow-hidden">
          <Image
            src={ownerImage}
            alt="Grace Doukaga - Fondatrice"
            fill
            className="object-cover"
          />
        </div>

        {/* Founder Info */}
        <div className="flex-1 mx-auto">
          <h4 className="text-3xl font-semibold text-gray-800 mb-2">
            Grace Doukaga
          </h4>
          <p className="text-[#444] text-lg font-medium mb-4">
            Fondatrice &amp; Experte Beaut&eacute; | 10 ans
            d&apos;exp&eacute;rience
          </p>

          <p className="text-gray-700 leading-relaxed text-[15px]">
            Depuis toute petite, cette passion grandissante pour l&apos;art de
            la coiffure ne cesse d&apos;évoluer. À la recherche constante de
            nouvelles connaissances, vous êtes devenus ma source
            d&apos;inspiration. Vos échanges, vos opinions, vos rires et parfois
            même vos pleurs sont tout ce qui crée cet univers appelé Braidz
            World, un monde dans lequel j&apos;ai la chance de créer avec vous
            une expérience de confiance. Venez alors partager avec moi ce
            parcours évolutif dont le but est de{" "}
            <span className="font-semibold italic">«toucher le monde»</span>.
          </p>

          {/* Optional personal touch - signature or quote */}
          <div className="mt-4 italic text-gray-600">
            <p>
              &ldquo;La beaut&eacute; est une lumi&egrave;re qui vient de
              l&apos;int&eacute;rieur.&rdquo;
            </p>
            <p className="mt-1 font-bold text-gray-800">- Grace Doukaga</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
