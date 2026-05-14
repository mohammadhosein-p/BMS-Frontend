function Landing() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* Background Shapes */}

            <svg
                className="absolute top-[-10px] left-[-10px] w-[95vw] min-w-[1100px] max-w-[1400px] h-auto z-0"
                viewBox="0 0 1875.9 1304"
                fill="none"
            >
                <path
                    d="M0,10A10,10,0,0,1,10,0H1775.845c65.7,0,113.55,62.278,96.625,125.762l-243.183,912.109a100,100,0,0,1-84.251,73.47L0,1304Z"
                    fill="#717cff"
                />
            </svg>

            <svg
                className="absolute top-[-80px] right-0 w-[40vw] min-w-[500px] max-w-[600px] h-auto z-10"
                viewBox="0 0 993 1059"
                fill="none"
            >
                <path
                    d="M0,0H993V1059L245.506,940.517a100,100,0,0,1-82.6-80.163Z"
                    fill="#4db6ac"
                />
            </svg>

            {/* Header */}

            <header className="relative z-30">
                <div className="relative max-w-[1280px] mx-auto px-8 pt-8 flex items-center">
                    {/* Logo */}

                    <img
                        src="./src/assets/landing/header-logo.svg"
                        alt="logo"
                        className="w-20"
                    />

                    {/* Center Navigation */}

                    <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-20 text-white font-medium text-lg">
                        <a href="#" className="transition hover:scale-115">
                            خانه
                        </a>

                        <a href="#" className="transition hover:scale-115 ">
                            تماس با ما
                        </a>

                        <a href="#" className="transition hover:scale-115">
                            ورود
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}

            <section className="relative min-h-screen z-20">
                {/* Text Content */}

                <div className="absolute top-2/5 left-[10vw] -translate-y-1/2 w-[42vw] max-w-[600px] min-w-[320px] text-white text-center">
                    <img
                        src="./src/assets/landing/section-logo.svg"
                        alt="section-logo"
                        className="w-[23vw]  mx-auto"
                    />

                    <h2 className="mt-6 text-[clamp(28px,3vw,40px)] font-bold leading-relaxed">
                        سامانه هوشمند مدیریت ساختمان
                    </h2>

                    <p className="mt-8 text-[clamp(16px,1.2vw,22px)] leading-[2.4] text-white/90">
                        گزارش خرابی، پیگیری تعمیرات، قوانین و ارتباط با مدیر،
                        همه در یک سامانه
                    </p>

                    {/* CTA Buttons */}

                    <div className="mt-12 flex items-center justify-center gap-28">
                        <button className="bg-white text-[#717cff] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition hover:scale-105">
                           ورود با نام کاربری
                        </button>

                        <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg transition hover:bg-white hover:text-[#717cff]">
                           ثبت نام
                        </button>
                    </div>
                </div>

                {/* Person Image */}

                <img
                    src="./src/assets/landing/person.svg"
                    alt="person"
                    className="absolute top-[10px] right-[2%] w-[30vw] min-w-[320px] max-w-[540px] z-20"
                />
            </section>
        </div>
    );
}

export default Landing;
