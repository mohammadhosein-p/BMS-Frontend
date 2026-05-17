import { translateNumber } from "@/utils/translateNumber";
import CustomButton from "../ui/CustomeButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useEffect, useState, useCallback } from "react";
import SendingDots from "../ui/SignUp-Login/SendingDots";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpService, sendOtpService } from "@/services/authService";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import useAuthStore from "@/store/userStore/userStore";

interface OTPVerifyProps {
	onBack: () => void;
	OnRegister: () => void;
	onHomePage: () => void;
	isUserExists?: boolean;
	phoneNumber: string;
}

export const OTPVerify = ({ onBack, OnRegister, onHomePage, isUserExists = false, phoneNumber }: OTPVerifyProps) => {
	const [value, setValue] = useState("");
	const [timer, setTimer] = useState(120);
	const setAuth = useAuthStore((state) => state.setAuth);

	const verifyOtpMutation = useMutation({
		mutationFn: verifyOtpService,
		onSuccess: (data) => {
			if ("isUser" in data && data.isUser === false) {
				OnRegister();
			}
			else if ("access" in data && "refresh" in data && "user" in data) {
				setAuth({ user: data.user, access: data.access, refresh: data.refresh });
				onHomePage();
			}
		},
		onError: () => {
			OnRegister();
		}
	});

	const sendOtpMutation = useMutation({
		mutationFn: sendOtpService,
		onSuccess: () => {
			setTimer(120);
			setValue("");
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
		sendOtpMutation.mutate(phoneNumber);
	};

	const handleSubmit = () => {
		if (value.length !== 5) return;
		verifyOtpMutation.mutate({ phone: phoneNumber, code: translateNumber(value, true) });
	};

	const errorMessage = verifyOtpMutation.error 
        ? (verifyOtpMutation.error as any)?.response?.data?.message || "کد ورود نامعتبر است"
        : null;
	const isLoading = verifyOtpMutation.isPending || sendOtpMutation.isPending;

	return (
		<div className="flex flex-col text-right animate-in">
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
					className="text-primary-2 text-xs font-bold mr-2 hover:text-primary-1 transition-colors cursor-pointer"
					disabled={isLoading}
				>
					تغییر شماره
				</button>
			</div>

			<div className="flex justify-center mb-6" dir="ltr">
				<InputOTP
					maxLength={5}
					value={value}
					onChange={(val) => setValue(translateNumber(val))}
					onComplete={(finalValue) => {
						verifyOtpMutation.mutate({ phone: phoneNumber, code: translateNumber(finalValue, true) });
					}}
					disabled={isLoading}
					aria-invalid={verifyOtpMutation.isError ? "true" : "false"}
				>
					<InputOTPGroup className="gap-3">
						{[...Array(5)].map((_, index) => (
							<InputOTPSlot
								key={index}
								index={index}
								className="w-14 h-16 text-xl font-semibold text-center border rounded-[12px] transition-all"
							/>
						))}
					</InputOTPGroup>
				</InputOTP>
			</div>

			<div className="mb-3">
                {verifyOtpMutation.isError && <ErrorMessage message={errorMessage} />}
            </div>

			<div className="text-sm mb-6 text-center h-5">
				{timer > 0 ? (
					<p className="text-neutral-3">
						مانده تا دریافت کد مجدد: <span className="text-primary-1">{formatTimer(timer)}</span>
					</p>
				) : (
					<button
						onClick={handleResend}
						className="text-primary-2 font-bold hover:underline transition-all cursor-pointer"
						disabled={isLoading}
					>
						ارسال دوباره کد
					</button>
				)}
			</div>

			<div className="space-y-3">
				<CustomButton
					variant="primary"
					className="w-full h-11"
					onClick={handleSubmit}
					disabled={value.length !== 5 || isLoading}
				>
					{verifyOtpMutation.isPending ? (
						<SendingDots text="در حال تایید" />
					) : (
						"تایید و ادامه"
					)}
				</CustomButton>
			</div>
		</div>
	);
};