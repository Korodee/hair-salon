"use client";
import Image from "next/image";
import staff1 from "@/../../public/img/staff1.png";
import staff2 from "@/../../public/img/staff2.png";
import staff3 from "@/../../public/img/staff3.png";
import "aos/dist/aos.css";

const staffData = [
  { name: "Mara Olsen", experience: "10 years experience", image: staff1 },
  { name: "Jess Nunez", experience: "8 years experience", image: staff2 },
  { name: "Dana Welch", experience: "15 years experience", image: staff3 },
];

const StaffSection = () => {
  return (
    <section className="text-center bg-white py-20 px-6">
      <h3 className="text-3xl font-extrabold text-gray-900">
        Meet With Our Professional Staff
      </h3>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-8 md:gap-4 mt-10 xl:w-[60rem] mx-auto place-items-center">
        {staffData.map((staff, index) => (
          <div key={index} className="text-center">
            <div className="w-48  sm:w-56  rounded-3xl overflow-hidden mx-auto">
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
