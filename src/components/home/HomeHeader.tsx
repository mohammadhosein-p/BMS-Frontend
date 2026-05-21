import { Bell, Mail } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useLocation, useNavigate } from "react-router-dom"; 
import { homeItems } from "@/config/homeItems";

function HomeHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const currentItem = homeItems.find(
        (item) =>
            `/home/${item.path}` === location.pathname ||
            `/home${item.path}` === location.pathname,
    );

    return (
        <header className="h-20 shrink-0 rounded-2xl border border-neutral-4/80 bg-white px-5 shadow-sm">
            <div className="flex h-full items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center gap-2 md:gap-3">
                    
                    <button 
                        onClick={() => navigate("/home/profile")}

                        className="flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors duration-200 hover:bg-blue-50"
                    >
                        <span className="hidden sm:block text-[15px] font-bold text-neutral-1 whitespace-nowrap">
                            علی نقی نژاد
                        </span>

                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                    </button>

                    <Separator className="hidden sm:block h-10 w-px bg-neutral-4" />

                    <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-neutral-4 bg-white transition shadow-md hover:bg-neutral-5">
                        <Mail className="h-5 w-5 text-neutral-2" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
                    </button>

                    <button className="relative hidden sm:flex h-11 w-11 items-center justify-center rounded-full border border-neutral-4 bg-white transition shadow-md hover:bg-neutral-5">
                        <Bell className="h-5 w-5 text-neutral-2" />
                    </button>
                </div>

                {/* Right Side */}
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
