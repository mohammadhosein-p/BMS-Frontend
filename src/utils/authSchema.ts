import { z } from "zod";

// ۱. قوانین پایه‌ای و مشترک فیلدها
export const baseAuthFields = {
    username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
    firstName: z.string().trim().min(1, "نام الزامی است"),
    lastName: z.string().trim().min(1, "نام خانوادگی الزامی است"),
    email: z.string().trim().email("ایمیل معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    phone: z.string().regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
    buildingNumber: z.string().optional().or(z.literal("")),
    unitNumber: z.string().min(1, "شماره واحد الزامی است")
};

// ۲. اسکیمای ثبت نام (Register)
export const registerSchema = z.object({
    username: baseAuthFields.username,
    firstName: baseAuthFields.firstName,
    lastName: baseAuthFields.lastName,
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
    firstName: baseAuthFields.firstName,
    lastName: baseAuthFields.lastName,
    email: baseAuthFields.email.or(z.literal("")), 
    phone: baseAuthFields.phone,
    buildingNumber: baseAuthFields.buildingNumber,
    unitNumber: baseAuthFields.unitNumber
});

export const phoneLoginSchema = z.object({
    phone: baseAuthFields.phone
});