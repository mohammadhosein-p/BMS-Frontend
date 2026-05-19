import CustomButton from "@/components/ui/CustomeButton";
import CustomField from "@/components/ui/CutsomeFiled";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    PlusCircle,
    Wrench,
    Sparkles,
    Wallet,
    House,
} from "lucide-react";

const tickets = [
    {
        id: 1,
        title: "خرابی لامپ ها",
        date: "1402/05/02",
        unit: "واحد 5",
        category: "خرابی",
        status: "در حال بررسی",
        statusColor: "bg-yellow-200 text-yellow-800",
        icon: Wrench,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-700",
    },
    {
        id: 2,
        title: "نظافت طبقه 6",
        date: "1402/05/02",
        unit: "واحد 10",
        category: "نظافت",
        status: "بسته شده",
        statusColor: "bg-green-200 text-green-800",
        icon: Sparkles,
        iconBg: "bg-green-100",
        iconColor: "text-green-700",
    },
    {
        id: 3,
        title: "پرداخت شارژ",
        date: "1402/05/02",
        unit: "واحد 12",
        category: "پرداخت شارژ",
        status: "باز",
        statusColor: "bg-blue-200 text-blue-800",
        icon: Wallet,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-700",
    },
    {
        id: 4,
        title: "مشکل موتور خونه",
        date: "1402/05/02",
        unit: "واحد 12",
        category: "تعمیرات",
        status: "در انتظار قطعات",
        statusColor: "bg-red-200 text-red-800",
        icon: House,
        iconBg: "bg-red-100",
        iconColor: "text-red-700",
    },
    {
        id: 5,
        title: "خرابی لامپ ها",
        date: "1402/05/02",
        unit: "واحد 5",
        category: "خرابی",
        status: "در حال بررسی",
        statusColor: "bg-yellow-200 text-yellow-800",
        icon: Wrench,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-700",
    },
    {
        id: 6,
        title: "خرابی لامپ ها",
        date: "1402/05/02",
        unit: "واحد 5",
        category: "خرابی",
        status: "در حال بررسی",
        statusColor: "bg-yellow-200 text-yellow-800",
        icon: Wrench,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-700",
    },
];

const filters = ["همه وضعیت ها", "در حال بررسی", "بسته شده", "در انتظار قطعات"];

function TicketsTab() {
    return (
        <div className="flex h-full flex-col gap-3 overflow-hidden bg-neutral-5 p-6">
            {/* Header */}
            <div className="flex flex-row-reverse items-center justify-between">
                <h1 className="text-3xl font-black text-neutral-1">
                    تیکت های من
                </h1>

                <CustomButton icon={PlusCircle} className="ltr py-4">
                    ثبت تیکت جدید
                </CustomButton>
            </div>
            <Separator />
            {/* Filters */}
            <div className="flex flex-row-reverse flex-wrap items-center gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className="rounded-xl h-10 border border-neutral-4 bg-white px-5 py-2 text-sm font-bold text-neutral-1 transition hover:bg-neutral-5"
                    >
                        {filter}
                    </button>
                ))}

                {/* Search */}
                {/* <div className="relative">
                    <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-3" />

                    <input
                        placeholder="جستجو در تیکت ها"
                        className="h-11 rounded-xl border border-neutral-4 bg-white pr-10 pl-4 text-sm outline-none transition focus:border-primary-2"
                    />
                </div> */}
                <div className="w-72 shrink-0">
                    <CustomField
                        icon={<Search className="h-4 w-4" />}
                        placeholder="جستجو در تیکت ها"
                        className="bg-white h-10"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden rounded-3xl border border-neutral-4 bg-white">
                <div className="custom-scrollbar h-full divide-y divide-neutral-4 overflow-y-auto">
                    {tickets.map((ticket) => {
                        const Icon = ticket.icon;

                        return (
                            <div
                                key={ticket.id}
                                className="flex flex-row-reverse items-center gap-4 px-6 py-4 transition hover:bg-neutral-5/60"
                            >
                                {/* Right */}
                                <div className="flex flex-3 flex-row-reverse items-center gap-4 text-right min-w-0">
                                    {/* Icon */}
                                    <div
                                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${ticket.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-8 w-8 ${ticket.iconColor}`}
                                        />
                                    </div>

                                    {/* Title */}
                                    <div className="min-w-0">
                                        <h3 className="truncate font-bold text-neutral-1">
                                            {ticket.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-neutral-3">
                                            {ticket.date}
                                        </p>
                                    </div>
                                </div>

                                {/* Unit */}
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.unit}
                                </div>

                                {/* Status */}
                                <div className="sm:flex flex-2 justify-center hidden">
                                    <div
                                        className={`w-32 rounded-full px-4 py-2 text-center text-sm font-bold ${ticket.statusColor}`}
                                    >
                                        {ticket.status}
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.category}
                                </div>

                                {/* Button */}
                                <div className="flex flex-2 text-end">
                                    <button className="rounded-xl border border-neutral-4 px-5 py-2 text-sm font-medium transition hover:bg-neutral-5">
                                        مشاهده جزئیات
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TicketsTab;
