import RegisterTicketDialog from "@/components/ticket/RegisterTicketDialog";
import TicketTable from "@/components/ticket/TicketTable";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import SelectOptions from "@/components/ui/SelectOptions/SelectOptions";
import { categoryOptions } from "@/utils/ticketMapping";
import { TicketStatusChartDialog } from "@/components/ticket/TicketStatusChartDialog";
import { useAllTickets } from "@/hooks/useTicket";

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

    const apiParams = {
        status: filterState === "all" ? undefined : filterState,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        page: 1,
        limit: 1000,
    };
    const { data, isLoading, isError } = useAllTickets(apiParams);

    return (
        <div className="flex h-full flex-col gap-3 overflow-hidden bg-neutral-5 p-3 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="flex flex-row-reverse items-center justify-between gap-3">
                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl">
                    تیکت های من
                </h1>

                <div className="flex flex-row-reverse items-center gap-2">
                    <RegisterTicketDialog />
                </div>
            </div>

            <Separator />

            {/* Filters */}
            <div className="w-full">
                <div className="flex flex-col gap-3 md:flex-row-reverse md:items-center md:justify-between">

                    <div className="flex flex-col gap-3 sm:flex-wrap sm:flex-row-reverse sm:items-center sm:flex-1">
                        {/* Category Select */}
                        <div className="w-full sm:w-60 shrink-0">
                            <SelectOptions
                                value={categoryFilter}
                                onChange={(value) => setCategoryFilter(value)}
                                options={categoryOptions}
                                limitedWidth
                            />
                        </div>

                        {/* Status Filters */}
                        <div className="w-full sm:w-auto">
                            <div className="flex max-w-[89vw] flex-row-reverse gap-2 overflow-x-auto sm:max-w-none">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.state}
                                        className={`h-10 shrink-0 whitespace-nowrap rounded-xl border border-neutral-4 px-3 text-sm font-bold text-neutral-1 transition ${filter.state == filterState
                                                ? "bg-neutral-4 hover:bg-neutral-3/60"
                                                : "bg-white hover:bg-neutral-5"
                                            }`}
                                        onClick={() => setFilterState(filter.state)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start shrink-0 mt-2 md:mt-0">
                        <TicketStatusChartDialog tickets={data?.data} />
                    </div>

                </div>
            </div>

            <TicketTable
                categoryFilter={categoryFilter as CategoryFilter}
                filterState={filterState}
                ticketFetchProps={{ data, isLoading, isError }}
            />
        </div>
    );
}

export default TicketsTab;