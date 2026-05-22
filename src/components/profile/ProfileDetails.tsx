import { useState } from "react";
import { User as UserIcon, Mail, Lock, Edit, Save } from "lucide-react";
import { z } from "zod";
import CustomField from "@/components/ui/CutsomeFiled";
import type { User } from "@/types/authTypes";
import CustomButton from "../ui/CustomeButton";
import { translateNumber } from "@/utils/translateNumber";

// Zod validation schema
const profileSchema = z.object({
    username: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر است"),
    email: z.string().email("فرمت ایمیل نامعتبر است").or(z.literal("")),
    firstName: z.string().min(2, "نام الزامی است"),
    lastName: z.string().min(2, "نام خانوادگی الزامی است"),
    password: z.string().min(4, "رمز عبور باید حداقل 4 حرف باشد"),
    phone: z.string().regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
    buildingNumber: z.string(),
    unitNumber: z.string().min(1, "شماره واحد الزامی است")
});

interface ProfileDetailsProps {
    user: User;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
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
        
        // Clear error for the field being typed in
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        if (["phone", "unitNumber"].includes(name)) {
            const englishValue = translateNumber(value, true);
            setFormData(prev => ({ ...prev, [name]: englishValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const toggleEdit = () => {
        if (isEditing) {
            // Validate data on save attempt
            const validationResult = profileSchema.safeParse(formData);
            
            if (!validationResult.success) {
                // Map Zod errors to state
                const newErrors: Record<string, string> = {};
                validationResult.error.issues.forEach(issue => {
                    if (issue.path[0]) {
                        newErrors[issue.path[0] as string] = issue.message;
                    }
                });
                setErrors(newErrors);
                return; // Stop saving if validation fails
            }

            // Clear errors on successful validation
            setErrors({});
            // TODO: API call to save changes
            console.log("Saved (English Data for API):", formData);
        }
        
        // Clear errors when canceling edit mode
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
                        />
                        {errors.username && <span className="text-red-500 text-xs mt-1 px-1">{errors.username}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="ایمیل"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            icon={<Mail size={18} />}
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 px-1">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="نام"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs mt-1 px-1">{errors.firstName}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="نام خانوادگی"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.lastName && <span className="text-red-500 text-xs mt-1 px-1">{errors.lastName}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="رمز عبور"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            icon={<Lock size={18} />}
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1 px-1">{errors.password}</span>}
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
                        />
                        {errors.phone && <span className="text-red-500 text-xs mt-1 px-1">{errors.phone}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="شماره ساختمان"
                            name="buildingNumber"
                            value={formData.buildingNumber}
                            onChange={handleInputChange}
                            disabled={true}
                        />
                        {errors.buildingNumber && <span className="text-red-500 text-xs mt-1 px-1">{errors.buildingNumber}</span>}
                    </div>

                    <div className="flex flex-col">
                        <CustomField
                            label="شماره واحد"
                            name="unitNumber"
                            inputMode="numeric"
                            value={translateNumber(formData.unitNumber)}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        {errors.unitNumber && <span className="text-red-500 text-xs mt-1 px-1">{errors.unitNumber}</span>}
                    </div>

                </div>
            </div>

        </div>
    );
}
