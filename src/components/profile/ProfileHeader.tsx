import { useRef, useState } from "react";
import { Camera, LogOut, Clock, KeyRound, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomButton from "../ui/CustomeButton";
import LogoutConfirmDialog from './LogoutConfirmDialog';
import ChangePasswordDialog from "./ChangePasswordDialog";
import CustomToast from "../Custom/CustomToast";

import type { User } from "@/types/authTypes";
import { translateDate } from "@/utils/translateDate";
import { uploadProfileImageService } from "@/services/userService";
import useAuthStore from "@/store/useAuthStore";

import MaleIcon from "@/assets/profile/icons8-man-60 (2).png";
import FemaleIcon from "@/assets/profile/icons8-woman-50.png";
import DefaultProfileImg from "@/assets/profile/defaultProfile.jpg";
import { useLogout } from "@/hooks/useLogout";
import type { AxiosBackendError } from "@/types/apiTypes";

interface ProfileHeaderProps {
    user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isChangePassOpen, setIsChangePassOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const { handleLogout, isLoading: isLoggingOut } = useLogout();

    const { updateUser } = useAuthStore();

    const uploadImageMutation = useMutation({
        mutationFn: uploadProfileImageService,
        onSuccess: (response) => {
            console.log(response);

            // const serverImageUrl = response?.data?.url || response?.url;

            // if (serverImageUrl) {
            //     updateUser({ profile_image_url: serverImageUrl });
            // } else if (previewImage) {
                updateUser({ profile_image_url: previewImage });
            // }

            setPreviewImage(null);

            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="تصویر پروفایل شما با موفقیت بروزرسانی شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: AxiosBackendError) => {
            console.log(error)
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
                setPreviewImage(null);
            }

            toast.custom(() => (
                <CustomToast
                    title="خطا در آپلود"
                    message={error?.response?.data?.message || "مشکلی در آپلود تصویر رخ داده است"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const handleCameraClick = () => {
        if (uploadImageMutation.isPending) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (previewImage) URL.revokeObjectURL(previewImage);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);

            uploadImageMutation.mutate(file);
        }
    };

    const handleConfirmLogout = () => {
        handleLogout(() => {
            setIsLogoutDialogOpen(false);
            console.log(1212121212)
            toast.custom(() => (
                <CustomToast
                    title="خروج موفق"
                    message="شما با موفقیت از حساب کاربری خود خارج شدید"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        });
    };

    const getRoleDetails = (role: string) => {
        switch (role) {
            case 'admin':
                return { label: 'مدیر کل', styles: "border-primary-2 text-primary-2 bg-primary-5" };
            case 'manager':
                return { label: 'مدیر ساختمان', styles: "border-danger-2 text-danger-2 bg-danger-5" };
            case 'resident':
            default:
                return { label: 'ساکن', styles: "border-success-op2-3 text-success-op2-3 bg-success-op2-5/50" };
        }
    };

    const roleInfo = getRoleDetails(user.role);
    const genderIconSrc = user.gender === 'female' ? FemaleIcon : MaleIcon;

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start border-b border-neutral-200 pb-8 w-full gap-6 md:gap-0">

            <div className="flex flex-col justify-between items-center md:items-start h-auto md:h-28 w-full md:w-auto gap-4 md:gap-0">
                <div className="flex items-center gap-4 text-[#60a5fa] border border-[#bfdbfe] bg-[#eff6ff] rounded-md px-3 py-1.5 text-xs font-medium w-full md:w-auto justify-center md:justify-start" dir="rtl">
                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>تاریخ ورود به ساختمان</span>
                    </div>
                    <span className="pt-0.5">{translateDate(user.created_at)}</span>
                </div>

                <div className="flex flex-row gap-2 w-full md:w-auto justify-center md:justify-start">
                    <CustomButton
                        variant="danger"
                        styleType="outline"
                        icon={LogOut}
                        className="h-10 px-3 text-xs rounded-lg flex-1 md:flex-none"
                        onClick={() => setIsLogoutDialogOpen(true)}
                    >
                        خروج از حساب
                    </CustomButton>

                    <CustomButton
                        variant="success2"
                        styleType="outline"
                        icon={KeyRound}
                        className="h-10 px-3 text-xs rounded-lg flex-1 md:flex-none"
                        onClick={() => setIsChangePassOpen(true)}
                    >
                        تغییر رمز عبور
                    </CustomButton>

                    <ChangePasswordDialog
                        isOpen={isChangePassOpen}
                        onClose={() => setIsChangePassOpen(false)}
                    />
                </div>
            </div>

            {/* Right/Top Section: User Info & Avatar */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full md:w-auto justify-center sm:justify-end">

                {/* User Details */}
                <div className="flex flex-col gap-2 sm:gap-3 items-center sm:items-end text-center sm:text-right order-2 sm:order-1">
                    <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-neutral-800">
                        <span>{user.first_name} {user.last_name}</span>
                        <img
                            src={genderIconSrc}
                            alt="gender"
                            className="w-8 sm:w-10 h-10 object-contain ml-1"
                        />
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <span className={`inline-flex items-center justify-center px-4 h-6 rounded-md border text-xs font-semibold pt-0.5 ${roleInfo.styles}`}>
                            {roleInfo.label}
                        </span>
                        <span className="text-neutral-500 font-medium">@{user.username}</span>
                    </div>
                </div>

                {/* User Avatar & Upload */}
                <div className="relative inline-block order-1 sm:order-2">
                    <div className="bg-white p-2 rounded-3xl shadow-sm border border-neutral-100">
                        <Avatar className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative">
                            {uploadImageMutation.isPending && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}
                            <AvatarImage
                                key={previewImage || user.profile_image_url || 'default'}
                                src={previewImage || user.profile_image_url || DefaultProfileImg}
                                className="object-cover w-full h-full"
                            />
                            <AvatarFallback className="rounded-xl bg-[#7c8aff] text-white text-2xl sm:text-3xl font-bold">
                                {user.first_name?.charAt(0)}‌{user.last_name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <motion.button
                        onClick={handleCameraClick}
                        disabled={uploadImageMutation.isPending}
                        className={`absolute -bottom-1 -left-1 bg-white border border-neutral-200 text-neutral-700 rounded-[14px] p-2 shadow-md hover:text-neutral-900 hover:border-neutral-300 transition-colors z-10 flex items-center justify-center cursor-pointer ${uploadImageMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        title="ویرایش تصویر پروفایل"
                        whileHover={uploadImageMutation.isPending ? {} : { scale: 1.02, y: -1 }}
                        whileTap={uploadImageMutation.isPending ? {} : { scale: 0.93 }}
                    >
                        <Camera size={18} strokeWidth={2.5} />
                    </motion.button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadImageMutation.isPending}
                    />
                </div>
            </div>

            <LogoutConfirmDialog
                isOpen={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
                onConfirm={handleConfirmLogout}
                isLoading={isLoggingOut}
            />
        </div>
    );
}