"use client";
import Image from "next/image";

const images = [
  "/img/service3.jpg",
  "/img/about3.jpg",
  "/img/service2.jpg",
  "/img/service1.jpg",
];

export default function Gallery() {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-[#bcd0f853]">
      <h3 className="text-2xl text-black font-bold mb-1">Photo Gallery</h3>
      <p className="text-gray-700 text-sm md:w-[60%] mb-4">
        Discover stunning hairstyles and salon transformations. Get inspired by
        our latest styles and trends from expert stylists.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {images.map((src, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg">
            <Image
              src={src}
              width={100}
              height={100}
              alt={`Style ${index + 1}`}
              className="w-full h-[13.5rem] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
