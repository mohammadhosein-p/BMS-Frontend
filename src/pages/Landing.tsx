import FAQSection from "@/components/landing/FAQSection";
import HeroSection from "@/components/landing/HeroSection";
import SupportSection from "@/components/landing/SupportSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import TopSection from "@/components/landing/TopSection";

function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white pb-20">
            <HeroSection />
            <TopSection />
            <TestimonialSection />
            <SupportSection />
            <FAQSection />
        </div>
    );
}

export default Landing;
