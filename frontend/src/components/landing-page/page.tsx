import HeroSection from "./HeroSection/page";
import StaffSection from "./StaffSection/page";
// import PricingSection from "./PricingSection/page";
import TestimonialSection from "./TestimonialSection/page";
import FaqSection from "./Faq/page";
import AboutSection from "./AboutSection/page";
import ContactUsSection from "./ContactUsSection/page";
import FooterSection from "./FooterSection/page";
import ServicesSection from "./ServicesSection/page";
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
