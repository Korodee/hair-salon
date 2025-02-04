import NavBar from "@/components/landing-page/NavBar/page";
import Image from "next/image";
import heroImage from "../../../../public/img/heroImage.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 md:px-20 bg-gradient-to-r from-gray-100 to-blue-200">
      {/* NavBar */}
      <NavBar />

      {/* Hero Content */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between mt-10 md:mt-20">
        {/* Left Image (Hidden on Mobile) */}
        <div className="hidden md:flex w-2/3 justify-center">
          <Image
            src={heroImage}
            alt="Hero Image"
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/3 max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Graceful Hair <br />
            <span className="text-black">Truly, yours.</span>
          </h1>
          <p className="text-gray-600 mt-4 text-base md:text-lg">
            Good hair gets you anywhere. We are more than a salon, we are a
            creative space where we give you a whole new hair experience.
          </p>
          <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg">
            Book an appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
