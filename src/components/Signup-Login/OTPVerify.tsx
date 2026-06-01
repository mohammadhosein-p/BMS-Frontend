import { translateNumber } from "@/utils/translateNumber";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpService, sendOtpService } from "@/services/authService";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import useAuthStore from "@/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../ui/CustomeButton";

interface OTPVerifyProps {
    onBack: () => void;
    OnRegister: () => void;
    onHomePage: () => void;
    onInviteCode: () => void;
    phoneNumber: string;
}

export const OTPVerify = ({ onBack, OnRegister, onHomePage, onInviteCode, phoneNumber }: OTPVerifyProps) => {
    const [value, setValue] = useState("");
    const [timer, setTimer] = useState(10);
    const { setAuth } = useAuthStore((state) => state);
    const isUserExists = false;

    const verifyOtpMutation = useMutation({
        mutationFn: verifyOtpService,
        onSuccess: (response: any) => {
            if (response?.message === "account_not_found") {
                OnRegister();
                return;
            }

            const { data } = response;
            if (data?.user && data?.access_token && data?.refresh_token) {
                setAuth({
                    user: data.user,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token
                });

                if (!data.user.apartment_id) {
                    onInviteCode();
                } else {
                    onHomePage();
                }
            }
        },
        onError: (error) => {
            console.error("Verification Error:", error);
        }
    });

    const sendOtpMutation = useMutation({
        mutationFn: sendOtpService,
        onSuccess: () => {
            setTimer(10);
            setValue("");
            if (verifyOtpMutation.isError) verifyOtpMutation.reset();
        },
    });

    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const formatTimer = useCallback((seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return translateNumber(`${m}:${s.toString().padStart(2, '0')}`);
    }, []);

    const handleResend = () => {
        if (sendOtpMutation.isPending) return;
        sendOtpMutation.mutate(phoneNumber);
    };

    const handleSubmit = () => {
        const cleanOtp = translateNumber(value, true);
        if (cleanOtp.length !== 5 || verifyOtpMutation.isPending) return;
        
        verifyOtpMutation.mutate({ phone: phoneNumber, code: cleanOtp });
    };

    const errorMessage = useMemo(() => {
        if (!verifyOtpMutation.isError) return null;

        const errorResponse = (verifyOtpMutation.error as any)?.response?.data;

        if (errorResponse?.errors?.includes("invalid_otp") || errorResponse?.message === "invalid_otp") {
            return "کد وارد شده اشتباه است";
        }

        return "کد تایید نامعتبر است یا منقضی شده است";
    }, [verifyOtpMutation.isError, verifyOtpMutation.error]);

    const isVerifying = verifyOtpMutation.isPending;
    const isResending = sendOtpMutation.isPending;
    const isGlobalLoading = isVerifying || isResending;

    return (
        <div className="flex flex-col text-right animate-in fade-in duration-300">
            <h2 className="text-[24px] font-black text-neutral-1 mb-2">کد تایید را وارد کنید</h2>

            <div className="text-sm leading-7 mb-6" dir="rtl">
                <p className="text-neutral-2 m-0 inline">
                    {isUserExists
                        ? "کد تایید به شماره "
                        : "حساب کاربری با این شماره وجود ندارد. برای ساخت حساب، کد تایید به "}
                    <span className="font-bold text-neutral-1 mx-1">
                        {translateNumber(phoneNumber)}
                    </span>
                    ارسال شد.
                </p>
                <button
                    onClick={onBack}
                    className="text-primary-2 text-xs font-bold mr-2 hover:text-primary-1 transition-colors cursor-pointer disabled:opacity-50"
                    disabled={isGlobalLoading}
                >
                    تغییر شماره
                </button>
            </div>

            <div className="flex justify-center mb-4" dir="ltr">
                <InputOTP
                    maxLength={5}
                    value={value}
                    onChange={(val) => {
                        setValue(translateNumber(val));
                        if (verifyOtpMutation.isError) verifyOtpMutation.reset(); 
                    }}
                    onComplete={(finalValue) => {
                        const cleanOtp = translateNumber(finalValue, true);
                        if (cleanOtp.length === 5) {
                            verifyOtpMutation.mutate({ phone: phoneNumber, code: cleanOtp }); 
                        }
                    }}
                    disabled={isGlobalLoading}
                    aria-invalid={verifyOtpMutation.isError ? "true" : "false"}
                >
                    <InputOTPGroup className="gap-3">
                        {[...Array(5)].map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                className={`w-14 h-16 text-xl font-semibold text-center border rounded-[12px] transition-all ${
                                    verifyOtpMutation.isError ? "border-danger-2 bg-danger-5/10 text-danger-1" : ""
                                }`} 
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <div className="mb-2 min-h-6">
                <AnimatePresence mode="wait">
                    {verifyOtpMutation.isError && errorMessage && (
                        <motion.div
                            key="otp-error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ErrorMessage message={errorMessage} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="text-sm mb-6 text-center h-5">
                {timer > 0 ? (
                    <p className="text-neutral-3">
                        مانده تا دریافت کد مجدد: <span className="text-primary-1">{formatTimer(timer)}</span>
                    </p>
                ) : (
                    <button
                        onClick={handleResend}
                        className="text-primary-2 font-bold hover:underline transition-all cursor-pointer disabled:opacity-50"
                        disabled={isGlobalLoading}
                    >
                        {isResending ? "در حال ارسال..." : "ارسال دوباره کد"}
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <CustomButton
                    variant="primary"
                    className="w-full h-11"
                    onClick={handleSubmit}
                    disabled={value.length !== 6 || isGlobalLoading}
                    isLoading={isVerifying}
                    loadingText="در حال تایید"
                >
                    تایید و ادامه
                </CustomButton>
            </div>
        </div>
    );
};