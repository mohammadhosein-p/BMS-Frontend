import RegisterTicketDialog from "@/components/ticket/RegisterTicketDialog";
import TicketTable from "@/components/ticket/TicketTable";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SelectOptions from "@/components/ui/SelectOptions/SelectOptions";
import { categoryOptions } from "@/utils/ticketMapping";

type FilterState = "all" | "closed" | "in-progress";
type CategoryFilter =
    | "all"
    | "maintenance"
    | "plumbing"
    | "electricity"
    | "security"
    | "cleaning"
    | "parking"
    | "other";

interface FilterOption {
    state: FilterState;
    label: string;
}

const filters: FilterOption[] = [
    { state: "all", label: "همه تیکت‌ها" },
    { state: "in-progress", label: "در انتظار بررسی" },
    { state: "closed", label: "بسته شده" },
];


function TicketsTab() {
    const [filterState, setFilterState] = useState<FilterState>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    return (
        <div className="flex h-full flex-col gap-3 overflow-hidden bg-neutral-5 p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="flex flex-row-reverse items-center justify-between gap-3">
                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl md:font-black">
                    تیکت های من
                </h1>

                <RegisterTicketDialog />
            </div>

            <Separator />

            {/* Filters */}
            <div className="w-full overflow-x-auto">
                <div className="flex flex-col gap-3 sm:flex-wrap sm:flex-row-reverse sm:items-center">
                    {/* Category Select */}
                    <div className="w-full sm:w-60 shrink-0">
                        <SelectOptions
                            value={categoryFilter}
                            onChange={(value) => setCategoryFilter(value)}
                            options={categoryOptions as any}
                            limitedWidth
                        />
                    </div>

                    {/* Status Filters */}
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
            <TicketTable
                categoryFilter={categoryFilter as CategoryFilter}
                filterState={filterState}
            />
        </div>
    );
}

export default TicketsTab;
