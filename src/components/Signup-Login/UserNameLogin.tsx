import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { User, Lock, ArrowLeft } from "lucide-react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import SendingDots from "../ui/SignUp-Login/SendingDots";
import useAuthStore from "@/store/userStore/userStore";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/authService";

const loginSchema = z.object({
    username: z.string().trim().min(3, "نام کاربری را وارد کنید"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface UsernameLoginProps {
    onBack: () => void;
}

export const UsernameLogin = ({ onBack }: UsernameLoginProps) => {
    const setAuth = useAuthStore((state) => state.setAuth);

    const loginMutation = useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            setAuth({ user: data.user, access: data.access, refresh: data.refresh });
			console.log("Login successful:", data);
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormData) => {
        const finalData = {
            username: data.username,
            password: data.password,
        };
        loginMutation.mutate(finalData);
    };

    const firstError = Object.values(errors)[0]?.message;
    const isLoading = loginMutation.isPending;
    const isSuccess = loginMutation.isSuccess;

    return (
        <div className="flex flex-col justify-center text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-6">
                <h2 className="text-2xl font-black text-neutral-1 mb-2">ورود به حساب</h2>
                <p className="text-sm text-neutral-2">نام کاربری و رمز عبور خود را وارد کنید</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <CustomField
                            {...field}
                            placeholder="نام کاربری"
                            icon={<User size={18} />}
                            variant={errors.username ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <CustomField
                            {...field}
                            type="password"
                            placeholder="رمز عبور"
                            icon={<Lock size={18} />}
                            variant={errors.password ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                        />
                    )}
                />

                {firstError && <ErrorMessage message={firstError} />}
                {loginMutation.isError && (
                    <ErrorMessage message="نام کاربری یا رمز عبور اشتباه است" />
                )}

                <div className="pt-2 flex flex-col gap-3">
                    <CustomButton
                        type="submit"
                        variant="primary"
                        className="w-full h-11"
                        disabled={isLoading || !isValid}
                    >
                        {isLoading ? (
                            <SendingDots text="در حال بررسی" />
                        ) : "ورود"}
                    </CustomButton>

                    <CustomButton
                        type="button"
                        variant="primary"
                        styleType="soft"
                        onClick={onBack}
                        icon={ArrowLeft}
                        className="w-full h-11 border-none shadow-none"
                        disabled={isLoading}
                    >
                        بازگشت به ورود با شماره
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};