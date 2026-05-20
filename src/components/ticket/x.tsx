import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Send, ShieldCheck, Clock3, Wrench } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CustomButton from "../ui/CustomeButton";

const comments = [
    {
        id: 1,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 2,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: false,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
    {
        id: 3,
        user: "نام کاربری",
        text: "اوضاع لامپ ها اصلا خوب نیست",
        date: "1402/05/02 19:03",
        isOwner: true,
    },
];

export default function TicketDetailsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton
                    variant="secondary"
                    styleType="outline"
                    className="w-full h-9 rounded-lg text-sm font-medium sm:w-auto"
                >
                    مشاهده جزئیات
                </CustomButton>

            </DialogTrigger>

            <DialogContent
                dir="rtl"
                className="custom-scrollbar w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-[28px] border bg-[#f8f8f8] p-0"
            >
                <div className="p-4 md:p-6">
                    {/* Top Actions */}
                    <div className=" flex items-center justify-between">
                        <DialogClose className="absolute left-2 md:left-4 top-8 rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <div className="-translate-y-1/2 bg-white/20 rounded-xl border-2 border-red-400 px-7 py-1 text-red-500 transition hover:bg-red-50">
                                خروج
                            </div>
                        </DialogClose>

                        {/* <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-400 bg-white">
                            <ShieldCheck className="h-6 w-6 text-red-500" />
                        </div> */}
                    </div>

                    {/* Ticket Header */}
                    <div className="mb-3 mt-0 sm:mt-3 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        {/* Ticket Image */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#f3ddb0] md:h-32 md:w-32">
                            <ShieldCheck className="h-16 w-16 text-[#9a6b00] md:h-20 md:w-20" />
                        </div>

                        {/* Right Content */}
                        <div className="flex-1">
                            <DialogHeader className="mb-4 text-right">
                                <DialogTitle className="text-3xl font-bold md:font-extrabold text-right text-zinc-900 ">
                                    خرابی لامپ ها
                                </DialogTitle>

                                <p className="text-right text-lg text-zinc-700 ">
                                    لامپای راهرو باید تعویض بشن
                                </p>
                            </DialogHeader>

                            {/* Status */}
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 rounded-xl border font-light border-yellow-500 bg-yellow-100 px-3 py-2 text-sm text-yellow-800">
                                    <Clock3 className="h-4 w-4" />
                                    در حال بررسی
                                </div>

                                <div className="flex items-center gap-1 rounded-xl border font-light border-blue-500 bg-blue-100 px-3 py-2 text-sm text-blue-700">
                                    <Wrench className="h-4 w-4" />
                                    تعمیرات
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3 rounded-3xl bg-white px-3 md:px-6 text-justify py-4 leading-5 text-neutral-2 border-r-6 border-r-neutral-3 border-2">
                        سلام وقتتون بخیر نیاز هست لامپای تموم راهرو طبقه سوم
                        بلوک 5 عوض شه چون همشون خراب شده و نیاز به تعویض همشون
                        هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک و
                        ترسناکی داره
                    </div>

                    {/* <div className="mb-5 flex flex-wrap justify-end gap-3">
                        {["تگ1", "تگ2", "تگ3"].map((tag) => (
                            <div
                                key={tag}
                                className="rounded-xl border bg-white px-5 py-2 text-sm text-zinc-500"
                            >
                                {tag}
                            </div>
                        ))}
                    </div> */}

                    {/* Comments Section */}
                    <div className="overflow-hidden rounded-3xl border bg-[#f6f6f8]">
                        {/* Header */}
                        <div className="border-b bg-white px-6 py-2">
                            <h2 className="text-2xl font-bold text-zinc-900 md:text-3xl">
                                پیام ها
                            </h2>
                        </div>

                        {/* Comments */}
                        <div className="space-y-4 px-1 py-6 md:px-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className={`flex items-end w-full gap-3 ${comment.isOwner ? "justify-right flex-row-reverse" : "justify-left"}`}
                                >
                                    {/* Avatar */}
                                    <div className="bg-neutral-4 rounded-full">
                                        <Avatar className="items-center justify-center">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>

                                    {/* Bubble */}
                                    <div
                                        className={`w-fit max-w-[85%] rounded-2xl border  px-3 py-2 shadow-sm ${comment.isOwner ? "bg-white border-zinc-300 rounded-bl-none" : "border-secondary-blue-2 bg-secondary-blue-5 rounded-br-none"}`}
                                    >
                                        <div className="mb-1 text-xs font-light text-neutral-1">
                                            {comment.user}
                                        </div>

                                        <p className="text-sm text-zinc-800 md:text-base">
                                            {comment.text}
                                        </p>

                                        <div className="mt-2 text-[10px] font-extralight text-black text-left">
                                            {comment.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 pt-1 md:p-6 md:pt-1">
                            <div className="flex items-center rounded-2xl border bg-white px-2 md:px-4 py-3">
                                <button className="flex p-3 items-center justify-center rounded-full bg-neutral-4 transition hover:bg-neutral-4">
                                    {true ? (
                                        <Send className="h-5 w-5 text-neutral-2" />
                                    ) : (
                                        <p>loading</p>
                                    )}
                                </button>

                                <input
                                    type="text"
                                    placeholder="نوشتن کامنت..."
                                    className="flex-1 bg-transparent px-4 text-base outline-none placeholder:text-neutral-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
