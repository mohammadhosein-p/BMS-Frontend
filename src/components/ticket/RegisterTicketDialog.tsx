"use client";

import { useState } from "react";
import { PlusCircle, Send, X } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "../ui/CustomeDialog";
import SelectOptions from "../ui/SelectOptions/SelectOptions";


function RegisterTicketDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const ticketTypeOptions = [
        { value: "private", label: "خصوصی", color: "red" },
        { value: "public", label: "عمومی", color: "blue" }
    ];

    const [ticketType, setTicketType] = useState("private");

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <CustomButton
                    icon={PlusCircle}
                    variant="primary"
                    className="w-auto h-12 px-3 text-xs sm:text-sm cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    dir="rtl"
                >
                    ثبت تیکت جدید
                </CustomButton>
            </DialogTrigger>

            <DialogContent
                isOpen={isOpen}
                className="max-w-md rounded-3xl p-0 overflow-hidden bg-white"
            >
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

                {/* فرم داخلی ثبت تیکت */}
                <div className="space-y-2 p-6 bg-white">
                    {/* تیتر */}
                    <CustomField
                        placeholder="تیتر تیکت"
                        direction="rtl"
                        variant="default"
                        className="focus-visible:border-indigo-400"
                    />

                    {/* توضیحات کوتاه */}
                    <CustomField
                        placeholder="توضیحات کوتاه"
                        direction="rtl"
                        variant="default"
                        className="focus-visible:border-indigo-400"
                    />

                    {/* بدنه اصلی متن */}
                    <CustomField
                        as="textarea"
                        placeholder="متن تیکت خود را اینجا بنویسید..."
                        direction="rtl"
                        variant="default"
                        className="text-sm placeholder:text-sm focus-visible:border-indigo-400"
                    />

                    {/* نوع دسترسی یا اولویت تیکت با کامپوننت جدید و اختصاصی شما */}
                    <SelectOptions
                        value={ticketType}
                        onChange={setTicketType}
                        options={ticketTypeOptions}
                    />
                    {/* دسته بندی */}
                    <CustomField
                        placeholder="دسته بندی"
                        direction="rtl"
                        variant="default"
                        className="focus-visible:border-indigo-400"
                    />


                    {/* تگ ها */}
                    <CustomField
                        placeholder="تگ‌ها (با کاما جدا کنید)"
                        direction="rtl"
                        variant="default"
                        className="focus-visible:border-indigo-400"
                    />



                    {/* دکمه ارسال نهایی فرم */}
                    <div className="flex justify-center pt-2">
                        <CustomButton icon={Send} className="ltr h-11 cursor-pointer">
                            ارسال تیکت
                        </CustomButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterTicketDialog;