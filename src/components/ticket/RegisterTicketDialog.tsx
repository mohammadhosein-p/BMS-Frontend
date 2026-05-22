import { useState } from "react";
import { PlusCircle, Send, X } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";

import SelectOptions from "../ui/SelectOptions/SelectOptions";
import { Spinner } from "../ui/spinner";
import { useCreateTicket } from "@/hooks/useTicket";

// =========================
// Validation Schema
// =========================

const ticketSchema = z.object({
    title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
    description: z.string().min(5, "توضیحات کوتاه باید حداقل ۵ کاراکتر باشد"),
    body: z.string().min(10, "متن تیکت باید حداقل ۱۰ کاراکتر باشد"),
    category: z.enum([
        "maintenance",
        "plumbing",
        "electricity",
        "security",
        "cleaning",
        "parking",
        "other",
    ]),
    accessibility: z.enum(["private", "public"]),
});

type TicketFormData = z.infer<typeof ticketSchema>;

const ticketCategoryOptions = [
    {
        value: "maintenance",
        label: "تعمیرات",
        color: "blue",
    },
    {
        value: "plumbing",
        label: "لوله کشی",
        color: "cyan",
    },
    {
        value: "electricity",
        label: "برق",
        color: "yellow",
    },
    {
        value: "security",
        label: "امنیت",
        color: "red",
    },
    {
        value: "cleaning",
        label: "نظافت",
        color: "green",
    },
    {
        value: "parking",
        label: "پارکینگ",
        color: "purple",
    },
    {
        value: "other",
        label: "سایر",
        color: "gray",
    },
];

function RegisterTicketDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const ticketTypeOptions = [
        { value: "private", label: "خصوصی", color: "red" },
        { value: "public", label: "عمومی", color: "blue" },
    ];

    // =========================
    // React Hook Form
    // =========================

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            title: "",
            description: "",
            body: "",
            category: "maintenance",
            accessibility: "private",
        },
    });

    const accessibility = watch("accessibility");
    const category = watch("category");

    const { mutateAsync, isPending } = useCreateTicket();

    // =========================
    // Submit Handler
    // =========================

    const onSubmit = async (data: TicketFormData) => {
        await mutateAsync({
            title: data.title,
            description: data.description,
            body: data.body,
            category: data.category,
            accessibility: data.accessibility,
        });

        reset();

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <CustomButton
                icon={PlusCircle}
                className="ltr w-1/7 h-13 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                ثبت تیکت جدید
            </CustomButton>

            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className="max-w-md rounded-3xl p-0 overflow-hidden bg-white"
            >
                {/* Header */}
                <DialogHeader className="relative bg-indigo-500 text-white px-14 py-5 m-0 flex flex-col items-center justify-center">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 hover:bg-white/30 transition-all cursor-pointer border-none outline-none"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4 text-white" strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="text-center text-xl font-bold md:text-2xl md:font-extrabold text-white w-full">
                        ساخت تیکت جدید
                    </DialogTitle>
                </DialogHeader>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2 p-6 bg-white"
                >
                    {/* Title */}
                    <div className="space-y-1">
                        <CustomField
                            placeholder="تیتر تیکت"
                            direction="rtl"
                            variant="default"
                            className="focus-visible:border-primary-2"
                            {...register("title")}
                        />

                        {errors.title && (
                            <p className="text-xs text-danger-2 text-right">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    {/* Category */}
                    <div className="space-y-1">
                        <SelectOptions
                            value={category}
                            onChange={(value) => {
                                setValue(
                                    "category",

                                    value as
                                        | "maintenance"
                                        | "plumbing"
                                        | "electricity"
                                        | "security"
                                        | "cleaning"
                                        | "parking"
                                        | "other",

                                    {
                                        shouldValidate: true,
                                    },
                                );
                            }}
                            options={ticketCategoryOptions as any}
                        />

                        {errors.category && (
                            <p className="text-xs text-danger-2 text-right">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Accessibility */}
                    <div className="space-y-1">
                        <SelectOptions
                            value={accessibility}
                            onChange={(value) => {
                                setValue(
                                    "accessibility",
                                    value as "private" | "public",
                                    {
                                        shouldValidate: true,
                                    },
                                );
                            }}
                            options={ticketTypeOptions as any}
                        />

                        {errors.accessibility && (
                            <p className="text-xs text-danger-2 text-right">
                                {errors.accessibility.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <CustomField
                            placeholder="توضیحات کوتاه"
                            direction="rtl"
                            variant="default"
                            className="focus-visible:border-primary-2"
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-xs text-danger-2 text-right">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Body */}
                    <div className="space-y-1">
                        <CustomField
                            as="textarea"
                            placeholder="متن تیکت خود را اینجا بنویسید..."
                            direction="rtl"
                            variant="default"
                            className="text-sm placeholder:text-sm focus-visible:border-primary-2"
                            {...register("body")}
                        />

                        {errors.body && (
                            <p className="text-xs text-danger-2 text-right">
                                {errors.body.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-2">
                        {isPending ? (
                            <div className="text-white p-3 px-4 rounded-xl bg-primary-2">
                                <Spinner className="w-5 h-5" />
                            </div>
                        ) : (
                            <CustomButton
                                icon={Send}
                                className="ltr h-11 cursor-pointer"
                                disabled={isPending}
                            >
                                ارسال تیکت
                            </CustomButton>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterTicketDialog;
