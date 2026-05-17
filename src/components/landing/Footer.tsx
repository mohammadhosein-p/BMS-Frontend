import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
    return (
        <footer className="bg-[#717cff] pt-20 pb-28">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Links */}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col items-center gap-5 text-white text-lg"
                    >
                        {tabsDict.map((item) => (
                            <motion.a
                                variants={itemVariants as any}
                                key={item.label}
                                href={item.href}
                                className="transition hover:opacity-70 font-light"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Logo & Description */}

                    <div className="flex flex-col items-center text-center">
                        <motion.img
                            initial={{ opacity: 0, y: -20, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            viewport={{ once: true }}
                            src="./src/assets/landing/header-logo.svg"
                            alt="logo"
                            className="w-28"
                        />

                        <p className="mt-8 max-w-[420px] text-white leading-[2.4] text-lg">
                            آپارمو، پلتفرم هوشمند برای مدیریت ساختمان‌ها
                            <br />
                            از ثبت خرابی تا اطلاع رسانی و رأی‌گیری
                            <br />
                            همه‌چیز در یک سامانه
                        </p>
                    </div>

                    {/* Social Media */}

                    <div className="flex flex-col items-center gap-8">
                        <h3 className="text-white text-xl">شبکه های اجتماعی</h3>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            className="flex items-center gap-5 text-white"
                        >
                            {socialMedia.map((item, index) => (
                                <motion.a
                                    variants={itemVariants as any}
                                    key={index}
                                    href={item.href}
                                    className="transition hover:scale-110 hover:opacity-80"
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const tabsDict = [
    {
        label: "درباره آپارمو",
        href: "#",
    },
    {
        label: "فرصت های همکاری",
        href: "#",
    },
    {
        label: "تماس با ما",
        href: "#",
    },
];

const socialMedia = [
    {
        icon: <Facebook size={24} />,
        href: "#",
    },
    {
        icon: <Twitter size={24} />,
        href: "#",
    },
    {
        icon: <Youtube size={24} />,
        href: "#",
    },
    {
        icon: <Instagram size={24} />,
        href: "#",
    },
    {
        icon: <Linkedin size={24} />,
        href: "#",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut",
        },
    },
};

export default Footer;
