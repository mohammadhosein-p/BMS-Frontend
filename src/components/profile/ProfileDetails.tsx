import { useState } from "react";
import { User as UserIcon, Mail, Lock, Edit, Save } from "lucide-react";
import CustomField from "@/components/ui/CutsomeFiled";
import type { User } from "@/types/authTypes";
import CustomButton from "../ui/CustomeButton";
import { translateNumber } from "@/utils/translateNumber";

interface ProfileDetailsProps {
    user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username || "AliNaghiNjad",
        email: user.email || "ali@example.com",
        firstName: user.first_name || "علی",
        lastName: user.last_name || "نقی نژاد",
        password: "234",
        phone: "09000000000",
        buildingNumber: "AS123",
        unitNumber: "12"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (["phone", "unitNumber"].includes(name)) {
            const englishValue = translateNumber(value, true);
            setFormData(prev => ({ ...prev, [name]: englishValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            // TODO: API call to save changes
            console.log("Saved (English Data for API):", formData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full flex flex-row items-start gap-8 flex-1 h-full overflow-hidden">

            <div className="pl-3 flex flex-row items-center shrink-0 w-28 justify-start">
                {isEditing ? (
                    <CustomButton
                        variant="secondary"
                        onClick={toggleEdit}
                        icon={Save}
                    >
                        ذخیره
                    </CustomButton>
                ) : (
                    <CustomButton
                        onClick={toggleEdit}
                        icon={Edit}
                    >
                        ویرایش
                    </CustomButton>
                )}
            </div>

            {/* بخش فیلدهای فرم (سمت راست) - تمام فضای باقی‌مانده را پر می‌کند */}
            <div className="flex-1 h-full overflow-y-auto pl-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 w-full" dir="rtl">

                    <CustomField
                        label="نام کاربری"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<UserIcon size={18} />}
                    />
                    <CustomField
                        label="ایمیل"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Mail size={18} />}
                    />

                    <CustomField
                        label="نام"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <CustomField
                        label="نام خانوادگی"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    <CustomField
                        label="رمز عبور"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        icon={<Lock size={18} />}
                    />
                    <CustomField
                        label="شماره تماس"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={translateNumber(formData.phone)}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />

                    <CustomField
                        label="شماره ساختمان"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        onChange={handleInputChange}
                        disabled={true}
                    />
                    <CustomField
                        label="شماره واحد"
                        name="unitNumber"
                        inputMode="numeric"
                        value={translateNumber(formData.unitNumber)}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />

                </div>
            </div>

        </div>
    );
}