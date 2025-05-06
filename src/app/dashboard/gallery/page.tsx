"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useGetGallery } from "@/queries/galleryQuery";
import { useRouter } from "next/navigation";

interface ImageData {
    url: string;
    caption: string;
}

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
    const { data: gallery, isLoading } = useGetGallery();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push("/auth/login");
        }
    }, [router]);

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
                        Explore stunning hairstyles and salon transformations
                        crafted by expert stylists.
                    </p>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {gallery.map((image: ImageData, index: number) => (
                            <div
                                key={index}
                                className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                                    index % 3 === 0
                                        ? "col-span-2 row-span-2"
                                        : "col-span-1"
                                }`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image.url}
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
                            className="fixed inset-0 flex items-center backdrop-blur-[2px] justify-center bg-black bg-opacity-75"
                        >
                            <div className="relative max-w-2xl w-full p-6 md:p-4">
                                <Image
                                    src={selectedImage.url}
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
                </>
            )}
        </div>
    );
}
