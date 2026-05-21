import { useState } from "react";
import { User as UserIcon, Mail, Lock, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomField from "@/components/ui/CutsomeFiled";
import type { User } from "@/types/authTypes";

interface ProfileDetailsProps {
    user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    // Component States
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username || "AliNaghiNjad",
        email: user.email || "ali@example.com",
        firstName: user.first_name || "علی",
        lastName: user.last_name || "نقی نژاد",
        password: "********",
        phone: "09000000000",
        buildingNumber: "AS123",
        unitNumber: "12"
    });

    // Event Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => {
        if (isEditing) {
            // TODO: API call to save changes
            console.log("Saved:", formData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="w-full flex flex-row gap-8 pt-2 flex-1 h-full overflow-hidden" dir="rtl">
            
            <div className="flex-1 overflow-y-auto pl-2 pb-4 
                [&::-webkit-scrollbar]:w-1.5 
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-neutral-200 
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-neutral-300"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                    
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />

                    {/* ردیف چهارم: راست (شماره ساختمان) - چپ (شماره واحد) */}
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
                        value={formData.unitNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                    
                </div>
            </div>

            {/* بخش دکمه عملیات (سمت چپ) */}
            <div className="flex shrink-0 items-start mt-[28px]">
                {isEditing ? (
                    <Button 
                        onClick={toggleEdit} 
                        className="bg-[#7fb5ff] hover:bg-[#6ca4ed] text-white rounded-xl h-10 pl-4 pr-4 flex items-center gap-2 shadow-sm transition-all"
                    >
                        <div className="bg-[#3b82f6] p-1.5 rounded-lg flex items-center justify-center">
                            <Save size={16} strokeWidth={2.5} className="text-white" />
                        </div>
                        <span className="font-bold text-sm tracking-wide">ذخیره تغییرات</span>
                    </Button>
                ) : (
                    <Button 
                        onClick={toggleEdit} 
                        className="bg-[#7c8aff] hover:bg-[#6b78e5] text-white rounded-xl h-10 px-8 flex items-center gap-2 shadow-sm transition-all"
                    >
                        <Edit size={16} strokeWidth={2.5} />
                        <span className="font-bold text-sm">ویرایش</span>
                    </Button>
                )}
            </div>

        </div>
    );
}
