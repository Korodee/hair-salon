"use client";
import NavBar from "@/components/landing-page/NavBar/page";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] md:min-h-screen px-6 md:px-20 text-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/new-hero-bg.png"
          alt="Image de fond"
          layout="fill"
          objectFit="cover"
          priority
          className="object-center"
        />
      </div>

      {/* Overlay (Optional, for contrast) */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* NavBar */}
      <NavBar />

      {/* Hero Content */}
      <div
        data-aos="zoom-in"
        className="relative z-10 flex flex-col items-center justify-center text-white text-center w-full max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Graceful Braidz <br />
          <span>Uniquement pour vous</span>
        </h1>
        <p className="text-gray-100 mt-4 text-base md:text-lg">
          Osez l&apos;élégance avec votre couronne, où la tradition rencontre la
          modernité.
        </p>

        <Link href="/auth/login">
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:scale-105 hover:shadow-lg">
            Prendre un rendez-vous
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
