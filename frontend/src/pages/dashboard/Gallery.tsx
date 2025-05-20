"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getGalleryImages,
  type GalleryImage,
} from "../../services/galleryServices";
import { FaSpinner } from "react-icons/fa";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const {
    data: galleryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGalleryImages,
  });

  const categories = [
    "all",
    ...new Set(galleryData?.map((img: GalleryImage) => img.category) || []),
  ];

  const filteredImages = galleryData?.filter((img: GalleryImage) =>
    selectedCategory === "all" ? true : img.category === selectedCategory
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load gallery images</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gallery</h1>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages?.map((image: GalleryImage) => (
          <div
            key={image.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 flex items-center justify-center">
              <h3 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-lg font-semibold">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-white p-6">
            {selectedImage && (
              <div className="space-y-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {selectedImage.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
