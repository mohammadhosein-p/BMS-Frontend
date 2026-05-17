import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User } from "lucide-react";
// 1. Import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

import backgroundImage from "@/assets/Login-background-pictur.jpeg";
import slide1 from "@/assets/Picture.png";
import slide2 from "@/assets/Picture2.png";
import slide3 from "@/assets/Picture3.png";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLogin } from "@/components/Signup-Login/PhoneLogin";
import { OTPVerify } from "@/components/Signup-Login/OTPVerify";
import { UsernameLogin } from "@/components/Signup-Login/UserNameLogin";
import { Register } from "@/components/Signup-Login/Register";

const slides = [
    {
        image: slide1,
        title: "کارهای مدیریتیت رو راحت کن ",
        subtitle: "با آپارمو تجربه‌ای متفاوت داشته باش",
    },
    {
        image: slide2,
        title: "بهترش کن",
        subtitle: "با آپارمو تجربه‌ای متفاوت داشته باش",
    },
    {
        image: slide3,
        title: "با آپارمو تجربه‌ای متفاوت داشته باش",
        subtitle: "کارهای مدیریتیت رو راحت کن ",
    },
];

const Login = () => {
    const navigate = useNavigate();
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [step, setStep] = useState<"PHONE" | "OTP" | "USERNAME" | "REGISTER">("PHONE");

    const currentTab = step === "USERNAME" ? "username" : "phone";

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleTabChange = (value: string) => {
        if (value === "username") {
            setStep("USERNAME");
        } else {
            setStep("PHONE");
        }
    };

    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    const pageTransition = {
        duration: 0.4,
        ease: "easeInOut",
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center font-iranyekan"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="relative z-10 w-full max-w-250 bg-white/95 backdrop-blur-sm rounded-4xl shadow-2xl flex flex-row-reverse overflow-hidden p-6 md:p-8 gap-8">

                <div className="w-full md:w-1/2 flex flex-col px-2 md:px-4 min-h-130 overflow-hidden">

                    <AnimatePresence mode="wait">
                        {(step === "PHONE" || step === "USERNAME") && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="w-full mb-6"
                            >
                                <Tabs
                                    value={currentTab}
                                    onValueChange={handleTabChange}
                                    className="w-full"
                                    dir="rtl"
                                >
                                    <TabsList className="grid w-full h-12 grid-cols-2 p-1.5 bg-[#F1F2F4] rounded-lg border border-neutral-1/5 gap-1">
                                        <TabsTrigger
                                            value="phone"
                                            className="flex items-center justify-center gap-2 text-[15px] font-bold h-full rounded-lg transition-all duration-300 text-neutral-2 data-[state=active]:bg-primary-2 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#6D7CFF]/20"
                                        >
                                            <Phone size={16} strokeWidth={2.5} />
                                            ورود با شماره
                                        </TabsTrigger>

                                        <TabsTrigger
                                            value="username"
                                            className="flex items-center justify-center gap-2 text-[15px] font-bold h-full rounded-lg transition-all duration-300 text-neutral-2 data-[state=active]:bg-secondary-blue-3 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#54A9FF]/20"
                                        >
                                            <User size={16} strokeWidth={2.5} />
                                            ورود با نام کاربری
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex-1 flex flex-col justify-center">
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
                                                    onPhoneSubmit={setPhoneNumber}
                                                />
                                            );
                                        case "OTP":
                                            return (
                                                <OTPVerify
                                                    OnRegister={() => setStep("REGISTER")}
                                                    onHomePage={() => navigate("/home")}
                                                    onBack={() => setStep("PHONE")}
                                                    phoneNumber={phoneNumber}
                                                />
                                            );
                                        case "REGISTER":
                                            return <Register onHome={() => navigate("/home")} phoneNumber={phoneNumber} />;
                                        case "USERNAME":
                                            return (
                                                <UsernameLogin
                                                    onHomePage={() => navigate("/home")}
                                                />
                                            );
                                        default:
                                            return null;
                                    }
                                })()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="hidden md:flex w-1/2 rounded-3xl relative overflow-hidden min-h-130">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

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
                                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index
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