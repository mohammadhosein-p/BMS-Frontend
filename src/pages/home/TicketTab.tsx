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
        <div className="flex h-full flex-col gap-3 overflow-hidden bg-neutral-5 p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="flex gap-3 flex-row-reverse items-center justify-between">
                <h1 className="text-right text-2xl font-extrabold md:font-black text-neutral-1 sm:text-3xl">
                    تیکت های من
                </h1>

                <CustomButton
                    icon={PlusCircle}
                    className="ltr p-2 md:p-4"
                >
                    ثبت تیکت جدید
                </CustomButton>
            </div>

            <Separator />

            {/* Filters */}
            <div className="w-full overflow-x-auto">
                <div className="flex flex-col gap-3 sm:flex-wrap sm:flex-row-reverse sm:items-center">
                    {/* Search */}
                    <div className="w-full sm:w-60 shrink-0">
                        <CustomField
                            icon={<Search className="h-4 w-4" />}
                            placeholder="جستجو در تیکت ها"
                            className="h-10 bg-white"
                        />
                    </div>

                    {/* Filters */}
                    <div className="sm:flex-1">
                        <div className="flex max-w-[89vw] flex-row-reverse gap-2 overflow-x-auto">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    className="
                        h-10 shrink-0 whitespace-nowrap
                        rounded-xl border border-neutral-4
                        bg-white px-3 text-sm font-bold
                        text-neutral-1 transition hover:bg-neutral-5
                    "
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-hidden rounded-3xl border border-neutral-4 bg-white">
                <div className="custom-scrollbar h-full overflow-y-auto divide-y divide-neutral-4">
                    {tickets.map((ticket) => {
                        const Icon = ticket.icon;

                        return (
                            <div
                                key={ticket.id}
                                className="
                                    flex flex-col gap-4 p-4 transition
                                    hover:bg-neutral-5/60
                                    sm:flex-row-reverse sm:items-center sm:gap-4 sm:px-6 sm:py-4
                                "
                            >
                                {/* Right */}
                                <div className="flex flex-3 flex-row-reverse items-center gap-4 min-w-0 text-right">
                                    {/* Icon */}
                                    <div
                                        className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl ${ticket.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-7 w-7 sm:h-8 sm:w-8 ${ticket.iconColor}`}
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

                                {/* Mobile Info */}
                                <div className="flex flex-wrap items-center justify-between gap-2 sm:hidden">
                                    <div className="text-sm font-medium text-neutral-2">
                                        {ticket.unit}
                                    </div>

                                    <div className="text-sm font-medium text-neutral-2">
                                        {ticket.category}
                                    </div>

                                    <div
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${ticket.statusColor}`}
                                    >
                                        {ticket.status}
                                    </div>
                                </div>

                                {/* Desktop Unit */}
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.unit}
                                </div>

                                {/* Desktop Status */}
                                <div className="hidden flex-2 justify-center sm:flex">
                                    <div
                                        className={`w-32 rounded-full px-4 py-2 text-center text-sm font-bold ${ticket.statusColor}`}
                                    >
                                        {ticket.status}
                                    </div>
                                </div>

                                {/* Desktop Category */}
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.category}
                                </div>

                                {/* Button */}
                                <div className="flex flex-2 justify-end">
                                    <button className="w-full rounded-xl border border-neutral-4 px-5 py-2 text-sm font-medium transition hover:bg-neutral-5 sm:w-auto">
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
