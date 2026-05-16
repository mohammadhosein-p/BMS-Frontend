import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { homeItems } from "@/config/homeItems";
import useAuthStore from "@/store/useAuthStore";
import { motion } from "framer-motion";

import Logo from "@/assets/home/Logo.png";
import Logo1 from "@/assets/home/Logo1.png";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function SidebarContent() {
    const location = useLocation();
    const role = useAuthStore((store) => store.user?.role);

    return (
        <div className="h-full px-4 pt-1 md:pt-0 flex flex-col dir-rtl">
            {/* Logo */}
            <div className="mb-2 px-4 w-full">
                <div className="flex justify-center items-center flex-row-reverse w-full">
                    <img
                        src={Logo1}
                        className="h-12 object-contain"
                        alt="Logo Text"
                    />
                    <img
                        src={Logo}
                        className="h-20 w-22 object-contain"
                        alt="Logo Icon"
                    />
                </div>
            </div>

            <Separator className="mb-4 bg-gray-200" />

            {/* Navigation container with Stagger animation */}
            <motion.nav
                className="flex flex-col gap-2"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {homeItems.map((item) => {
                    const targetPath = item.path ? `/home/${item.path}` : "/home";
                    const isActive = location.pathname === targetPath;

                    if (!item.roles.includes(role || "")) return null;

                    const rawColor = item.text_color.match(/\[(.*?)\]/)?.[1] || "#000000";

                    return (
                        <motion.div
                            key={item.path}
                            variants={itemVariants as any}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to={targetPath}
                                className="group relative rounded-lg overflow-hidden block"
                            >
                                <motion.div
                                    layout
                                    className={`flex flex-row-reverse items-center justify-between rounded-lg px-6 py-4 border-2 transition-colors duration-300
                                        ${isActive
                                                ? "bg-white"
                                                : `bg-gradient-to-r ${item.color} border-accent text-white`
                                        }`}
                                    style={isActive ? { borderColor: rawColor } : {}}
                                >
                                    {/* Icon Wrapper */}
                                    <div className="shrink-0 flex items-center justify-center">
                                        {(() => {
                                            const IconComponent = item.icon;
                                            return (
                                                <IconComponent
                                                    size={32}
                                                    strokeWidth={2}
                                                    className={`transition-colors duration-300 ${isActive
                                                            ? item.text_color
                                                            : "text-white opacity-90 group-hover:opacity-100"
                                                    }`}
                                                />
                                            );
                                        })()}
                                    </div>

                                    {/* Text Content */}
                                    <div className="text-right flex-1 pr-2">
                                        <h3
                                            className="text-xl font-iranyekan font-extrabold tracking-tight transition-colors duration-300"
                                            style={isActive ? { color: rawColor } : { color: "#ffffff" }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="text-xs mt-0.5 font-medium transition-colors duration-300"
                                            style={isActive ? { color: rawColor, opacity: 0.8 } : { color: "rgba(255,255,255,0.8)" }}
                                        >
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.nav>
        </div>
    );
}

export default SidebarContent;
