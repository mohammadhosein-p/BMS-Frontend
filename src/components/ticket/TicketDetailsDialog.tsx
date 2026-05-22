import { useState } from "react";
import { Send, ShieldCheck, ShieldClose, X } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CustomButton from "../ui/CustomeButton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "../ui/CustomeDialog";
import CustomField from "../ui/CutsomeFiled";

const comments = [
    { id: 1, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 2, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: false },
    { id: 3, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 4, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 5, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 6, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 7, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 8, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 9, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
    { id: 10, user: "نام کاربری", text: "اوضاع لامپ ها اصلا خوب نیست", date: "1402/05/02 19:03", isOwner: true },
];

export default function TicketDetailsDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <CustomButton
                variant="secondary"
                styleType="outline"
                className="w-full h-9 rounded-lg text-sm font-medium sm:w-auto"
                onClick={() => setIsOpen(true)}
            >
                مشاهده جزئیات
            </CustomButton>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent
                    isOpen={isOpen}
                    className="max-w-xl max-h-[90vh] bg-[#f8f8f8] p-4 md:p-6"
                >
                    {/* دکمه کلوز اختصاصی در بالا سمت چپ برای ممانعت از تداخل بصری با عنوان */}
                    <DialogClose asChild>
                        <button
                            className="absolute top-5 left-5 p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors z-10"
                            aria-label="Close"
                        >
                            <X size={16} strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <div>
                        {/* هدر تیکت شامل آیکون شیلد و محتوای متنی */}
                        <div className="mb-3 sm:mt-6 flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-4 md:text-right">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f3ddb0] md:h-24 md:w-24">
                                <ShieldCheck className="h-10 w-10 text-[#9a6b00] md:h-14 md:w-14" />
                            </div>

                            {/* عناوین و بدج‌ها */}
                            <div className="flex-1 w-full flex flex-col items-center md:items-start gap-2">
                                <DialogHeader className="mb-0 gap-0 w-full">
                                    {/* ردیف اصلی عنوان و آیکون روبروی آن */}
                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                        <DialogTitle className="text-xl font-bold md:text-2xl text-zinc-900">
                                            خرابی لامپ ها
                                        </DialogTitle>

                                        {/* آیکون سپر خطر که حالا دقیقاً روبروی متن قرار دارد */}
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-danger-3">
                                            <ShieldClose className="h-4 w-4 text-danger-3" />
                                        </div>
                                    </div>

                                    {/* توضیحات زیر عنوان */}
                                    <DialogDescription className="text-sm text-zinc-600 md:text-base mt-1">
                                        لامپای راهرو باید تعویض بشن
                                    </DialogDescription>
                                </DialogHeader>

                                {/* بدج‌های وضعیت (کوچک و مینی‌مال) */}
                                <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
                                    <div className="flex items-center gap-1 rounded-sm border font-medium border-yellow-400 bg-yellow-50 px-3 py-1  text-xs text-yellow-800">
                                        در حال بررسی
                                    </div>
                                    <div className="flex items-center gap-1 rounded-sm border font-medium border-blue-400 bg-blue-50 px-4 py-1 text-xs text-blue-700">
                                        تعمیرات
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 flex flex-row overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                            <div className="w-3 shrink-0 bg-neutral-3" />
                            <div className="flex-1 pr-2 pl-2 py-2.5 md:px-4 md:py-4">
                                <p className="text-right text-sm font-medium leading-6 text-zinc-600 md:text-base md:leading-7">
                                    سلام وقتتون بخیر نیاز هست لامپای تموم راهرو طبقه سوم بلوک 5 عوض شه
                                    چون همشون خراب شده و نیاز به تعویض همشون هست لطفا هر چه زودتر پیگیری
                                    کنین چون به شدت محیط تاریک و ترسناکی داره
                                </p>
                            </div>

                        </div>

                        <div className="overflow-hidden rounded-3xl border bg-[#f6f6f8]">
                            {/* هدر بخش پیام‌ها */}
                            <div className="border-b border-zinc-200 bg-white px-6 py-4 text-right">
                                <h3 className="text-lg font-bold text-zinc-900 md:text-xl flex items-center gap-2">
                                کامنت ها 
                                </h3>
                            </div>

                            {/* تاریخچه گفتگو: لایه اصلی چپ‌چین شده تا اسکرول‌بار در سمت راست بیفتد */}
                            <div
                                dir="ltr"
                                className="space-y-4 px-1 py-6 md:px-4 overflow-y-auto max-h-[45vh] custom-scrollbar"
                            >
                                {/* لایه داخلی: مجدداً راست‌چین شده تا پیام‌ها و آواتارهای فارسی درست رندر شوند */}
                                <div dir="rtl" className="space-y-4 w-full text-right">
                                    {comments.map((comment, index) => (
                                        <div
                                            key={`${comment.id}-${index}`}
                                            className={`flex items-end w-full gap-3 ${comment.isOwner ? "flex-row-reverse" : "flex-row"
                                                }`}
                                        >
                                            {/* آواتار کاربر */}
                                            <div className="bg-neutral-4 rounded-full shrink-0">
                                                <Avatar className="items-center justify-center">
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>

                                            {/* باکس پیام با استایل هماهنگ تصویر */}
                                            <div
                                                className={`w-fit max-w-[85%] rounded-2xl border  px-3 py-2 shadow-sm ${comment.isOwner ? "bg-white border-zinc-300 rounded-bl-none" : "border-secondary-blue-2 bg-secondary-blue-5 rounded-br-none"}`}
                                            >
                                                <div className="mb-1 text-xs font-light text-neutral-1 text-right">
                                                    {comment.user}
                                                </div>

                                                <p className="text-sm text-zinc-800 md:text-base text-right">
                                                    {comment.text}
                                                </p>

                                                <div className="mt-2 text-[10px] font-extralight text-black text-left">
                                                    {comment.date}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* بخش ورودی پیام جدید */}
                            <div className="p-4 bg-white border-t border-zinc-100">
                                <div className="flex items-end gap-2 w-full">
                                    <button
                                        type="button"
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-2 text-white shadow-md transition-all hover:bg-primary-1 active:scale-95 mb-[1.5px] cursor-pointer"
                                    >
                                        <Send className="h-5 w-5 -rotate-45 translate-y-0.5" />
                                    </button>
                                    <CustomField
                                        type="text"
                                        placeholder="پاسخ خود را بنویسید..."
                                        direction="rtl"
                                        variant="default"
                                        containerClassName="flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}