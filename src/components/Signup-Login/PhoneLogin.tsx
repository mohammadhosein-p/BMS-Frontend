import { Phone } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { translateNumber } from "@/utils/translateNumber";
import { useState, useMemo } from "react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import SendingDots from "../ui/SignUp-Login/SendingDots";

export const PhoneLogin = ({ onOTPlogin, onUsernameLogin, onPhoneSubmit }: { 
    onOTPlogin: (number: string) => void; 
    onUsernameLogin: () => void; 
    onPhoneSubmit: (number: string) => void 
}) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validation = useMemo(() => {
        const englishNumber = translateNumber(phoneNumber, true);
        if (englishNumber.length === 0) return { variant: "default", isValid: false };

        const iranPhoneRegex = /^09\d{9}$/;
        const isValid = iranPhoneRegex.test(englishNumber);

        if (isValid) return { variant: "success", isValid: true };
        
        return { 
            variant: englishNumber.length === 11 ? "error" : "default", 
            isValid: false 
        };
    }, [phoneNumber]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const englishValue = translateNumber(rawValue, true).replace(/\D/g, "");

        if (englishValue.length <= 11) {
            setPhoneNumber(englishValue);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (!validation.isValid || isLoading) return;

        setIsLoading(true);
        setTimeout(() => {
            onOTPlogin(phoneNumber);
            onPhoneSubmit(phoneNumber);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="flex flex-col justify-center text-right animate-in fade-in duration-500"
        >
            <h2 className="text-[24px] font-black text-neutral-1 mb-2">ورود یا ثبت‌نام در آپارمو</h2>
            <p className="text-sm text-neutral-2 mb-6">لطفا شماره موبایل خود را وارد کنید</p>

            <div className="space-y-2">
                <CustomField
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    icon={<Phone size={18} />}
                    value={translateNumber(phoneNumber)} 
                    onChange={handleChange}
                    variant={validation.variant}
                    type="tel"
                    direction="rtl"
                    inputMode="numeric"
                />

                {validation.variant === "error" && (
                    <ErrorMessage message="شماره موبایل وارد شده معتبر نیست" />
                )}

                <div className="flex flex-col gap-2 mt-4">
                    <CustomButton
                        type="submit" 
                        variant="primary"
                        className="w-full h-11"
                        disabled={isLoading || !validation.isValid}
                    >
                        {isLoading ? (
                            <SendingDots text="در حال ارسال" />
                        ) : (
                            "ورود به آپامو"
                        )}
                    </CustomButton>

                    <CustomButton
                        type="button" 
                        variant="secondary"
                        className="w-full h-11"
                        onClick={onUsernameLogin}
                    >
                        ورود با نام کاربری
                    </CustomButton>
                </div>
            </div>
        </form>
    );
};

