import { ShieldClose, ShieldUser, Trash2, type LucideIcon } from "lucide-react";
import TicketDetailsDialog from "./TicketDetailsDialog";
import useAuthStore from "@/store/useAuthStore";
import { motion } from "framer-motion";
import { translateDate } from "@/utils/translateDate";

interface Prop {
    tickets:
    | {
        id: number;
        title: string;
        date: string;
        unit: string;
        category: string;
        status: string;
        statusColor: string;
        icon: LucideIcon;
        iconBg: string;
        iconColor: string;
        isPublic: boolean;
    }[]
    | null;
}

function TicketTable({ tickets }: Prop) {
    const isAdmin = useAuthStore((store) => store.user?.role == "admin");

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
                                    className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl ${ticket.iconBg}`}
                                >
                                    <Icon
                                        className={`h-7 w-7 sm:h-8 sm:w-8 ${ticket.iconColor}`}
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
                                {isAdmin && (
                                    <div className="text-sm font-medium text-neutral-2">
                                        {ticket.unit}
                                    </div>
                                )}

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
                            {isAdmin && (
                                <div className="hidden flex-2 text-center text-neutral-2 font-medium md:block">
                                    {ticket.unit}
                                </div>
                            )}

                            {/* Desktop Status */}
                            <div className="hidden flex-2 justify-center sm:flex">
                                <div
                                    className={`w-32 rounded-lg py-1.5 text-center text-sm font-bold ${ticket.statusColor}`}
                                >
                                    {ticket.status}
                                </div>
                            </div>

                            {/* Desktop Category */}
                            <div className="hidden flex-2 text-center text-neutral-2 font-extrabold md:block">
                                {ticket.category}
                            </div>

                            {/* Button */}
                            <div className="flex flex-2 justify-end items-center gap-2">
                                <TicketDetailsDialog />
                                {!isAdmin && (
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white border-2 p-2 rounded-lg text-danger-2 border-danger-3 flex items-center justify-center transition-colors duration-200"
                                    >
                                        <Trash2 size={18} />
                                    </motion.button>
                                )}

                            </div>
                        </div>
                    );
                })}

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
