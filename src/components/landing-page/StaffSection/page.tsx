"use client";
import { useEffect } from "react";
import Image from "next/image";
import staff1 from "@/../../public/img/staff1.png";
import staff2 from "@/../../public/img/staff2.png";
import staff3 from "@/../../public/img/staff3.png";
import AOS from "aos";
import "aos/dist/aos.css";

const staffData = [
  { name: "Mara Olsen", experience: "10 ans d'expérience", image: staff1 },
  { name: "Jess Nunez", experience: "8 ans d'expérience", image: staff2 },
  { name: "Dana Welch", experience: "15 ans d'expérience", image: staff3 },
];

const StaffSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Ensures animation only happens once
    });
  }, []);

  return (
    <section
      className="text-center bg-white pt-20 pb-10 px-6"
      data-aos="fade-up"
    >
      <h3 className="text-3xl font-extrabold text-gray-900">
        Rencontrez Notre Équipe de Professionnels
      </h3>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 md:gap-4 mt-10 xl:w-[60rem] mx-auto place-items-center">
        {staffData.map((staff, index) => (
          <div
            key={index}
            className="text-center"
            data-aos="fade-in"
            data-aos-delay={index * 200} // Staggered delay for nicer effect
          >
            <div className="w-48 sm:w-56 rounded-3xl overflow-hidden mx-auto">
              <Image
                src={staff.image}
                alt={staff.name}
                width={224} // Set width
                height={224} // Set height
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-lg text-[#000000] sm:text-xl font-bold mt-4">
              {staff.name}
            </h4>
            <p className="text-[#171A31b3] text-sm sm:text-base">
              {staff.experience}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StaffSection;
