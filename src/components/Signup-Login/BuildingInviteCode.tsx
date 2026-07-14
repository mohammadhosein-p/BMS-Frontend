import { Home, ArrowLeft, CheckCircle2 } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { useState, useMemo } from "react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { validateInviteCode, refreshTokenRequest } from "@/services/authService";
import { toast } from "sonner";
import CustomToast from "../Custom/CustomToast";
import type { ApiResponse } from "@/types/authTypes";
import type { AxiosBackendError } from "@/types/apiTypes";

interface BuildingInviteCodeProps {
    onSuccess: () => void;
    onBack: () => void;
}

export const BuildingInviteCode = ({ onSuccess, onBack }: BuildingInviteCodeProps) => {
    const [inviteCode, setInviteCode] = useState("");
    const updateUser = useAuthStore((state) => state.updateUser);

    const verifyCodeMutation = useMutation({
        mutationFn: validateInviteCode,
        onSuccess: async (response: ApiResponse<{ apartment_id: string; unit_id: string }>) => {
            const innerData = response?.data;

            if (innerData?.apartment_id && innerData?.unit_id) {
                updateUser({
                    apartment_id: innerData.apartment_id,
                    unit_id: innerData.unit_id
                });

                console.log("استور با موفقیت آپدیت شد");
            } else {
                console.warn("دیتا از سرور دریافت شد اما فیلدهای آپارتمان یا واحد ناقص هستند. ساختار ساختار دریافتی:", response);
            }

            // Refresh tokens and update auth store using the refresh token API
            try {
                const currentRefreshToken = useAuthStore.getState().refresh_token;
                if (currentRefreshToken) {
                    const refreshResponse = await refreshTokenRequest(currentRefreshToken);
                    const newAccess = refreshResponse.data.access_token;
                    const newRefresh = refreshResponse.data.refresh_token;

                    const currentUser = useAuthStore.getState().user;
                    if (currentUser) {
                        const updatedUser = (refreshResponse.data as any).user || {
                            ...currentUser,
                            apartment_id: innerData?.apartment_id || currentUser.apartment_id,
                            unit_id: innerData?.unit_id || currentUser.unit_id,
                        };

                        useAuthStore.getState().setAuth({
                            user: updatedUser,
                            access_token: newAccess,
                            refresh_token: newRefresh,
                        });
                        console.log("توکن‌ها با موفقیت رفرش و آپدیت شدند");
                    }
                }
            } catch (error) {
                console.error("خطا در رفرش کردن توکن پس از تایید کد دعوت:", error);
            }

            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="ورود به ساختمان و تخصیص واحد با موفقیت انجام شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));

            await new Promise((resolve) => setTimeout(resolve, 1500));
            onSuccess();
        },
        onError: () => { }
    });

    const getErrorMessage = () => {
        if (verifyCodeMutation.isError) {
            const serverMessage = (verifyCodeMutation.error as AxiosBackendError)?.response?.data?.message;
            const normalized = typeof serverMessage === "string" ? serverMessage.trim().toLowerCase() : "";

            const messageMap: Record<string, string> = {
                "this unit has already been occupied by another resident": "این واحد قبلاً توسط ساکن دیگری اشغال شده است",
                "this invite code has expired": "کد دعوت منقضی شده است",
                "invalid or non-existent invite code": "کد دعوت وارد شده نامعتبر است یا وجود ندارد",
            };

            if (normalized && messageMap[normalized]) {
                return messageMap[normalized];
            }

            return serverMessage || "کد دعوت وارد شده معتبر نیست یا منقضی شده است";
        }
        return null;
    };


    const activeError = getErrorMessage();

    const validation = useMemo(() => {
        if (inviteCode.length === 0) return { variant: "default", isValid: false } as const;

        if (verifyCodeMutation.isError) return { variant: "error", isValid: false } as const;
        return { variant: "success", isValid: true } as const;

    }, [inviteCode, verifyCodeMutation.isError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;

        setInviteCode(rawValue);
        if (verifyCodeMutation.isError) {
            verifyCodeMutation.reset();
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validation.isValid || verifyCodeMutation.isPending) return;
        verifyCodeMutation.mutate(inviteCode);
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
                    placeholder="مثلاً CODE_FLAN"
                    icon={<Home size={18} />}
                    value={inviteCode}
                    onChange={handleChange}
                    variant={validation.variant}
                    type="text"
                    direction="rtl"
                    disabled={isLoading}
                />

                {activeError && (
                    <ErrorMessage message={activeError} />
                )}

                <div className="flex flex-col gap-2 mt-4">
                    <CustomButton
                        type="submit"
                        variant="primary"
                        className="w-full h-11"
                        disabled={!validation.isValid}
                        isLoading={isLoading}
                        loadingText="در حال بررسی"
                    >
                        تایید و ادامه
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