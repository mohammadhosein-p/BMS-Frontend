import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backgroundImage from "@/assets/Login-background-picture.png";
import slide1 from "@/assets/Picture.png";
import slide2 from "@/assets/Picture2.png";
import slide3 from "@/assets/Picture3.png";



import { PhoneLogin } from "@/components/Signup-Login/PhoneLogin";
import { OTPVerify } from "@/components/Signup-Login/OTPVerify";
import { UsernameLogin } from "@/components/Signup-Login/UserNameLogin";
import { Register } from "@/components/Signup-Login/Register";

const slides = [
    {
        image: slide1,
        title: "کارهای مدیریتیت رو راحت کن ",
        subtitle: "با آپامو تجربه‌ای متفاوت داشته باش",
    },
	{
        image: slide2,
        title: "بهترش کن",
        subtitle: "با آپامو تجربه‌ای متفاوت داشته باش",
    },
	{
        image: slide3,
        title: "با آپامو تجربه‌ای متفاوت داشته باش",
        subtitle: "کارهای مدیریتیت رو راحت کن ",
    },
];

const Login = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [step, setStep] = useState("PHONE");

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    const pageTransition = {
        duration: 0.4,
        ease: "easeInOut",
    };

    const renderRightSection = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                    className="w-full"
                >
                    {(() => {
                        switch (step) {
                            case "PHONE":
                                return (
                                    <PhoneLogin 
                                        onOTPlogin={() => setStep("OTP")} 
                                        onUsernameLogin={() => setStep("USERNAME")} 
                                        onPhoneSubmit={setPhoneNumber} 
                                    />
                                );
                            case "OTP":
                                return (
                                    <OTPVerify 
                                        OnNext={() => setStep("REGISTER")} 
                                        onBack={() => setStep("PHONE")} 
                                        phoneNumber={phoneNumber} 
                                    />
                                );
                            case "USERNAME":
                                return (
                                    <UsernameLogin 
                                        onBack={() => setStep("PHONE")} 
                                        onLoginSubmit={(data) => console.log("Logging in...", data)}
                                    />
                                );
                            case "REGISTER":
                                return <Register />;
                            default:
                                return null;
                        }
                    })()}
                </motion.div>
            </AnimatePresence>
        );
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center font-iranyekan"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative z-10 w-full max-w-[1000px] bg-white/95 backdrop-blur-sm rounded-[32px] shadow-2xl flex flex-row-reverse overflow-hidden p-6 md:p-8 gap-8">
                
                <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-4 min-h-[500px] overflow-hidden">
                    {renderRightSection()}
                </div>

                <div className="hidden md:flex w-1/2 rounded-[24px] relative overflow-hidden min-h-[520px]">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            <div className="absolute bottom-16 left-8 right-8 text-white text-right" dir="rtl">
                                <h3 className="text-2xl lg:text-3xl font-bold leading-snug mb-3">
                                    {slide.title}
                                </h3>
                                <p className="text-sm lg:text-base text-white/80 font-medium">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}

                    {slides.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        currentSlide === index
                                            ? "w-8 bg-white"
                                            : "w-2 bg-white/40 hover:bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;