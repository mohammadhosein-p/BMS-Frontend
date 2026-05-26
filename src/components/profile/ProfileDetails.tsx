import { useState, useEffect } from "react";
import { User as UserIcon, Mail, Edit, Save, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; 

import CustomField from "@/components/ui/CutsomeFiled";
import CustomButton from "../ui/CustomeButton";

import type { User } from "@/types/authTypes";
import { translateNumber } from "@/utils/translateNumber";
import { profileSchema } from "@/utils/authSchema";
import { updateMyProfileService } from "@/services/userService"; 
import useAuthStore from "@/store/useAuthStore";
import CustomToast from "../Custom/CustomToast";

interface ProfileDetailsProps {
    user: User;
}

const parseBackendError = (error: any): string => {
    const serverMessage = error?.response?.data?.message || "";
    const serverErrors = error?.response?.data?.errors?.[0] || "";

    const fullErrorString = `${serverMessage} ${serverErrors}`.toLowerCase();

    if (fullErrorString.includes("users_username_key") || (fullErrorString.includes("duplicate key") && fullErrorString.includes("username"))) {
        return "این نام کاربری قبلاً توسط شخص دیگری انتخاب شده است";
    }

    if (fullErrorString.includes("users_email_key") || (fullErrorString.includes("duplicate key") && fullErrorString.includes("email"))) {
        return "این آدرس ایمیل قبلاً در سیستم ثبت شده است";
    }

    if (fullErrorString.includes("users_phone_key") || fullErrorString.includes("phone")) {
        return "این شماره تماس قبلاً در سیستم ثبت شده است";
    }

    return serverMessage || "مشکلی در ذخیره‌سازی اطلاعات رخ داده است";
};

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateUser = useAuthStore((state) => state.updateUser);

    const [formData, setFormData] = useState({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
        apartment_id: user.apartment_id || "",
        unit_id: user.unit_id || ""
    });

    useEffect(() => {
        setFormData({
            username: user.username || "",
            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            phone: user.phone || "",
            apartment_id: user.apartment_id || "",
            unit_id: user.unit_id || ""
        });
        setErrors({});
    }, [user]);

    const updateProfileMutation = useMutation({
        mutationFn: updateMyProfileService,
        onSuccess: () => {
            updateUser({
                username: formData.username,
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
            });

            setIsEditing(false);

            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="اطلاعات کاربری شما با موفقیت بروزرسانی شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: any) => {
            const friendlyMessage = parseBackendError(error);

            toast.custom(() => (
                <CustomToast
                    title="خطا در عملیات"
                    message={friendlyMessage}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        if (name === "phone") {
            const englishValue = translateNumber(value, true);
            setFormData(prev => ({ ...prev, [name]: englishValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCancel = () => {
        setFormData({
            username: user.username || "",
            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            phone: user.phone || "",
            apartment_id: user.apartment_id || "",
            unit_id: user.unit_id || ""
        });
        setErrors({});
        setIsEditing(false);
    };

    const toggleEdit = () => {
        if (isEditing) {
            const validationResult = profileSchema.safeParse(formData);

            if (!validationResult.success) {
                const newErrors: Record<string, string> = {};
                validationResult.error.issues.forEach(issue => {
                    if (issue.path[0]) {
                        newErrors[issue.path[0] as string] = issue.message;
                    }
                });
                setErrors(newErrors);
                return;
            }

            setErrors({});

            updateProfileMutation.mutate({
                username: formData.username,
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone
            });
            return;
        }

        setErrors({});
        setIsEditing(true);
    };

    return (
        <div className="w-full flex flex-row items-start gap-8 flex-1 h-full overflow-hidden">
            
            {/* بخش دکمه‌ها: سایدبار کنترل عملیات */}
            <div className="pl-1 flex flex-col gap-2 shrink-0 w-30 justify-start">
                {isEditing ? (
                    <>
                        <CustomButton
                            variant="secondary"
                            onClick={toggleEdit}
                            icon={Save}
                            disabled={updateProfileMutation.isPending} 
                            className="w-full"
                            
                        >
                            {updateProfileMutation.isPending ? "حفظ..." : "ذخیره"}
                        </CustomButton>
                        <CustomButton
                            variant="danger"
                            styleType="outline"
                            onClick={handleCancel}
                            icon={X}
                            disabled={updateProfileMutation.isPending} 
                            className="w-full"
                        >
                            انصراف
                        </CustomButton>
                    </>
                ) : (
                    <CustomButton
                        onClick={toggleEdit}
                        icon={Edit}
                        className="w-full"
                    >
                        ویرایش
                    </CustomButton>
                )}
            </div>

            <div className="flex-1 h-full overflow-y-auto pl-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 w-full" dir="rtl">

                    <div className="flex flex-col">
                        <CustomField
                            label="نام کاربری"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing || updateProfileMutation.isPending}
                            icon={<UserIcon size={18} />}
                            variant={errors.username ? "error" : "default"}
                        />
                        {errors.username && <span className="text-red-500 text-xs mt-1 px-1">{errors.username}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="ایمیل"
                            name="email"
                            value={formData.email}
                            dir="ltr"
                            onChange={handleInputChange}
                            disabled={!isEditing || updateProfileMutation.isPending}
                            icon={<Mail size={18} />}
                            variant={errors.email ? "error" : "default"}
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 px-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="نام"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            disabled={!isEditing || updateProfileMutation.isPending}
                            variant={errors.first_name ? "error" : "default"}
                        />
                        {errors.first_name && <span className="text-red-500 text-xs mt-1 px-1">{errors.first_name}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="نام خانوادگی"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            disabled={!isEditing || updateProfileMutation.isPending}
                            variant={errors.last_name ? "error" : "default"}
                        />
                        {errors.last_name && <span className="text-red-500 text-xs mt-1 px-1">{errors.last_name}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="شماره تماس"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            value={translateNumber(formData.phone)}
                            onChange={handleInputChange}
                            disabled={!isEditing || updateProfileMutation.isPending}
                            variant={errors.phone ? "error" : "default"}
                        />
                        {errors.phone && <span className="text-red-500 text-xs mt-1 px-1">{errors.phone}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="شناسه آپارتمان"
                            name="apartment_id"
                            value={formData.apartment_id}
                            onChange={handleInputChange}
                            disabled={true}
                            dir="ltr"
                            variant={errors.apartment_id ? "error" : "default"}
                        />
                        {errors.apartment_id && <span className="text-red-500 text-xs mt-1 px-1">{errors.apartment_id}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="شناسه واحد"
                            name="unit_id"
                            value={formData.unit_id}
                            onChange={handleInputChange}
                            disabled={true}
                            dir="ltr"
                            variant={errors.unit_id ? "error" : "default"}
                        />
                        {errors.unit_id && <span className="text-red-500 text-xs mt-1 px-1">{errors.unit_id}</span>}
                    </div>

                </div>
            </div>

        </div>
    );
}