"use client";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

interface ImageData {
  src: string;
  caption: string;
}

const images: ImageData[] = [
  { src: "/img/gal1.jpg", caption: "Hair Treatment" },
  { src: "/img/gal2.jpg", caption: "Modern Bob Cut" },
  { src: "/img/gal3.jpg", caption: "Lavender Waves" },
  { src: "/img/gal4.jpg", caption: "Hair Oil Therapy" },
  { src: "/img/gal5.jpg", caption: "Hair Oil Therapy" },
  { src: "/img/gal6.jpg", caption: "Lavender Waves" },
  { src: "/img/gal7.jpg", caption: "Hair Oil Therapy" },
  { src: "/img/gal2.jpg", caption: "Hair Oil Therapy" },
  { src: "/img/gal3.jpg", caption: "Lavender Waves" },
  { src: "/img/gal7.jpg", caption: "Hair Oil Therapy" },
  { src: "/img/gal1.jpg", caption: "Lavender Waves" },
  { src: "/img/gal4.jpg", caption: "Lavender Waves" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  return (
    <div className="">
      <div
        className="relative bg-gray-900 text-center text-white rounded-md overflow-hidden mb-4 h-28  shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/img/gallery.jpg')" }}
      >
        {/* Overlay (Optional, for contrast) */}
        <div className="bg-black/70 text-center p-4 h-full w-full flex flex-col justify-center ">
          {/* Date Display */}
          <h1 className="text-2xl  md:text-4xl font-extrabold text-gray-100">
            Salon Showcase
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-md md:text-lg font-medium mt-1 leading-relaxed">
            Explore stunning hairstyles and salon transformations crafted by
            expert stylists.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer group ${
              index % 3 === 0 ? "col-span-2 row-span-2" : "col-span-1"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              width={index % 3 === 0 ? 500 : 400}
              height={index % 3 === 0 ? 500 : 400}
              alt={image.caption}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
              {image.caption}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Dialog
          open={true}
          onClose={() => setSelectedImage(null)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div className="relative max-w-2xl w-full p-6 md:p-4">
            <Image
              src={selectedImage.src}
              width={700}
              height={500}
              alt={selectedImage.caption}
              className="w-full rounded-lg"
            />
            <p className="text-white text-center mt-2">
              {selectedImage.caption}
            </p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 md:-top-2 right-2 md:right-0 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
