import { useEffect } from "react";
import type { Rule } from "@/types/ruleTypes";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/CustomeDialog";
import { X, type LucideIcon } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AnimatedError from "../ui/AnimatedError";

const ruleSchema = z.object({
    title: z.string().min(1, "عنوان قانون نمی‌تواند خالی باشد."),
    description: z.string().min(1, "توضیحات قانون نمی‌تواند خالی باشد."),
});

type RuleFormData = z.infer<typeof ruleSchema>;

interface RuleFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RuleFormData) => void;
    initialData?: Rule | null;
    title: string;                 
    submitText: string;            
    submitIcon: LucideIcon;       
    buttonVariant: "danger" | "success2";
    headerClassName: string;       
    closeIconColor: string;       
}

export default function RuleFormDialog({
    isOpen,
    onClose,
    onSubmit,
    initialData = null,
    title,
    submitText,
    submitIcon,
    buttonVariant,
    headerClassName,
    closeIconColor,
}: RuleFormDialogProps) {
    
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RuleFormData>({
        resolver: zodResolver(ruleSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                title: initialData?.title || "",
                description: initialData?.description || "",
            });
        }
    }, [initialData, isOpen, reset]);

    const handleFormSubmit = (data: RuleFormData) => {
        onSubmit(data);
        if (!initialData) reset(); 
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent isOpen={isOpen} className="p-0! sm:max-w-md border-none">
                {/* Header */}
                <DialogHeader className={`relative text-white px-14 py-5 m-0 flex flex-col items-center justify-center ${headerClassName}`}>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 hover:scale-110 transition-transform cursor-pointer border-none outline-none"
                            aria-label="Close"
                        >
                            <X className={`w-4 h-4 ${closeIconColor}`} strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="text-center text-xl font-bold md:text-2xl md:font-extrabold text-white w-full">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {/* Form Body */}
                <form 
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="p-6 flex flex-col gap-4 bg-white text-right"
                >
                    {/* Title Input */}
                    <div>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <CustomField
                                    {...field}
                                    placeholder="تیتر قانون"
                                    direction="rtl"
                                    variant={errors.title ? "error" : "default"}
                                    className="font-semibold text-neutral-800"
                                />
                            )}
                        />
                        <AnimatedError message={errors.title?.message} />
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <CustomField
                                    {...field}
                                    as="textarea"
                                    placeholder="توضیحات"
                                    direction="rtl"
                                    variant={errors.description ? "error" : "default"}
                                    className="text-neutral-700 font-medium"
                                />
                            )}
                        />
                        <AnimatedError message={errors.description?.message} />
                    </div>

                    {/* Submit Button */}
                    <CustomButton
                        variant={buttonVariant}
                        icon={submitIcon}
                        type="submit"
                        className="mx-auto mt-2 px-4 py-2.5 w-max"
                    >
                        {submitText}
                    </CustomButton>
                </form>
            </DialogContent>
        </Dialog>
    );
}