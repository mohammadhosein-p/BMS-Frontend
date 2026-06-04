import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainImage from "@/assets/landing/support-section-main.svg";

function SupportSection() {
    return (
        <section className="relative overflow-hidden py-28">
            {/* Decorations */}

            <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-[-100px] bottom-[0px] opacity-80 hidden lg:block"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="184"
                    height="184"
                    viewBox="0 0 184 184"
                >
                    <circle id="Oval" cx="92" cy="92" r="92" fill="#717cff" />
                </svg>
            </motion.div>

            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-[4%] top-[20%] opacity-70 hidden lg:block"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                >
                    <circle
                        id="Oval_Copy_9"
                        data-name="Oval Copy 9"
                        cx="17"
                        cy="17"
                        r="17"
                        transform="translate(3 3)"
                        fill="none"
                        stroke="#717cff"
                        stroke-miterlimit="10"
                        stroke-width="6"
                    />
                </svg>
            </motion.div>

            <div className="absolute left-[9%] bottom-[30%] hidden lg:block opacity-80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                >
                    <circle
                        id="Oval"
                        cx="17"
                        cy="17"
                        r="17"
                        transform="translate(3 3)"
                        fill="none"
                        stroke="#4db6ac"
                        stroke-miterlimit="10"
                        stroke-width="6"
                    />
                </svg>
            </div>

            {/* Main Container */}

            <div className="mx-auto w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
                    {/* Text Content */}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative z-20 flex flex-col items-center gap-8 flex-4"
                    >
                        <motion.h2
                            variants={itemVariants as any}
                            className="text-[clamp(32px,3vw,54px)] leading-[1.8] text-center font-bold text-[#717cff]"
                        >
                            تیم پشتیبانی
                            <br />
                            همیشه همراه مدیران ساختمان
                        </motion.h2>

                        <motion.p
                            variants={itemVariants as any}
                            className="max-w-[560px] text-[clamp(16px,1.1vw,21px)] text-center leading-[2.3] text-[#696969]"
                        >
                            در کنار امکانات سامانه، تیم ما آماده است تا درباره
                            راه‌اندازی اولیه، آموزش مدیران و رفع مشکلات احتمالی
                            کمک کند.
                            <br />
                            تنها با یک پیام، تیم پشتیبانی همراه شماست
                        </motion.p>

                        <motion.button
                            variants={itemVariants as any}
                            className="bg-[#717cff] text-white px-12 py-4 rounded-2xl font-bold text-lg transition hover:scale-105"
                        >
                            <Link to="/about-us">ارتباط با پشتیبانی</Link>
                        </motion.button>
                    </motion.div>

                    {/* Illustration */}

                    <div className="relative flex-3 max-w-[720px] self-end lg:self-auto">
                        <motion.svg
                            animate={{ x: [0, +15, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="129"
                            height="219"
                            viewBox="0 0 129 219"
                            className="absolute bottom-[10%] left-[-10%] opacity-80 hidden lg:block"
                        >
                            <path
                                id="Dots"
                                d="M120,214.5a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,214.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,90,214.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,60,214.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,30,214.5Zm-30,0A4.5,4.5,0,1,1,4.5,219,4.5,4.5,0,0,1,0,214.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,184.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,90,184.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,60,184.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,30,184.5Zm-30,0A4.5,4.5,0,1,1,4.5,189,4.5,4.5,0,0,1,0,184.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,154.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,90,154.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,60,154.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,30,154.5Zm-30,0A4.5,4.5,0,1,1,4.5,159,4.5,4.5,0,0,1,0,154.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,124.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,90,124.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,60,124.5Zm-30,0a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,30,124.5Zm-30,0A4.5,4.5,0,1,1,4.5,129,4.5,4.5,0,0,1,0,124.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,94.5Zm-30,0A4.5,4.5,0,1,1,94.5,99,4.5,4.5,0,0,1,90,94.5Zm-30,0A4.5,4.5,0,1,1,64.5,99,4.5,4.5,0,0,1,60,94.5Zm-30,0A4.5,4.5,0,1,1,34.5,99,4.5,4.5,0,0,1,30,94.5Zm-30,0A4.5,4.5,0,1,1,4.5,99,4.5,4.5,0,0,1,0,94.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,64.5Zm-30,0A4.5,4.5,0,1,1,94.5,69,4.5,4.5,0,0,1,90,64.5Zm-30,0A4.5,4.5,0,1,1,64.5,69,4.5,4.5,0,0,1,60,64.5Zm-30,0A4.5,4.5,0,1,1,34.5,69,4.5,4.5,0,0,1,30,64.5Zm-30,0A4.5,4.5,0,1,1,4.5,69,4.5,4.5,0,0,1,0,64.5Zm120-30a4.5,4.5,0,1,1,4.5,4.5A4.5,4.5,0,0,1,120,34.5Zm-30,0A4.5,4.5,0,1,1,94.5,39,4.5,4.5,0,0,1,90,34.5Zm-30,0A4.5,4.5,0,1,1,64.5,39,4.5,4.5,0,0,1,60,34.5Zm-30,0A4.5,4.5,0,1,1,34.5,39,4.5,4.5,0,0,1,30,34.5Zm-30,0A4.5,4.5,0,1,1,4.5,39,4.5,4.5,0,0,1,0,34.5Zm120-30A4.5,4.5,0,1,1,124.5,9,4.5,4.5,0,0,1,120,4.5Zm-30,0A4.5,4.5,0,1,1,94.5,9,4.5,4.5,0,0,1,90,4.5Zm-30,0A4.5,4.5,0,1,1,64.5,9,4.5,4.5,0,0,1,60,4.5Zm-30,0A4.5,4.5,0,1,1,34.5,9,4.5,4.5,0,0,1,30,4.5ZM0,4.5A4.5,4.5,0,1,1,4.5,9,4.5,4.5,0,0,1,0,4.5Z"
                                fill="#717cff"
                            />
                        </motion.svg>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 988.915 801.5"
                                className="w-[350px] sm:w-[600px] lg:w-full h-auto"
                            >
                                <defs>
                                    <clipPath id="supportClip">
                                        <path
                                            d="M89.112,37.543A30,30,0,0,1,118.34,12.148L993,0V801.5L28.451,616.944A30,30,0,0,1,4.444,582.876Z"
                                            transform="translate(-4.085)"
                                        />
                                    </clipPath>
                                </defs>

                                {/* Background */}
                                <path
                                    d="M89.112,37.543A30,30,0,0,1,118.34,12.148L993,0V801.5L28.451,616.944A30,30,0,0,1,4.444,582.876Z"
                                    transform="translate(-4.085)"
                                    fill="#717cff"
                                />

                                {/* Clipped Image */}
                                <image
                                    href={MainImage}
                                    width="120%"
                                    height="85%"
                                    preserveAspectRatio="xMidYMid meet"
                                    clipPath="url(#supportClip)"
                                    x="0"
                                    y="15"
                                />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

export default SupportSection;
