import { useRef, useState } from "react";
import { Camera, LogOut, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/authTypes";

import MaleIcon from "@/assets/profile/icons8-man-60 (2).png";
import FemaleIcon from "@/assets/profile/icons8-woman-50.png";
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg";
import { translateDate } from "@/utils/translateDate";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
    user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Trigger hidden file input
    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    // Handle profile image preview
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    const isAdmin = user.role === 'admin';
    const roleFa = isAdmin ? 'مدیر' : 'ساکن';
    const genderIconSrc = user.gender === 'female' ? FemaleIcon : MaleIcon;

    const roleBadgeStyles = isAdmin
        ? "border-danger-2 text-danger-2 bg-danger-5"
        : "border-success-op2-3 text-success-op2-3 bg-success-op2-5/50";

    return (
        <div className="flex flex-row justify-between items-start border-b border-neutral-200 pb-8 w-full 
        ">

            {/* Left Section: Join Date & Logout */}
            <div className="flex flex-col justify-between items-start h-28">
                <div className="flex items-center gap-4 text-[#60a5fa] border border-[#bfdbfe] bg-[#eff6ff] rounded-md px-3 py-1.5 text-xs font-medium" dir="rtl">
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>تاریخ ورود به ساختمان</span>
                    </div>
                    <span className="pt-0.5">{translateDate("1405/02/05")}</span>
                </div>

                <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 flex gap-2 rounded-lg px-5 h-10"
                >
                    <LogOut size={18} className="rotate-180" />
                    <span className="font-semibold">خروج از حساب</span>
                </Button>
            </div>

            {/* Right Section: User Info & Avatar */}
            <div className="flex flex-row gap-6 items-center">

                {/* User Details */}
                <div className="flex flex-col gap-3 items-end">

                    <div className="flex items-center gap-1 text-2xl font-bold text-neutral-800">
                        <span>{user.first_name} {user.last_name}</span>
                        <img
                            src={genderIconSrc}
                            alt="gender"
                            className="w-10 h-10 object-contain ml-1"
                        />
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <span className={`inline-flex items-center justify-center px-4 h-6 rounded-md border text-xs font-semibold pt-0.5 ${roleBadgeStyles}`}>
                            {roleFa}
                        </span>
                        <span className="text-neutral-500 font-medium">@{user.username}</span>
                    </div>
                </div>

                {/* User Avatar & Upload */}
                <div className="relative inline-block">
                    <div className="bg-white p-2 rounded-3xl shadow-sm border border-neutral-100">
                        <Avatar className="w-24 h-24 rounded-xl overflow-hidden">
                            <AvatarImage
                                src={previewImage || user.profile_image_url || DefaultProfileImg}
                                className="object-cover"
                            />
                            <AvatarFallback className="rounded-xl bg-[#7c8aff] text-white text-3xl font-bold">
                                {user.first_name?.charAt(0)}‌{user.last_name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <motion.button
                        onClick={handleCameraClick}
                        className="absolute -bottom-1 -left-1 bg-white border border-neutral-200 text-neutral-700 rounded-[14px] p-2 shadow-md hover:text-neutral-900 hover:border-neutral-300 transition-colors z-10 flex items-center justify-center cursor-pointer"
                        title="ویرایش تصویر پروفایل"
                        whileHover={{
                            scale: 1.02,
                            y: -1
                        }}
                        whileTap={{
                            scale: 0.93
                        }}
                    >
                        <Camera size={18} strokeWidth={2.5} />
                    </motion.button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
}