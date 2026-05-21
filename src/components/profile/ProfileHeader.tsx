// src/components/profile/ProfileHeader.tsx
import { useRef, useState } from "react";
import { Camera, LogOut, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/authTypes";

import MaleIcon from "@/assets/profile/man.svg";
import FemaleIcon from "@/assets/profile/woman.svg";
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg"; 

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

    // Format role and select appropriate gender icon
    const roleFa = user.role === 'admin' ? 'مدیر' : 'ساکن';
    const genderIconSrc = user.gender === 'female' ? FemaleIcon : MaleIcon;

    return (
        <div className="flex flex-row justify-between items-start border-b border-neutral-200 pb-8 w-full">
            
            {/* Left Section: Join Date & Logout */}
            <div className="flex flex-col justify-between items-start h-[112px]">
                <div className="flex items-center gap-2 text-[#60a5fa] border border-[#bfdbfe] bg-[#eff6ff] rounded-lg px-3 py-1.5 text-xs font-medium">
                     <Clock size={16} />
                     <span>تاریخ ورود به ساختمان</span>
                     <span className="pt-0.5" dir="ltr">1404/12/02</span>
                </div>

                <Button 
                    variant="outline" 
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 flex gap-2 rounded-xl px-5 h-10"
                >
                    <LogOut size={18} className="rotate-180" />
                    <span className="font-semibold">خروج از حساب</span>
                </Button>
            </div>

            {/* Right Section: User Info & Avatar */}
            <div className="flex flex-row gap-6 items-center">
                
                {/* User Details */}
                <div className="flex flex-col gap-3 items-end">
            
                    <div className="flex items-center gap-2 text-2xl font-bold text-neutral-800">
                        <span>{user.first_name} {user.last_name}</span>
                        <img src={genderIconSrc} alt="gender" className="w-12 h-9" />
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                        <span className="px-4 py-0.5 rounded-md border border-[#2dd4bf] text-[#14b8a6] bg-[#f0fdfa] text-xs font-semibold">
                            {roleFa}
                        </span>
                        <span className="text-neutral-500 font-medium">@{user.username}</span>
                    </div>
                </div>

                {/* User Avatar & Upload */}
                <div className="relative inline-block">
                    <div className="bg-white p-2 rounded-[1.5rem] shadow-sm border border-neutral-100">
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

                    <button 
                        onClick={handleCameraClick}
                        className="absolute -bottom-1 -left-1 bg-white border border-neutral-200 rounded-[14px] p-1.5 shadow-md hover:bg-neutral-50 transition-colors z-10"
                        title="ویرایش تصویر پروفایل"
                    >
                        <Camera size={20} className="text-neutral-700" strokeWidth={2.5} />
                    </button>

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
