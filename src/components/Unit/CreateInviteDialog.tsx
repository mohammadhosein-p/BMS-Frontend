// components/Unit/CreateInviteDialog.tsx
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, MailOpen, Copy, Check, Calendar } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/CustomeDialog";

import CustomButton from "@/components/ui/CustomeButton";
import CustomField from "@/components/ui/CutsomeFiled";
import AnimatedError from "@/components/ui/AnimatedError";
import CustomToast from "@/components/Custom/CustomToast";
import { createInviteService } from "@/services/inviteCodeservice";
import { translateNumber } from "@/utils/translateNumber";
import type { UnitResponse } from "@/types/unitTypes";

const inviteSchema = z.object({
    days: z
        .string()
        .min(1, "تعیین مدت زمان اعتبار الزامی است")
        .regex(/^[1-9][0-9]*$/, "مدت زمان اعتبار باید یک عدد مثبت بزرگتر از صفر باشد"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface CreateInviteDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    unit: UnitResponse | null;
    apartmentId: string | null | undefined ;
}

export default function CreateInviteDialog({ isOpen, setIsOpen, unit, apartmentId }: CreateInviteDialogProps) {
    const queryClient = useQueryClient();

    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [expiryDisplay, setExpiryDisplay] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isExistingCode, setIsExistingCode] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InviteFormData>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { days: "7" },
    });

    const createInviteMutation = useMutation({
        mutationFn: (variables: { payload: InviteFormData; expiryDate: Date }) => {
            if (!apartmentId || !unit?.id) return Promise.reject(new Error("اطلاعات ناقص است"));

            return createInviteService({
                unit_id: unit.id,
                apartment_id: apartmentId,
                expires_at: variables.expiryDate.toISOString(),
            });
        },
        onSuccess: (responseData: any, variables) => {
            queryClient.invalidateQueries({ queryKey: ['apartmentUnits', apartmentId] });

            const code = responseData?.code || responseData?.data?.code || "";
            setGeneratedCode(code);
            setIsExistingCode(false);

            const formattedDate = variables.expiryDate.toLocaleDateString('fa-IR', {
                hour: '2-digit',
                minute: '2-digit',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            setExpiryDisplay(formattedDate);
        },
        onError: (error: any) => {
            const serverMessage = error?.response?.data?.message || "";

            if (serverMessage.includes("an active invite code already exists")) {

                const codeMatch = serverMessage.match(/\(Code:\s*([^\)]+)\)/);
                const existingCode = codeMatch ? codeMatch[1] : null;

                const dateMatch = serverMessage.match(/expiring at\s+([\d-]+)\s+([\d:]+)/);

                let formattedExpiry = null;
                if (dateMatch && dateMatch[1] && dateMatch[2]) {
                    const fullDateString = `${dateMatch[1]}T${dateMatch[2]}Z`;
                    const expiryDate = new Date(fullDateString);

                    formattedExpiry = expiryDate.toLocaleString('fa-IR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }

                if (existingCode) {
                    setGeneratedCode(existingCode);
                    setIsExistingCode(true);
                    if (formattedExpiry) {
                        setExpiryDisplay(formattedExpiry);
                    }
                    return;
                }
            }

            toast.custom(() => (
                <CustomToast
                    title="خطا در صدور کد"
                    message={serverMessage || "مشکلی در تولید کد دعوت رخ داده است"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const onSubmit = (data: InviteFormData) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + Number(data.days));
        createInviteMutation.mutate({ payload: data, expiryDate });
    };

    const handleCopyCode = () => {
        if (!generatedCode) return;
        navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleClose = () => {
        reset();
        setGeneratedCode(null);
        setExpiryDisplay(null);
        setIsCopied(false);
        setIsExistingCode(false);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent
                isOpen={isOpen}
                className="max-w-110 w-[92%] rounded-3xl p-0 overflow-hidden bg-white"
            >
                {/* Header Section */}
                <DialogHeader className="relative bg-secondary-blue-3 text-white px-6 py-6 m-0 flex flex-col items-center justify-center overflow-hidden">

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

                    <div className="flex items-center gap-1.5 z-10">
                        <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm shadow-inner mb-0.5">
                            <MailOpen className="w-5 h-5 text-amber-50" strokeWidth={2} />
                        </div>
                        <DialogTitle className="text-center text-lg font-bold md:text-xl md:font-extrabold text-white tracking-tight w-full">
                            {generatedCode ? `کد دعوت واحد ${unit?.unit_number}` : `صدور کد دعوت (واحد ${unit?.unit_number})`}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {generatedCode ? (
                    <div className="p-6 flex flex-col items-center text-center gap-4 bg-white">
                        <div className="flex items-center flex-col space-y-1">
                            <div className={`w-12 h-12 mb-2 rounded-full ${isExistingCode ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-success-op2-2 border border-emerald-100'} flex items-center justify-center border`}>
                                <CheckCircle2 size={28} />
                            </div>

                            <h3 className="font-bold text-neutral-800 text-base">
                                {isExistingCode ? "کد دعوت فعال موجود است" : "کد دعوت با موفقیت تولید شد"}
                            </h3>
                            <p className="text-xs text-neutral-400 font-medium px-4">
                                {isExistingCode
                                    ? "این واحد در حال حاضر یک کد دعوت معتبر دارد. می‌توانید این کد را کپی کنید."
                                    : "می‌توانید این کد را کپی کرده و در اختیار ساکن جدید واحد قرار دهید."}
                            </p>
                        </div>

                        <div
                            onClick={handleCopyCode}
                            className="w-full flex items-center justify-between p-3.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200 rounded-2xl cursor-pointer transition-colors group group-hover:border-neutral-300"
                        >
                            {isCopied ? (
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                    <Check size={14} strokeWidth={2.5} />
                                    کپی شد
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-neutral-400 group-hover:text-neutral-500 flex items-center gap-1 transition-colors">
                                    <Copy size={14} />
                                    کپی کد
                                </span>
                            )}
                            <span className="font-mono font-black text-xl tracking-widest text-neutral-800 select-all">
                                {generatedCode}
                            </span>
                        </div>

                        {expiryDisplay && (
                            <div className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-rose-50/50 border border-danger-5 rounded-lg text-neutral-600" dir="rtl">
                                <Calendar size={15} className="text-danger-3 shrink-0" />
                                <span className="text-xs font-bold text-neutral-500">مهلت استفاده از کد تا:</span>
                                <span className="text-xs font-extrabold text-neutral-800 tracking-tight">
                                    {translateNumber(expiryDisplay)}
                                </span>
                            </div>
                        )}

                        <CustomButton
                            variant="secondary"
                            className="w-full h-11 cursor-pointer"
                            onClick={handleClose}
                        >
                            متوجه شدم
                        </CustomButton>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 flex flex-col gap-2 bg-white text-right"
                    >
                        <div className="flex flex-col gap-2 group">
                            <label className="block text-xs font-bold text-neutral-500 mr-1 transition-colors duration-200 group-focus-within:text-secondary-blue-2">
                                مدت اعتبار کد دعوت (به روز)
                            </label>
                            <Controller
                                name="days"
                                control={control}
                                render={({ field }) => (
                                    <CustomField
                                        {...field}
                                        placeholder="مثلاً: 7"
                                        direction="rtl"
                                        variant={errors.days ? "error" : "default"}
                                        type="text"
                                        inputMode="numeric"
                                    />
                                )}
                            />
                            <AnimatedError message={errors.days?.message} />
                        </div>

                        <div className="flex justify-center pt-3 pb-1">
                                <CustomButton
                                    icon={Send}
                                    variant="secondary"
                                    type="submit"
                                    isLoading={createInviteMutation.isPending}
                                    loadingText="در حال ساخت"
                                    disabled={createInviteMutation.isPending}
                                >
                                    تولید و ذخیره کد دعوت
                                </CustomButton>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}