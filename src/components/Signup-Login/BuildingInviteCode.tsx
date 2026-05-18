import { Home, ArrowRight, ArrowLeft } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { translateNumber } from "@/utils/translateNumber";
import { useState, useMemo } from "react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import SendingDots from "../ui/SignUp-Login/SendingDots";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";

interface BuildingInviteCodeProps {
    onSuccess: () => void;
    onBack: () => void;
}

export const BuildingInviteCode = ({ onSuccess, onBack }: BuildingInviteCodeProps) => {
    const [inviteCode, setInviteCode] = useState("");

    const updateUser = useAuthStore((state) => state.updateUser);

    const verifyCodeMutation = useMutation({
        mutationFn: async (code: string) => {
            return new Promise((resolve) => setTimeout(() => resolve({ apartment_id: code }), 1500));
        },
        onSuccess: (data: any) => {
            updateUser({ apartment_id: data?.apartment_id || inviteCode });

            onSuccess();
        },
        onError: () => {

            updateUser({ apartment_id: inviteCode });
            onSuccess();
        }
    });

    const validation = useMemo(() => {
        const englishCode = translateNumber(inviteCode, true).trim();
        if (englishCode.length === 0) return { variant: "default", isValid: false };

        const isValid = englishCode.length >= 4;

        if (isValid) return { variant: "success", isValid: true };
        return { variant: "default", isValid: false };
    }, [inviteCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const englishValue = translateNumber(rawValue, true);

        if (englishValue.length <= 10) {
            setInviteCode(rawValue);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validation.isValid || verifyCodeMutation.isPending) return;

        const englishCode = translateNumber(inviteCode, true);
        verifyCodeMutation.mutate(englishCode);
    };

    const isLoading = verifyCodeMutation.isPending;

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex flex-col justify-center text-right animate-in fade-in"
        >
            <h2 className="text-[24px] font-black text-neutral-1 mb-2">ورود کد دعوت ساختمان</h2>
            <p className="text-sm text-neutral-2 mb-6">لطفاً کد دعوت سازمانی یا مسکونی ساختمان خود را وارد کنید</p>

            <div className="space-y-2">
                <CustomField
                    placeholder="مثلاً ۱۲۳۴۵"
                    icon={<Home size={18} />}
                    value={inviteCode}
                    onChange={handleChange}
                    variant={validation.variant}
                    type="text"
                    direction="rtl"
                    disabled={isLoading}
                />

                {verifyCodeMutation.isError && (
                    <ErrorMessage message="کد دعوت وارد شده معتبر نیست یا منقضی شده است" />
                )}

                <div className="flex flex-col gap-2 mt-4">
                    <CustomButton
                        type="submit"
                        variant="primary"
                        className="w-full h-11"
                        disabled={isLoading || !validation.isValid}
                    >
                        {isLoading ? (
                            <SendingDots text="در حال بررسی" />
                        ) : (
                            "تایید و ادامه"
                        )}
                    </CustomButton>
                    <CustomButton
                        type="button"
                        variant="secondary"
                        styleType="soft"
                        className="w-full h-11"
                        disabled={isLoading}
                        icon={ArrowLeft}
                        onClick={onBack}
                    >
                        بازگشت
                    </CustomButton>

                </div>
            </div>
        </form>
    );
};