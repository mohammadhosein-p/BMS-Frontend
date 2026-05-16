import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { homeItems } from "@/config/homeItems";
import useAuthStore from "@/store/useAuthStore";

function SidebarContent() {
    const location = useLocation();
    const role = useAuthStore((store) => store.user?.role);

    return (
        <div className="h-full px-2 pt-8 md:pt-0 flex flex-col">
            {/* Logo */}
            <div className="mb-1">
                <div className="flex gap-0 justify-center items-center">
                    <img src="./src/assets/home/Logo.png" className="h-28" />

                    <img src="./src/assets/home/Logo1.png" className="h-14" />
                </div>
            </div>

            <Separator className="mb-5 text-black shadow-xs" />

            {/* Navigation */}
            <nav className="flex flex-col gap-3">
                {homeItems.map((item) => {
                    const targetPath = item.path
                        ? `/home/${item.path}`
                        : "/home";

                    const isActive = location.pathname === targetPath;

                    if (!item.roles.includes(role || "")) return null;

                    return (
                        <Link
                            key={item.path}
                            to={targetPath}
                            className="group relative overflow-hidden rounded-2xl transition-all duration-300"
                        >
                            {/* Active Border */}
                            <div
                                className={`rounded-2xl p-[1.5px] transition-all duration-300 ${isActive ? "bg-gradient-to-r from-primary-2 to-primary-4 shadow-md" : ""} `}
                            >
                                {/* Card */}
                                <div
                                    className={` flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300
                                        ${
                                            isActive
                                                ? "bg-white"
                                                : `bg-gradient-to-r ${item.color} shadow-md hover:scale-[1.01]`
                                        }`}
                                >
                                    {/* Text */}
                                    <div className="text-right">
                                        <h3
                                            className={`
                                                text-xl font-black leading-none
                                                ${
                                                    isActive
                                                        ? "text-primary-2"
                                                        : "text-white"
                                                }
                                            `}
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className={`
                                                mt-1 text-sm
                                                ${
                                                    isActive
                                                        ? "text-primary-3"
                                                        : "text-white/90"
                                                }
                                            `}
                                        >
                                            {item.subtitle}
                                        </p>
                                    </div>

                                    {/* Icon */}
                                    <div className="shrink-0">
                                        <img
                                            src={item.icon}
                                            className={`
                                                h-12 w-12 object-contain
                                                ${
                                                    isActive
                                                        ? "text-primary-2"
                                                        : "text-white"
                                                }
                                            `}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default SidebarContent;
