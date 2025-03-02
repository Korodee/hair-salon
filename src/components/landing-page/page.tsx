import HeroSection from "@/components/landing-page/HeroSection/page";
import StaffSection from "@/components/landing-page/StaffSection/page";
// import PricingSection from "@/components/landing-page/PricingSection/page";
import TestimonialSection from "@/components/landing-page/TestimonialSection/page";
import FaqSection from "@/components/landing-page/Faq/page";
import AboutSection from "@/components/landing-page/AboutSection/page";
import ContactUsSection from "@/components/landing-page/ContactUsSection/page";
import FooterSection from "@/components/landing-page/FooterSection/page";
import ServicesSection from "@/components/landing-page/ServicesSection/page";
const LandingPage = () => {
  return (
    <main className="bg-[#ffffff]">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StaffSection />
      <FaqSection />
      {/* <PricingSection /> */}
      <TestimonialSection />
      <ContactUsSection />
      <FooterSection />
    </main>
  );
};

export default LandingPage;
