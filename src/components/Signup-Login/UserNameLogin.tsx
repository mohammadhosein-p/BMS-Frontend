import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import useAuthStore from "@/store/useAuthStore";
import { loginService } from "@/services/authService";
import CustomeField from "../ui/CutsomeFiled";
import CustomeButton from "../ui/CustomeButton";


const loginSchema = z.object({
    username: z.string()
        .trim()
        .min(1, "نام کاربری را وارد کنید")
        .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
    password: z.string()
        .min(1, "رمز عبور را وارد کنید")
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface UsernameLoginProps {
    onHomePage: () => void;
    onInviteCode: () => void;
}

export const UsernameLogin = ({ onHomePage, onInviteCode }: UsernameLoginProps) => {
    const setAuth = useAuthStore((state) => state.setAuth);

    const loginMutation = useMutation({
        mutationFn: loginService,
        onSuccess: async (data) => {

            await new Promise((resolve) => setTimeout(resolve, 1500));

            setAuth({ user: data.user, access_token: data.access_token, refresh_token: data.refresh_token });

            if (!data.user?.ApartmentID || data.user?.ApartmentID === null) {
                onInviteCode();
            } else {
                onHomePage();
            }
        },
        onError: () => { }
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
        if (loginMutation.isPending) return;
        loginMutation.mutate(data);
    };

    const getErrorMessage = () => {
        const firstClientError = Object.values(errors)[0]?.message;
        if (firstClientError) return firstClientError;

        if (loginMutation.isError) {
            const serverMessage = (loginMutation.error as any)?.response?.data?.message;

            if (serverMessage === "invalid username or password") {
                return "نام کاربری یا رمز عبور اشتباه است";
            }

            return serverMessage || "خطایی در برقراری ارتباط رخ داد";
        }

        return null;
    };

    const activeError = getErrorMessage();
    const isLoading = loginMutation.isPending;
    const isSuccess = loginMutation.isSuccess;
    const hasServerError = loginMutation.isError;

    return (
        <div className="relative bottom-8 flex flex-col justify-center text-right animate-in fade-in">
            <header className="mb-6">
                <h2 className="text-2xl font-black text-neutral-1 mb-2">ورود به حساب</h2>
                <p className="text-sm text-neutral-2">نام کاربری و رمز عبور خود را وارد کنید</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <CustomeField
                            {...field}
                            placeholder="نام کاربری"
                            icon={<User size={18} />}
                            variant={errors.username || hasServerError ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                            onChange={(e) => {
                                field.onChange(e);
                                if (loginMutation.isError) loginMutation.reset();
                            }}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <CustomeField
                            {...field}
                            type="password"
                            placeholder="رمز عبور"
                            icon={<Lock size={18} />}
                            variant={errors.password || hasServerError ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                            onChange={(e) => {
                                field.onChange(e);
                                if (loginMutation.isError) loginMutation.reset();
                            }}
                        />
                    )}
                />

                {activeError && <ErrorMessage message={activeError} />}

                <div className="pt-1">
                    <CustomeButton
                        type="submit"
                        variant="primary"
                        className="w-full h-11 cursor-pointer"
                        disabled={!isValid || isLoading}
                        isLoading={isLoading}
                        loadingText="در حال بررسی"
                    >
                        ورود
                    </CustomeButton>
                </div>
            </form>
        </div>
    );
};