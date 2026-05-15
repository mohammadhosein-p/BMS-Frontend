import { motion } from "framer-motion";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "آیا می‌توان برای هر خرابی عکس یا توضیح اضافه کرد؟",
        answer: "بله، هنگام ثبت تیکت، ساکنین می‌توانند توضیح کامل مشکل را بنویسند و در صورت نیاز عکس اضافه کنند تا مدیر یا مسئول تعمیرات سریع‌تر مشکل را بررسی و برطرف کند.",
    },
    {
        question:
            "نیاز به طراحی در اپلیکیشن موبایل دارم، آیا می توانید این کار را انجام دهید؟",
        answer: "بشین تا برات طراحی کنم",
    },
    {
        question: "کارت اعتباری ندارم، چطور سرویس را خریداری کنم؟",
        answer: "می توانید به بانک مراجعه و برای خود کارت اعتباری تهیه کنید",
    },
    {
        question: "آیا امکان بازگشت وجه دارد؟",
        answer: "خیر، پولتون رو خوردیم.",
    },
];

function FAQSection() {
    return (
        <section className="relative overflow-hidden py-32">
            {/* Green Background Shape */}

            <motion.div
                animate={{
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className=" absolute right-[-600px] md:right-[-350px] top-[200px]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="900"
                    height="900"
                    viewBox="0 0 1768 1768"
                >
                    <circle
                        id="Oval"
                        cx="884"
                        cy="884"
                        r="884"
                        fill="#4db6ac"
                    />
                </svg>
            </motion.div>

            {/* Content */}

            <div className="relative z-10 max-w-[1100px] mx-auto px-6">
                {/* Title */}

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className=" text-center text-[clamp(34px,3vw,56px)] font-black text-[#717cff] "
                >
                    سوالات پرتکرار
                </motion.h2>

                {/* FAQ */}

                <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-0"
                    className="mt-20 flex flex-col gap-8"
                    dir="rtl"
                >
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.12,
                            }}
                        >
                            <AccordionItem
                                value={`item-${index}`}
                                className=" border-none rounded-3xl  bg-white px-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden"
                            >
                                <AccordionTrigger className=" py-8 text-right text-lg font-medium text-[#717cff] hover:no-underline ">
                                    <span className="flex-1 text-right font-extrabold leading-[2]">
                                        {item.question}
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent className=" text-right font-medium text-[17px] leading-[2.4] text-[#696969] pb-8 ">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}

export default FAQSection;
