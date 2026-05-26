import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, CheckCircle2 } from "lucide-react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import SelectOptions from "../ui/SelectOptions/SelectOptions";
import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CustomToast from "../Custom/CustomToast";
import CustomField from "../ui/CutsomeFiled";
import CustomButton from "../ui/CustomeButton";
import { registerSchema } from "@/utils/authSchema";

type RegisterFormData = z.infer<typeof registerSchema>;

const genderOptions = [
    { value: "male", label: "مرد", color: "blue" },
    { value: "female", label: "زن", color: "pink" },
];

export const Register = ({ phoneNumber, onInviteCode }: { phoneNumber: string; onInviteCode: () => void }) => {
    const setAuth = useAuthStore((state) => state.setAuth);

        const registerMutation = useMutation({
            mutationFn: registerService,
            onSuccess: async (data) => {
                setAuth({ user: data.user, access_token: data.access_token, refresh_token: data.refresh_token });

                toast.custom(() => (
                    <CustomToast
                        title="موفقیت‌آمیز"
                        message="ثبت‌نام شما با موفقیت انجام شد"
                        variant="success"
                        icon={<CheckCircle2 size={20} />}
                    />
                ));

                await new Promise((resolve) => setTimeout(resolve, 1000));
                onInviteCode();
            },
        });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
        defaultValues: {
            username: "",
            first_name: "", 
            last_name: "", 
            email: "",
            password: "",
            confirmPassword: "",
            gender: "male",
        },
    });
    console.log(isValid)

    const onSubmit = (data: RegisterFormData) => {
        if (registerMutation.isPending) return;

        const finalData = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            email: data.email,
            password: data.password,
            gender: data.gender,
            phone: phoneNumber,
            role: "resident",
        };

        registerMutation.mutate(finalData);
    };

    const getServerErrorMessage = () => {
        if (!registerMutation.isError) return null;
        return (registerMutation.error as any)?.response?.data?.message || "";
    };

    const serverMessage = getServerErrorMessage();

    const getErrorMessage = () => {
        const firstClientError = Object.values(errors)[0]?.message;
        if (firstClientError) return firstClientError;

        if (registerMutation.isError) {
            if (serverMessage.trim() === "this username is taken") return "این نام کاربری قبلاً انتخاب شده است";
            if (serverMessage === "this email is already registered") return "این ایمیل قبلاً ثبت شده است";
            return serverMessage || "خطایی در ثبت‌نام رخ داد";
        }

        return null;
    };

    const activeError = getErrorMessage();
    const isLoading = registerMutation.isPending;
    const isSuccess = registerMutation.isSuccess;

    const hasUsernameError = registerMutation.isError && serverMessage.trim() === "this username is taken";
    const hasEmailError = registerMutation.isError && serverMessage === "this email is already registered";

    return (
        <div className="flex flex-col justify-center text-right animate-in fade-in">
            <h2 className="text-[24px] font-black text-neutral-1 mb-2">ثبت نام جدید</h2>
            <p className="text-sm text-neutral-2 mb-6">لطفا اطلاعات خود را وارد کنید</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <CustomField
                            {...field}
                            placeholder="نام کاربری"
                            icon={<User size={18} />}
                            variant={errors.username || hasUsernameError ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                            onChange={(e) => {
                                field.onChange(e);
                                if (registerMutation.isError) registerMutation.reset();
                            }}
                        />
                    )}
                />

                <div className="flex gap-3">
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                            <CustomField
                                {...field}
                                placeholder="نام"
                                variant={errors.first_name ? "error" : isSuccess ? "success" : "default"}
                                disabled={isLoading}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (registerMutation.isError) registerMutation.reset();
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                            <CustomField
                                {...field}
                                placeholder="نام خانوادگی"
                                variant={errors.last_name ? "error" : isSuccess ? "success" : "default"}
                                disabled={isLoading}
                                onChange={(e) => {
                                    field.onChange(e);
                                    if (registerMutation.isError) registerMutation.reset();
                                }}
                            />
                        )}
                    />
                </div>

                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <SelectOptions
                            options={genderOptions as any}
                            value={field.value}
                            onChange={(val) => {
                                field.onChange(val);
                                if (registerMutation.isError) registerMutation.reset();
                            }}
                            disabled={isLoading}
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <CustomField
                            {...field}
                            type="email"
                            placeholder="ایمیل"
                            icon={<Mail size={18} />}
                            variant={errors.email || hasEmailError ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                            onChange={(e) => {
                                field.onChange(e);
                                if (registerMutation.isError) registerMutation.reset();
                            }}
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
                            onChange={(e) => {
                                field.onChange(e);
                                if (registerMutation.isError) registerMutation.reset();
                            }}
                        />
                    )}
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <CustomField
                            {...field}
                            type="password"
                            placeholder="تکرار رمز عبور"
                            icon={<Lock size={18} />}
                            variant={errors.confirmPassword ? "error" : isSuccess ? "success" : "default"}
                            disabled={isLoading}
                            onChange={(e) => {
                                field.onChange(e);
                                if (registerMutation.isError) registerMutation.reset();
                            }}
                        />
                    )}
                />

                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeError && (
                            <motion.div
                                key="error-message"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <ErrorMessage message={activeError} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <CustomButton
                    type="submit"
                    variant="primary"
                    className="w-full h-11"
                    disabled={!isValid || isLoading}
                    isLoading={isLoading}
                    loadingText="در حال ثبت نام"
                >
                    ثبت نام
                </CustomButton>
            </form>
        </div>
    );
};