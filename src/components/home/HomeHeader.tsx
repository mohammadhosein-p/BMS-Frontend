// import { Bell, Mail } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
// import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Link, useLocation } from "react-router-dom";
import { homeItems } from "@/config/homeItems";
// ایمپورت استور احراز هویت
import useAuthStore from "@/store/useAuthStore";

function HomeHeader() {
    const location = useLocation();
    const { user } = useAuthStore();

    const currentItem = homeItems.find(
        (item) =>
            `/home/${item.path}` === location.pathname ||
            `/home${item.path}` === location.pathname,
    );

    const getInitials = () => {
        if (!user?.first_name && !user?.last_name) return "کاربر";
        const firstLetter = user.first_name?.charAt(0) || "";
        const lastLetter = user.last_name?.charAt(0) || "";
        return `${firstLetter}‌${lastLetter}`.trim();
    };

    return (
        <header className="h-20 shrink-0 rounded-2xl border border-neutral-4/80 bg-white px-5 shadow-sm">
            <div className="flex h-full items-center justify-between">
                {/* Left Side: Profile & Notifications */}
                <div className="flex items-center gap-2 md:gap-3">

                    <Link
                        to="/home/profile"
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-blue-50 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        dir="rtl"
                    >
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage 
                                src={user?.profile_image_url || undefined} 
                                alt={`${user?.first_name || ""} ${user?.last_name || ""}`} 
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-[#7c8aff] text-white font-bold text-sm">
                                {getInitials()}
                            </AvatarFallback>
                        </Avatar>

                        <span className="hidden sm:block text-[15px] font-bold text-neutral-1 whitespace-nowrap">
                            {user ? `${user.first_name} ${user.last_name}` : "بارگذاری..."}
                        </span>
                    </Link>

                    {/* <Separator className="hidden sm:block h-10 w-px bg-neutral-4" /> */}

                    {/* <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-neutral-4 bg-white transition shadow-md hover:bg-neutral-5">
                        <Mail className="h-5 w-5 text-neutral-2" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                    </button>

                    <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-neutral-4 bg-white transition shadow-md hover:bg-neutral-5">
                        <Bell className="h-5 w-5 text-neutral-2" />
                    </button> */}
                </div>

                {/* Right Side: Title & Mobile Trigger */}
                <div className="flex items-center gap-2 md:gap-4">
                    <h1 className="text-[24px] md:text-[30px] font-extrabold text-neutral-1">
                        {currentItem?.title || "داشبورد"}
                    </h1>

                    <div className="block lg:hidden">
                        <MobileSidebar />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HomeHeader;