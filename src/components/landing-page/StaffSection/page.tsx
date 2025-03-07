"use client";
import { useEffect } from "react";
import Image from "next/image";
import ownerImage from "@/../../public/img/about3.jpg"; // Replace with your actual image
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
        <div
          className="relative w-full md:w-[18rem] mx-auto h-[18rem] rounded-3xl overflow-hidden"
          data-aos="fade-right"
        >
          <Image
            src={ownerImage}
            alt="Mara Olsen - Fondatrice"
            fill
            className="object-cover"
          />
        </div>

        {/* Founder Info */}
        <div className="flex-1 mx-auto" data-aos="fade-left">
          <h4 className="text-3xl font-semibold text-gray-800 mb-2">
            Mara Olsen
          </h4>
          <p className="text-[#444] text-lg font-medium mb-4">
            Fondatrice &amp; Experte Beaut&eacute; | 10 ans
            d&apos;exp&eacute;rience
          </p>

          <p className="text-gray-700 leading-relaxed text-[15px]">
            Avec plus de 10 ans d&apos;expertise exclusivement
            d&eacute;di&eacute;e &agrave; l&apos;art des tresses, Mara met sa
            passion et son savoir-faire au service de chaque cliente. Chaque
            tresse est r&eacute;alis&eacute;e avec pr&eacute;cision,
            cr&eacute;ativit&eacute; et soin, pour s&apos;adapter &agrave; votre
            style et &agrave; votre personnalit&eacute;. Son approche sur-mesure
            repose sur l&apos;&eacute;coute, la ma&icirc;trise des techniques
            traditionnelles et modernes, et une attention particuli&egrave;re
            aux d&eacute;tails. Dans une ambiance chaleureuse et conviviale,
            Mara sublime chaque chevelure, faisant de chaque tresse bien plus
            qu&apos;une coiffure : une v&eacute;ritable signature.
          </p>

          {/* Optional personal touch - signature or quote */}
          <div className="mt-4 italic text-gray-600">
            <p>
              &ldquo;La beaut&eacute; est une lumi&egrave;re qui vient de
              l&apos;int&eacute;rieur.&rdquo;
            </p>
            <p className="mt-2 font-bold text-gray-800">- Mara Olsen</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
