import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import AnimatedError from "../ui/AnimatedError";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { createUnitService } from "@/services/unitService";
import { toast } from "sonner";
import CustomToast from "@/components/Custom/CustomToast";
import { CheckCircle2, AlertCircle, Send, X, Home } from "lucide-react";

const unitSchema = z.object({
    unit_number: z
        .string()
        .min(1, "شماره واحد الزامی است")
        .regex(/^[0-9]+$/, "شماره واحد باید فقط شامل اعداد باشد"),
    floor: z
        .string()
        .min(1, "شماره طبقه الزامی است")
        .regex(/^-?[0-9]+$/, "شماره طبقه باید عدد باشد (مثلاً 0 یا 2 یا -1)"),
});

type UnitFormData = z.infer<typeof unitSchema>;

function RegisterUnitDialog({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
    const queryClient = useQueryClient();
    const apartmentId = useAuthStore((state) => state.user?.apartment_id);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UnitFormData>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            unit_number: "",
            floor: "",
        },
    });

    const createUnitMutation = useMutation({
        mutationFn: (data: UnitFormData) => {
            if (!apartmentId) {
                return Promise.reject(new Error("شناسه آپارتمان یافت نشد"));
            }
            return createUnitService(apartmentId, {
                unit_number: data.unit_number,
                floor: Number(data.floor),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apartmentUnits', apartmentId] });

            toast.custom(() => (
                <CustomToast
                    title="عملیات موفق"
                    message="واحد مسکونی جدید با موفقیت ثبت شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));

            reset();
            setIsOpen(false);
        },
        onError: (error: any) => {
            toast.custom(() => (
                <CustomToast
                    title="خطا در عملیات"
                    message={error?.response?.data?.message || error?.message || "مشکلی در ثبت واحد رخ داده است"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const onSubmit = async (data: UnitFormData) => {
        if (!apartmentId) {
            toast.error("شناسه آپارتمان شما یافت نشد.");
            return;
        }
        await createUnitMutation.mutateAsync(data);
    };

    const handleClose = () => {
        reset();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent
                isOpen={isOpen}
                className="max-w-110 rounded-2xl p-0 overflow-hidden bg-white"
            >
                {/* Header Section */}
                <DialogHeader className="relative bg-linear-to-r from-emerald-600 to-teal-600 text-white px-6 py-6 m-0 flex flex-col items-center justify-center overflow-hidden">
                    {/* Decorative Background Glow */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/30 rounded-full blur-xl pointer-events-none" />

                    {/* Close Button */}
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 p-2 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-none outline-none flex items-center justify-center backdrop-blur-sm"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </button>
                    </DialogClose>

                    {/* Header Title with Icon */}
                    <div className="flex items-center gap-1.5 z-10">
                        <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm shadow-inner mb-0.5">
                            <Home className="w-5 h-5 text-emerald-50" strokeWidth={2} />
                        </div>
                        <DialogTitle className="text-center text-lg font-bold md:text-xl md:font-extrabold text-white tracking-tight w-full">
                            ثبت واحد مسکونی جدید
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* Form Body Section */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 flex flex-col gap-5 bg-white text-right"
                >
                    {/* Unit Number Input */}
                    <div className="flex flex-col gap-1.5 group">
                        <label className="block text-xs font-bold text-neutral-500 mr-1 transition-colors duration-200 group-focus-within:text-emerald-600">
                            شماره واحد
                        </label>
                        <Controller
                            name="unit_number"
                            control={control}
                            render={({ field }) => (
                                <CustomField
                                    {...field}
                                    placeholder="مثلاً: 12"
                                    direction="rtl"
                                    variant={errors.unit_number ? "error" : "default"}
                                    type="text"
                                    inputMode="numeric" />
                            )}
                        />
                        <AnimatedError message={errors.unit_number?.message} />
                    </div>

                    {/* Floor Number Input */}
                    <div className="flex flex-col gap-2 group">
                        <label className="block text-xs font-bold text-neutral-500 mr-1 transition-colors duration-200 group-focus-within:text-emerald-600">
                            شماره طبقه
                        </label>
                        <Controller
                            name="floor"
                            control={control}
                            render={({ field }) => (
                                <CustomField
                                    {...field}
                                    placeholder="مثلاً: 3 (یا 0 برای همکف)"
                                    direction="rtl"
                                    variant={errors.floor ? "error" : "default"}
                                    type="text"
                                    inputMode="numeric"
                                />
                            )}
                        />
                        <AnimatedError message={errors.floor?.message} />
                    </div>

                    {/* Footer / Submit Button Area */}
                    <div className="flex justify-center pt-3 pb-1">
                            <CustomButton
                                icon={Send}
                                variant="green"
                                type="submit"
                                className="h-11 cursor-pointer"
                                loadingText="در حال ارسال"
                                isLoading={createUnitMutation.isPending}
                                disabled={createUnitMutation.isPending}
                            >
                                ثبت و ذخیره واحد
                            </CustomButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterUnitDialog;