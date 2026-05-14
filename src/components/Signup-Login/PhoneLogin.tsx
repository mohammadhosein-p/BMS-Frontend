import { Phone } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { translateNumber } from "@/utils/translateNumber";
import { useState, useMemo } from "react";

export const PhoneLogin = ({ onOTPlogin, onUsernameLogin , onPhoneSubmit }: { onOTPlogin: (number: string) => void; onUsernameLogin: () => void; onPhoneSubmit: (number: string) => void }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const variant = useMemo(() => {
        const englishNumber = translateNumber(phoneNumber, true);
        if (englishNumber.length === 0) return "default";

        const iranPhoneRegex = /^09\d{9}$/;
        if (iranPhoneRegex.test(englishNumber)) return "success";

        return englishNumber.length === 11 ? "error" : "default";
    }, [phoneNumber]);

    const errorMessage = useMemo(() => {
        if (variant === "error") return "شماره موبایل وارد شده معتبر نیست";
        return null;
    }, [variant]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const englishValue = translateNumber(rawValue, true);
        const onlyNums = englishValue.replace(/\D/g, "");

        if (onlyNums.length <= 11) {
            setPhoneNumber(translateNumber(onlyNums));
        }
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            const cleanNumber = translateNumber(phoneNumber, true);
            onOTPlogin(cleanNumber);
            onPhoneSubmit(phoneNumber);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col justify-center text-right animate-in fade-in duration-500">
            <h2 className="text-[24px] font-black text-neutral-1 mb-2">ورود یا ثبت‌نام در آپامو</h2>
            <p className="text-sm text-neutral-2 mb-6">لطفا شماره موبایل خود را وارد کنید</p>

            <div className="space-y-2">
                <CustomField
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    icon={<Phone size={18} />}
                    value={phoneNumber}
                    onChange={handleChange}
                    variant={variant}
                    type="tel"
                    direction="rtl"
                />

                {errorMessage && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-danger-2 bg-danger-5/10 p-2 rounded-lg mt-1 border border-danger-2/20">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-2 mt-4">
                    <CustomButton
                        variant="primary"
                        className="w-full h-11"
                        disabled={isLoading || variant !== "success"}
                        onClick={handleSubmit}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-1">
                                در حال ارسال
                                <span className="flex gap-0.5 mt-1">
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce"></span>
                                </span>
                            </span>
                        ) : (
                            "ورود به آپامو"
                        )}
                    </CustomButton>

                    <CustomButton
                        variant="secondary"
                        className="w-full h-11"
                        onClick={onUsernameLogin}
                    >
                        ورود با نام کاربری
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};