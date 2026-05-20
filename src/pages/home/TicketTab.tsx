import RegisterTicketDialog from "@/components/ticket/RegisterTicketDialog";
import TicketTable from "@/components/ticket/TicketTable";
import CustomField from "@/components/ui/CutsomeFiled";
import { Separator } from "@/components/ui/separator";
import { Search, Wrench, Sparkles, Wallet, House } from "lucide-react";
import { useState } from "react";

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
        isPublic: false,
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
        isPublic: false,
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
        isPublic: true,
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
        isPublic: false,
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
        isPublic: true,
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
        isPublic: false,
    },
];

type FilterState = "all" | "closed" | "checking" | "pending";

interface FilterOption {
    state: FilterState;
    label: string;
}

const filters: FilterOption[] = [
    { state: "all", label: "همه تیکت‌ها" },
    { state: "pending", label: "در انتظار بررسی" },
    { state: "checking", label: "در حال پیگیری" },
    { state: "closed", label: "بسته شده" },
];


function TicketsTab() {
    const [filterState, setFilterState] = useState<FilterState>("all");

    return (
        <div className="flex h-full flex-col gap-3 overflow-hidden bg-neutral-5 p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="flex gap-3 flex-row-reverse items-center justify-between">
                <h1 className="text-right text-2xl font-extrabold md:font-black text-neutral-1 sm:text-3xl">
                    تیکت های من
                </h1>

                <RegisterTicketDialog />
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
                                    key={filter.state}
                                    className={`h-10 shrink-0 whitespace-nowrap rounded-xl border border-neutral-4 px-3 text-sm font-bold text-neutral-1 transition  ${filter.state == filterState ? "bg-neutral-4 hover:bg-neutral-3/60" : "bg-white hover:bg-neutral-5"}`}
                                    onClick={() => setFilterState(filter.state)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <TicketTable tickets={tickets} />
        </div>
    );
}

export default TicketsTab;
