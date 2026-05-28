import { useState } from "react";

import {
    CirclePlus,
    PlusCircle,
    Send,
    SendHorizontal,
    ShieldQuestion,
    X,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";

export default function CreatePollDialog() {
    const [isOpen, setIsOpen] = useState(false);

    const [options, setOptions] = useState([""]);

    const addOption = () => {
        setOptions((prev) => [...prev, ""]);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updated = [...options];

        updated[index] = value;

        setOptions(updated);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <CustomButton
                onClick={() => setIsOpen(true)}
                icon={PlusCircle}
                className="rtl bg-secondary-blue-3 h-13 cursor-pointer hover:bg-secondary-blue-2/90"
            >
                ساخت نظرسنجی
            </CustomButton>
            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className={cn(
                    "max-w-2xl overflow-y-auto custom-scrollbar rounded-3xl bg-white p-0 border-none",
                )}
            >
                {/* Header */}
                <DialogHeader className="relative m-0 flex flex-col items-center justify-center bg-[#69A8E9] px-14 py-5 text-white">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 transition-all hover:bg-white/30 cursor-pointer border-none outline-none"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4 text-white" strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="w-full text-center text-xl font-bold text-white md:text-2xl md:font-extrabold">
                        ارسال نظرسنجی
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="space-y-4 p-6">
                    {/* title input */}
                    <CustomField
                        placeholder="سوال خود را بنویسید"
                        direction="rtl"
                        variant="default"
                        className="focus-visible:border-primary-2"
                    />

                    {/* description */}
                    <CustomField
                        as="textarea"
                        placeholder="توضحیات نظرسنجی خود را اینجا بنویسید..."
                        direction="rtl"
                        variant="default"
                        className="text-sm placeholder:text-sm focus-visible:border-primary-2"
                    />

                    {/* options box */}
                    <div className="rounded-2xl border border-zinc-300 bg-neutral-5/60 p-3">
                        {/* options */}
                        <div className="space-y-3">
                            {options.map((option, index) => (
                                <CustomField
                                    key={index}
                                    value={option}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={`گزینه ${index + 1}`}
                                    className={cn(
                                        "h-12 focus-visible:border-primary-2",
                                    )}
                                />
                            ))}
                        </div>

                        {/* add option */}
                        <button
                            onClick={addOption}
                            className="mt-4 flex items-center gap-2 text-secondary-blue-2 transition-all cursor-pointer hover:opacity-80 hover:text-secondary-blue-3"
                        >
                            <CirclePlus className="h-5 w-5" />

                            <span className="text-sm font-medium">
                                افزودن گزینه جدید
                            </span>
                        </button>

                        {/* empty space */}
                        <div className="h-30" />
                    </div>

                    {/* anonymous */}
                    {/* <div className="flex items-center justify-between px-1">
                        <button className="flex h-10 w-14 items-center rounded-full bg-[#69A8E9] px-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                                <div className="h-3 w-3 rounded-full bg-[#69A8E9]" />
                            </div>
                        </button>

                        <div className="flex items-center gap-2 text-xl text-zinc-900">
                            <ShieldQuestion className="h-6 w-6" />

                            <span>نظرسنجی ناشناس</span>
                        </div>
                    </div> */}

                    {/* submit */}
                    <div className="flex justify-center pt-2">
                        <CustomButton
                            icon={Send}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl text-lg",
                                "bg-secondary-blue-3 hover:bg-secondary-blue-2 cursor-pointer px-6 py-3 text-white",
                                "transition-all hover:opacity-90",
                            )}
                        >
                            ارسال
                        </CustomButton>
                        {/* <button>
                            <div className="rounded-xl bg-[#2F86FF] p-2">
                                <SendHorizontal className="h-5 w-5" />
                            </div>

                            <span className="text-xl">ارسال</span>
                        </button> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
