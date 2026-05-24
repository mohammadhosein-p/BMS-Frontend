import { useState, useEffect } from "react";
import { User as UserIcon, Mail, Edit, Save } from "lucide-react";
import CustomField from "@/components/ui/CutsomeFiled";
import type { User } from "@/types/authTypes";
import CustomButton from "../ui/CustomeButton";
import { translateNumber } from "@/utils/translateNumber";
import { profileSchema } from "@/utils/authSchema";

interface ProfileDetailsProps {
    user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
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
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        if (["phone"].includes(name)) {
            const englishValue = translateNumber(value, true);
            setFormData(prev => ({ ...prev, [name]: englishValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
            // TODO: API call to save changes
            console.log("Saved (English Data for API):", formData);
        }
        
        if (!isEditing) setErrors({});
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

            <div className="flex-1 h-full overflow-y-auto pl-2 pr-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 w-full" dir="rtl">

                    <div className="flex flex-col">
                        <CustomField
                            label="نام کاربری"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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