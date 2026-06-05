import { useState } from "react";
import { CirclePlus, PlusCircle, Send, X } from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";

import { cn } from "@/lib/utils";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { createPollSchema, type CreatePollFormData } from "@/utils/pollSchema";
import { useCreatePoll } from "@/hooks/usePoll";
import useAuthStore from "@/store/useAuthStore";
import type { CreatePollBody } from "@/types/PollTypes";
import { Spinner } from "../ui/spinner";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedError from "../ui/AnimatedError";


export default function CreatePollDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const apartment_id =
        useAuthStore((store) => store.user?.apartment_id) || "";

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatePollFormData>({
        resolver: zodResolver(createPollSchema),

        defaultValues: {
            title: "",
            description: "",
            expires_at: new Date(),
            is_votes_public: true,
            options: [{ value: "" }, { value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });
    const { mutateAsync, isPending } = useCreatePoll(apartment_id);

    const onSubmit = async (data: CreatePollFormData) => {
        const payload: CreatePollBody = {
            title: data.title,
            description: data.description,
            expires_at: new Date(data.expires_at).toISOString(),
            is_votes_public: data.is_votes_public,
            options: data.options.map((option) => option.value),
        };
        await mutateAsync(payload);

        reset();
        setIsOpen(false);
        console.log(payload);
    };

    const handleClose = () => {
        setIsOpen(false);
        reset({
            title: "",
            description: "",
            expires_at: new Date(),
            is_votes_public: true,
            options: [{ value: "" }, { value: "" }],
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <CustomButton
                onClick={() => setIsOpen(true)}
                icon={PlusCircle}
                className="rtl h-13 cursor-pointer bg-secondary-blue-3 hover:bg-secondary-blue-2/90"
            >
                ساخت نظرسنجی
            </CustomButton>

            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className={cn(
                    "max-w-md overflow-y-auto custom-scrollbar rounded-3xl border-none bg-white p-0",
                )}
            >
                {/* Header */}
                <DialogHeader className="relative m-0 flex flex-col items-center justify-center bg-[#69A8E9] px-14 py-5 text-white">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-none bg-white/20 p-1.5 outline-none transition-all hover:bg-white/30"
                            aria-label="Close"
                            onClick={handleClose}
                        >
                            <X className="h-4 w-4 text-white" strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="text-center text-xl font-bold text-white md:text-2xl md:font-extrabold">
                        ارسال نظرسنجی
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2 p-4">
                        <div className="space-y-1">
                            {/* title */}
                            <CustomField
                                placeholder="سوال خود را بنویسید"
                                direction="rtl"
                                variant="default"
                                className="focus-visible:border-primary-2"
                                {...register("title")}
                            />
                            <AnimatedError message={errors.title?.message} />
                        </div>

                        <div className="space-y-1">
                            {/* description */}
                            <CustomField
                                as="textarea"
                                placeholder="توضحیات نظرسنجی خود را اینجا بنویسید..."
                                direction="rtl"
                                variant="default"
                                className="text-sm placeholder:text-sm focus-visible:border-primary-2"
                                {...register("description")}
                            />
                            <AnimatedError message={errors.description?.message} />
                        </div>

                        <div className="space-y-1">
                            <div className="rounded-2xl border border-zinc-300 bg-neutral-5/60 p-2">
                                <div className="space-y-1 max-h-38 overflow-y-auto overflow-x-hidden custom-scrollbar px-1">
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {fields.map((field, index) => (
                                            <motion.div
                                                key={field.id}
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, x: 0, height: "auto" }}
                                                exit={{ opacity: 0, x: -10, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="py-1">
                                                    <div className="flex items-center gap-2">
                                                        <CustomField
                                                            placeholder={`گزینه ${index + 1}`}
                                                            className="h-12 focus-visible:border-primary-2"
                                                            {...register(`options.${index}.value`)}
                                                        />

                                                        {fields.length > 2 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-danger-5 text-danger-2 transition-all hover:bg-danger-4 cursor-pointer"
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                    </div>

                                                    <AnimatedError message={errors.options?.[index]?.value?.message} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* add option button */}
                                <button
                                    type="button"
                                    onClick={() => append({ value: "" })}
                                    className="mt-2 p-2 flex cursor-pointer items-center gap-2 text-secondary-blue-2 transition-all hover:text-secondary-blue-3 hover:opacity-80"
                                >
                                    <CirclePlus className="h-5 w-5" />
                                    <span className="text-sm font-medium">افزودن گزینه جدید</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Controller
                                control={control}
                                name="expires_at"
                                render={({ field }) => (
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        format="YYYY/MM/DD HH:mm"
                                        calendarPosition="bottom-center"
                                        plugins={[
                                            <TimePicker position="right" />,
                                        ]}
                                        value={field.value}
                                        onChange={(date) =>
                                            field.onChange(date?.toDate())
                                        }
                                        inputClass="w-full h-12 rounded-xl text-center border border-zinc-300 bg-neutral-5 px-4 text-sm outline-none focus:border-primary-1 transition-all focus:bg-white focus-visible:shadow-[0_0_0_4px_var(--color-primary-5)]"
                                        containerClassName="w-full"
                                        placeholder="تاریخ پایان نظرسنجی"
                                    />
                                )}
                            />
                            <AnimatedError message={errors.expires_at?.message} />
                        </div>

                        {/* submit */}
                        <div className="flex justify-center pt-2">
                            {isPending ? (
                                <div className="text-white p-3 px-4 rounded-xl bg-secondary-blue-2">
                                    <Spinner className="w-5 h-5" />
                                </div>
                            ) : (
                                <CustomButton
                                    icon={Send}
                                    className={cn(
                                        "flex items-center gap-3 rounded-2xl px-5 py-3 text-lg text-white",
                                        "cursor-pointer bg-secondary-blue-3 transition-all hover:bg-secondary-blue-2 hover:opacity-90",
                                    )}
                                >
                                    ارسال
                                </CustomButton>
                            )}
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
