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
                className="rtl h-13 cursor-pointer bg-secondary-blue-3 hover:bg-secondary-blue-2/90"
            >
                ساخت نظرسنجی
            </CustomButton>

            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className={cn(
                    "max-w-2xl overflow-y-auto custom-scrollbar rounded-3xl border-none bg-white p-0",
                )}
            >
                {/* Header */}
                <DialogHeader className="relative m-0 flex flex-col items-center justify-center bg-[#69A8E9] px-14 py-5 text-white">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border-none bg-white/20 p-1.5 outline-none transition-all hover:bg-white/30"
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
                    {/* title */}
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

                    {/* options */}
                    <div className="rounded-2xl border border-zinc-300 bg-neutral-5/60 p-3">
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
                                    className="h-12 focus-visible:border-primary-2"
                                />
                            ))}
                        </div>

                        {/* add option */}
                        <button
                            onClick={addOption}
                            className="mt-4 flex cursor-pointer items-center gap-2 text-secondary-blue-2 transition-all hover:text-secondary-blue-3 hover:opacity-80"
                        >
                            <CirclePlus className="h-5 w-5" />

                            <span className="text-sm font-medium">
                                افزودن گزینه جدید
                            </span>
                        </button>

                        <div className="h-10" />
                    </div>

                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        format="YYYY/MM/DD HH:mm"
                        calendarPosition="bottom-center"
                        inputClass="w-full h-12 rounded-xl text-center border border-zinc-300 bg-neutral-5 px-4 text-sm outline-none focus:border-primary-1 transition-all focus:bg-white focus-visible:shadow-[0_0_0_4px_var(--color-primary-5)]"
                        containerClassName="w-full"
                        plugins={[<TimePicker position="right" />]}
                        placeholder="تاریخ پایان نظرسنجی"
                    />

                    {/* submit */}
                    <div className="flex justify-center pt-2">
                        <CustomButton
                            icon={Send}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl px-6 py-3 text-lg text-white",
                                "cursor-pointer bg-secondary-blue-3 transition-all hover:bg-secondary-blue-2 hover:opacity-90",
                            )}
                        >
                            ارسال
                        </CustomButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
