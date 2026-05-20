import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { PlusCircle, Send, X } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import CustomField from "../ui/CutsomeFiled";

function RegisterTicketDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton icon={PlusCircle} className="ltr p-2 md:p-4 cursor-pointer">
                    ثبت تیکت جدید
                </CustomButton>
            </DialogTrigger>

            <DialogContent
                dir="rtl"
                className="max-w-md rounded-3xl p-0 overflow-hidden"
            >
                {/* Header */}
                <DialogHeader className="relative bg-indigo-500 text-white px-6 py-4 m-0">
                    <DialogTitle className="text-center text-2xl font-bold md:font-extrabold">
                        ساخت تیکت جدید
                    </DialogTitle>

                    {/* close icon */}
                    <DialogClose className="absolute right-4 top-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <div className="-translate-y-1/2 rounded-full bg-white/20 p-1 hover:bg-white/30 transition ">
                            <X className="w-5 h-5 text-white" />
                        </div>
                    </DialogClose>
                </DialogHeader>

                {/* Form */}
                <div className="space-y-3 p-5">
                    {/* title */}
                    <CustomField
                        placeholder="تیتر"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-indigo-500 text-right"
                    />

                    {/* short description */}
                    <CustomField
                        placeholder="توضیحات"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-indigo-500 text-right"
                    />

                    {/* body */}
                    <textarea
                        placeholder="بدنه"
                        className="custom-scrollbar min-h-35 w-full rounded-xl border transition-all duration-200 shadow-none outline-none placeholder:text-neutral-3/60 focus-visible:ring-0 focus-visible:border-primary-1 focus-visible:shadow-[0_0_0_4px_var(--color-primary-5)] focus-visible:bg-neutral-6 border-neutral-4 bg-neutral-5 text-neutral-1 resize-none text-right px-4 py-3"
                    />

                    {/* category */}
                    <CustomField
                        placeholder="دسته بندی"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-indigo-500 text-right"
                    />

                    {/* tags */}
                    <CustomField
                        placeholder="تگ ها"
                        className="h-12 rounded-xl border-gray-200 focus-visible:ring-indigo-500 text-right"
                    />

                    {/* priority */}
                    <Select dir="rtl">
                        <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:ring-indigo-500">
                            <SelectValue placeholder="نوع" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="private">خصوصی</SelectItem>
                            <SelectItem value="public">عمومی</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* submit */}
                    <div className="flex justify-center pt-2">
                        <CustomButton
                            icon={Send}
                            className="rounded-2xl ltr px-7 py-3 text-base shadow-md"
                        >
                            ارسال
                        </CustomButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterTicketDialog;
