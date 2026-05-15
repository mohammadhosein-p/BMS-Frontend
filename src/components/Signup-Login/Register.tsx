import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "../ui/SignUp-Login/ErrorMessage";
import SendingDots from "../ui/SignUp-Login/SendingDots";
import SelectOptions from "../ui/SelectOptions/SelectOptions";
import useAuthStore from "@/store/userStore/userStore";


const registerSchema = z.object({
	username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
	firstName: z.string().trim().min(1, "نام الزامی است"),
	lastName: z.string().trim().min(1, "نام خانوادگی الزامی است"),
	email: z.string().trim().email("ایمیل معتبر نیست"),
	password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
	gender: z.enum(["male", "female"], "لطفا جنسیت را انتخاب کنید"),
	confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
}).refine((data) => data.password === data.confirmPassword, {
	message: "رمز عبور و تکرار آن مطابقت ندارند",
	path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const gender = [
	{ value: "male", label: "مرد", color: "blue" },
	{ value: "female", label: "زن", color: "pink" },
];

export const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const setAuth = useAuthStore((state) => state.setAuth);

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
			gender: "male",
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
					name="gender"
					control={control}
					render={({ field }) => (
						<SelectOptions
							options={gender}
							value={field.value}
							onChange={field.onChange}
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
					<ErrorMessage message={firstError} />
				)}

				<CustomButton
					type="submit"
					variant="primary"
					className="w-full h-11"
					disabled={isLoading || !isValid}
				>
					{isLoading ? (
						<SendingDots text="در حال ثبت نام" />
					) : "ثبت نام"}
				</CustomButton>
			</form>
		</div>
	);
};

