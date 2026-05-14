import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

const registerSchema = z.object({
	username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
	firstName: z.string().trim().min(1, "نام الزامی است"),
	lastName: z.string().trim().min(1, "نام خانوادگی الزامی است"),
	email: z.string().trim().email("ایمیل معتبر نیست"),
	password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
	confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "رمز عبور و تکرار آن مطابقت ندارند",
	path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		mode: "onTouched", 
		defaultValues: {
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		try {
			console.log("Form Data:", data);
			await new Promise(resolve => setTimeout(resolve, 2000));
		} finally {
			setIsLoading(false);
		}
	};

	const firstError = Object.values(errors)[0]?.message as string;

	return (
		<div className="flex flex-col justify-center text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
			<h2 className="text-[24px] font-black text-neutral-1 mb-2">ثبت نام جدید</h2>
			<p className="text-sm text-neutral-2 mb-6">لطفا اطلاعات خود را وارد کنید</p>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

				<Controller
					name="username"
					control={control}
					render={({ field }) => (
						<CustomField
							{...field}
							placeholder="نام کاربری"
							icon={<User size={18} />}
							variant={errors.username ? "error" : "default"}
							disabled={isLoading}
						/>
					)}
				/>

				<div className="flex gap-3">
					<Controller
						name="firstName"
						control={control}
						render={({ field }) => (
							<CustomField
								{...field}
								placeholder="نام"
								variant={errors.firstName ? "error" : "default"}
								disabled={isLoading}
							/>
						)}
					/>
					<Controller
						name="lastName"
						control={control}
						render={({ field }) => (
							<CustomField
								{...field}
								placeholder="نام خانوادگی"
								variant={errors.lastName ? "error" : "default"}
								disabled={isLoading}
							/>
						)}
					/>
				</div>

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<CustomField
							{...field}
							type="email"
							placeholder="ایمیل"
							icon={<Mail size={18} />}
							variant={errors.email ? "error" : "default"}
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
							variant={errors.password ? "error" : "default"}
							disabled={isLoading}
						/>
					)}
				/>

				{/* تکرار رمز عبور */}
				<Controller
					name="confirmPassword"
					control={control}
					render={({ field }) => (
						<CustomField
							{...field}
							type="password"
							placeholder="تکرار رمز عبور"
							icon={<Lock size={18} />}
							variant={errors.confirmPassword ? "error" : "default"}
							disabled={isLoading}
						/>
					)}
				/>
				{firstError && (
					<p className="text-xs text-danger-2 bg-danger-5/10 p-2.5 rounded-xl border border-danger-2/20 animate-in zoom-in-95 duration-300">
						{firstError}
					</p>
				)}

				<CustomButton
					type="submit"
					variant="primary"
					className="w-full h-11"
					disabled={isLoading}
				>
					{isLoading ? (
						<span className="flex items-center gap-1">
                                در حال ثبت نام
                                <span className="flex gap-0.5 mt-1">
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1 h-1 bg-neutral-3 rounded-full animate-bounce"></span>
                                </span>
                            </span>
					) : "ثبت نام"}
				</CustomButton>
			</form>
		</div>
	);
};