import { ShieldClose, ShieldUser, Trash2, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import TicketDetailsDialog from "./TicketDetailsDialog";
import useAuthStore from "@/store/useAuthStore";
import { translateDate } from "@/utils/translateDate";
import { Spinner } from "../ui/spinner";
import {
    useAllTickets,
    useDeleteTicket,
    useUpdateTicketStatus,
} from "@/hooks/useTicket";
import SelectOptions from "../ui/SelectOptions/SelectOptions";

const ticketStatusOptions = [
    {
        value: "open",
        label: "باز",
        color: "green",
    },
    {
        value: "in_progress",
        label: "در حال بررسی",
        color: "yellow",
    },
    {
        value: "closed",
        label: "بسته شده",
        color: "red",
    },
];

interface UiTicket {
    id: string;
    user_id: string;
    title: string;
    date: string;
    category: string;
    status: string;
    statusLabel: string;
    statusColor: string;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    isPublic: boolean;
}

interface Prop {
    filterState: "all" | "closed" | "in-progress";
    categoryFilter:
        | "all"
        | "maintenance"
        | "plumbing"
        | "electricity"
        | "security"
        | "cleaning"
        | "parking"
        | "other";
}

function TicketTable({ filterState, categoryFilter }: Prop) {
    const isManager = useAuthStore((store) => store.user?.role === "manager");
    const user_id = useAuthStore((store) => store.user?.id);

    const apiParams = {
        status: filterState === "all" ? undefined : filterState,
        category: categoryFilter === "all" ? undefined : categoryFilter,
        // user_id: user_id,
        page: 1,
        limit: 1000,
    };

    const { data, isLoading, isError } = useAllTickets(apiParams);
    const { mutate: updateTicketStatus } = useUpdateTicketStatus();
    const { mutate: deleteTicket } = useDeleteTicket();

    const tickets: UiTicket[] | undefined = data?.data?.map((ticket) => ({
        id: ticket.ID,
        user_id: ticket.UserID,
        title: ticket.Title,
        date: ticket.CreatedAt,
        // unit: ticket.unit || "نامشخص",
        category: ticket.Category,
        status: ticket.Status,
        statusLabel:
            ticket.Status === "open"
                ? "باز"
                : ticket.Status === "in-progress"
                  ? "در حال بررسی"
                  : "بسته شده",
        statusColor:
            ticket.Status === "open"
                ? "bg-green-100 text-green-700"
                : ticket.Status === "in-progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700",
        icon: ticket.Accessibility === "public" ? ShieldUser : ShieldClose,
        iconBg:
            ticket.Accessibility === "public" ? "bg-blue-100" : "bg-red-100",
        iconColor:
            ticket.Accessibility === "public"
                ? "text-blue-600"
                : "text-red-600",
        isPublic: ticket.Accessibility === "public",
    }));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Spinner className="h-8 w-8" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-20 w-20 items-center p-2 justify-center rounded-full bg-neutral-4 text-neutral-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                        />
                    </svg>
                </div>

                <h3 className="text-lg font-extrabold text-danger-2">
                    خطا در دریافت لیست تیکت ها
                </h3>
                <p>لطفا بعدا دوباره تلاش کنید</p>
            </div>
        );
    }
    console.log(data);

    return (
        <div className="flex-1 overflow-hidden rounded-lg border border-neutral-4 bg-white">
            <div className="custom-scrollbar h-full overflow-y-auto divide-y divide-neutral-4">
                {tickets?.map((ticket) => {
                    const Icon = ticket.icon;

                    return (
                        <div
                            key={ticket.id}
                            className="flex flex-col gap-4 p-4 transition hover:bg-neutral-5/60 sm:flex-row-reverse sm:items-center sm:gap-4 sm:px-6 sm:py-4"
                        >
                            {/* Right */}
                            <div className="flex flex-3 flex-row-reverse items-center gap-4 min-w-0 text-right">
                                {/* Icon */}
                                <div
                                    className={`
                                        flex h-14 w-14 sm:h-16 sm:w-16
                                        shrink-0 items-center justify-center
                                        rounded-2xl
                                        ${ticket.iconBg}
                                    `}
                                >
                                    <Icon
                                        className={`
                                            h-7 w-7 sm:h-8 sm:w-8
                                            ${ticket.iconColor}
                                        `}
                                    />
                                </div>

                                {/* Title */}
                                <div className="min-w-0">
                                    <div className="flex gap-2 items-center">
                                        {ticket.isPublic ? (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-secondary-blue-3">
                                                <ShieldUser className="h-4 w-4 text-secondary-blue-3" />
                                            </div>
                                        ) : (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-danger-3">
                                                <ShieldClose className="h-4 w-4 text-danger-3" />
                                            </div>
                                        )}

                                        <h3 className="truncate font-bold text-neutral-1">
                                            {ticket.title}
                                        </h3>
                                    </div>

                                    <p className="mt-1 text-sm text-neutral-3">
                                        {translateDate(ticket.date)}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Info */}
                            <div className="flex flex-wrap items-center justify-around gap-2 sm:hidden">
                                {/* {isManager && (
                                    <div className="text-sm font-medium text-neutral-2">
                                        {ticket.unit}
                                    </div>
                                )} */}

                                <div className="text-sm font-medium text-neutral-2">
                                    {ticket.category}
                                </div>

                                {/* Admin Status Select */}
                                {isManager ? (
                                    <div className="space-y-1 w-36">
                                        <SelectOptions
                                            value={ticket.status}
                                            onChange={(value) => {
                                                updateTicketStatus({
                                                    ticketId: ticket.id,

                                                    status: value,
                                                });
                                            }}
                                            options={ticketStatusOptions as any}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className={`
                                        rounded-full px-3 py-1
                                        text-xs font-bold
                                        ${ticket.statusColor}
                                    `}
                                    >
                                        {ticket.statusLabel}
                                    </div>
                                )}
                            </div>

                            {/* Desktop Unit */}
                            {/* {isManager && (
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.unit}
                                </div>
                            )} */}

                            {/* Desktop Status */}

                            {/* Admin Status Select */}
                            {isManager ? (
                                <div className="space-y-1 w-32">
                                    <SelectOptions
                                        value={ticket.status}
                                        onChange={(value) => {
                                            updateTicketStatus({
                                                ticketId: ticket.id,

                                                status: value,
                                            });
                                        }}
                                        options={ticketStatusOptions as any}
                                    />
                                </div>
                            ) : (
                                <div className="hidden flex-2 justify-center sm:flex">
                                    <div
                                        className={`
                                        w-32 rounded-lg py-1.5
                                        text-center text-sm font-bold
                                        ${ticket.statusColor}
                                    `}
                                    >
                                        {ticket.statusLabel}
                                    </div>
                                </div>
                            )}

                            {/* Desktop Category */}
                            <div className="hidden flex-2 text-center text-neutral-2 font-extrabold md:block">
                                {ticket.category}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-2 justify-end items-center gap-2">
                                <TicketDetailsDialog id={ticket.id} />

                                {ticket.user_id === user_id && (
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => deleteTicket(ticket.id)}
                                        className="
                                            flex items-center justify-center
                                            transition-colors duration-200
                                        "
                                    >
                                        <Trash2 size={18} />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Empty State */}
                {(!tickets || tickets.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-neutral-5 text-neutral-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                                />
                            </svg>
                        </div>

                        <h3 className="text-lg font-bold text-neutral-1">
                            لیست تیکت‌ها خالی است
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-7 text-neutral-3">
                            در حال حاضر هیچ تیکتی برای نمایش وجود ندارد.
                            می‌توانید بعداً دوباره بررسی کنید یا یک تیکت جدید
                            ثبت کنید.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TicketTable;
