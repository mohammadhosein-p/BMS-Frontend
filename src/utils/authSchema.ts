import { z } from "zod";

export const baseAuthFields = {
    username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
    first_name: z.string().trim().min(1, "نام الزامی است"),
    last_name: z.string().trim().min(1, "نام خانوادگی الزامی است"),
    email: z.string().trim().email("ایمیل معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    phone: z.string().regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
    apartment_id: z.string().optional().or(z.literal("")),
    unit_id: z.string().min(1, "شماره واحد الزامی است")
};

export const registerSchema = z.object({
    username: baseAuthFields.username,
    first_name: baseAuthFields.first_name,
    last_name: baseAuthFields.last_name,
    email: baseAuthFields.email,
    password: baseAuthFields.password,
    gender: z.enum(["male", "female"], "لطفا جنسیت را انتخاب کنید"),
    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
});


export const profileSchema = z.object({
    username: baseAuthFields.username,
    first_name: baseAuthFields.first_name,
    last_name: baseAuthFields.last_name,
    email: baseAuthFields.email.or(z.literal("")), 
});

export type UpdateProfileInput = z.infer<typeof profileSchema>;

