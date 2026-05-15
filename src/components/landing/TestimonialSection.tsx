function TestimonialSection() {
    return (
        <section className="relative min-h-[1100px] overflow-hidden">
            {/* Background Shape */}

            <div className="absolute left-[-40vw] sm:left-[-20vw] lg:left-[-8vw]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[1200px] lg:w-[1500px] xl:w-[1750px]"
                    viewBox="0 0 2229 1302.198"
                >
                    <path
                        id="Rectangle"
                        d="M0,348.554-1756.253,28.548a168,168,0,0,0-193.55,126.38L-2229,1328l1881.694-198.676A168,168,0,0,0-204.4,1011.735Z"
                        transform="translate(2229 -25.802)"
                        fill="#4db6ac"
                    />
                </svg>
            </div>

            {/* Main Content */}

            <div
                className="relative z-10 max-w-[1500px] mx-auto px-[5vw] pt-[20vh] lg:pt-[60vh] xl:pt-[50vh] flex flex-col lg:flex-row items-start justify-center gap-[6vw]"
                dir="rtl"
            >
                {/* Text Section */}

                <div className="w-md md:w-lg lg:w-[28vw] lg:min-w-[300px] lg:max-w-[460px] text-white shrink-0">
                    <h2 className="text-[clamp(28px,2.5vw,48px)] font-extrabold leading-[1.5]">
                        نظر مدیران و ساکنین درباره آپارمو
                    </h2>

                    <p className="mt-8 text-[clamp(16px,1.1vw,22px)] opacity-90 leading-[2.4] text-justify">
                        آپارمو طوری طراحی شده که هم برای مدیر ساختمان ساده باشد
                        و هم برای ساکنین. این چند نظر کوتاه نشان می‌دهد چطور ثبت
                        تیکت‌ها، اطلاع‌رسانی و پیگیری خرابی‌ها در بسیاری از
                        ساختمان‌ها منظم‌تر و شفاف‌تر شده است.
                    </p>
                </div>

                {/* Cards Section */}

                <div className="relative w-full lg:w-[60vw] lg:min-w-[700px] lg:max-w-[980px]">
                    {/* Desktop / Laptop Layout */}

                    <div className="hidden lg:flex justify-center gap-10 flex-wrap">
                        {/* Card 1 */}

                        <div className="w-[46%] min-w-[300px] bg-white text-slate-700 p-8 rounded-[36px] shadow-2xl shadow-white/60 mt-16">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[clamp(18px,1.2vw,24px)]">
                                    کار با سامانه خیلی ساده ست
                                </h3>
                            </div>

                            <p className="text-[clamp(14px,0.95vw,18px)] leading-[2.2] mb-8 text-justify text-[#555]">
                                من تقریباً همه کارها را از پشت موبایل انجام
                                می‌دهم؛ ثبت خرابی، پیگیری و پاسخ به ساکنین. بدون
                                آموزش خاصی، بعد از یکی دو روز همه چیز برایم جا
                                افتاد.
                            </p>

                            <p className="text-[clamp(12px,0.8vw,15px)] text-[#717cff] font-medium text-center">
                                حسین مرادی - مدیر ساختمان ۲۴ واحدی
                            </p>
                        </div>

                        {/* Card 2 */}

                        <div className="w-[46%] min-w-[300px] bg-white text-slate-700 p-8 rounded-[36px] h-[300px] shadow-2xl shadow-white/60">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[clamp(18px,1.2vw,24px)]">
                                    اطلاعیه‌ها گم نمی‌شوند
                                </h3>
                            </div>

                            <p className="text-[clamp(14px,0.95vw,18px)] leading-[2.2] mb-8 text-justify text-[#555]">
                                اطلاعیه‌های شارژ، قطعی آب و برق یا جلسات
                                ساختمان، همه از طریق سامانه می‌آید. هیچ‌کس
                                نمی‌گوید نمی‌دانستم؛ همه چیز در یک جا ثبت شده
                                است.
                            </p>

                            <p className="text-[clamp(12px,0.8vw,15px)] text-[#717cff] font-medium text-center">
                                لیلا نظری
                            </p>
                        </div>

                        {/* Card 3 */}

                        <div className="w-[60%] min-w-[320px] bg-white text-slate-700 p-8 rounded-[36px] shadow-2xl -mt-4 shadow-white/60">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[clamp(18px,1.2vw,24px)]">
                                    دیگر لازم نیست مدام تماس بگیرم
                                </h3>
                            </div>

                            <p className="text-[clamp(14px,0.95vw,18px)] leading-[2.2] mb-8 text-justify text-[#555]">
                                هر وقت مشکلی توی واحد پیش می‌آید، توی سامانه ثبت
                                می‌کنم و وضعیتش را لحظه‌ای می‌بینم. لازم نیست
                                چندبار به مدیر پیام بدهم که پیگیری شد یا نه؟
                            </p>

                            <p className="text-[clamp(12px,0.8vw,15px)] text-[#717cff] font-medium text-center">
                                مهدی قاسمی
                            </p>
                        </div>
                    </div>

                    {/* Tablet Layout */}

                    <div className="flex lg:hidden flex-col items-center gap-8">
                        {/* Card 1 */}

                        <div className="w-full max-w-[520px] bg-white text-slate-700 p-8 rounded-[36px] shadow-2xl shadow-white/60">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[22px]">
                                    کار با سامانه خیلی ساده ست
                                </h3>
                            </div>

                            <p className="text-[16px] leading-[2.2] mb-8 text-justify text-[#555]">
                                من تقریباً همه کارها را از پشت موبایل انجام
                                می‌دهم؛ ثبت خرابی، پیگیری و پاسخ به ساکنین. بدون
                                آموزش خاصی، بعد از یکی دو روز همه چیز برایم جا
                                افتاد.
                            </p>

                            <p className="text-[14px] text-[#717cff] font-medium text-center">
                                حسین مرادی - مدیر ساختمان ۲۴ واحدی
                            </p>
                        </div>

                        {/* Card 2 */}

                        <div className="w-full max-w-[520px] bg-white text-slate-700 p-8 rounded-[36px] shadow-2xl shadow-white/60">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[22px]">
                                    اطلاعیه‌ها گم نمی‌شوند
                                </h3>
                            </div>

                            <p className="text-[16px] leading-[2.2] mb-8 text-justify text-[#555]">
                                اطلاعیه‌های شارژ، قطعی آب و برق یا جلسات
                                ساختمان، همه از طریق سامانه می‌آید. هیچ‌کس
                                نمی‌گوید نمی‌دانستم؛ همه چیز در یک جا ثبت شده
                                است.
                            </p>

                            <p className="text-[14px] text-[#717cff] font-medium text-center">
                                لیلا نظری
                            </p>
                        </div>

                        {/* Card 3 */}

                        <div className="w-full max-w-[520px] bg-white text-slate-700 p-8 rounded-[36px] shadow-2xl shadow-white/60">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-blue-500 rounded-full" />

                                <h3 className="text-[#717cff] font-bold text-[22px]">
                                    دیگر لازم نیست مدام تماس بگیرم
                                </h3>
                            </div>

                            <p className="text-[16px] leading-[2.2] mb-8 text-justify text-[#555]">
                                هر وقت مشکلی توی واحد پیش می‌آید، توی سامانه ثبت
                                می‌کنم و وضعیتش را لحظه‌ای می‌بینم. لازم نیست
                                چندبار به مدیر پیام بدهم که پیگیری شد یا نه؟
                            </p>

                            <p className="text-[14px] text-[#717cff] font-medium text-center">
                                مهدی قاسمی
                            </p>
                        </div>
                    </div>

                    {/* Decorative Elements */}

                    <div className="absolute top-[-20%] left-[30%] opacity-70 z-[-1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="102"
                            height="102"
                            viewBox="0 0 102 102"
                        >
                            <circle
                                id="Oval"
                                cx="51"
                                cy="51"
                                r="51"
                                fill="#1ca9f7"
                            />
                        </svg>
                    </div>

                    <div className="absolute top-[40%] left-[40%] opacity-70 z-[-1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="144"
                            height="144"
                            viewBox="0 0 144 144"
                        >
                            <circle
                                id="Oval"
                                cx="72"
                                cy="72"
                                r="72"
                                fill="teal"
                            />
                        </svg>
                    </div>

                    <div className="absolute bottom-8 left-0 opacity-60 z-[-1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="136.974"
                            height="141.158"
                            viewBox="0 0 136.974 141.158"
                        >
                            <path
                                id="Polygon_1"
                                data-name="Polygon 1"
                                d="M28.958,50.223c9.353-19.953,37.731-19.953,47.084,0l11.6,24.742A26,26,0,0,1,64.1,112H40.9A26,26,0,0,1,17.36,74.965Z"
                                transform="translate(38.306) rotate(20)"
                                fill="#e0f2f1"
                            />
                        </svg>
                    </div>

                    <div className="absolute bottom-[10%] right-0 opacity-60 z-[-1]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                        >
                            <circle
                                id="Oval_Copy_3"
                                data-name="Oval Copy 3"
                                cx="18"
                                cy="18"
                                r="18"
                                fill="#89d6fb"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialSection;
