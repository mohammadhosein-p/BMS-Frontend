// components/PollDetailsDialog.tsx

import { useState } from "react";

import { BadgeCheck, CircleHelp, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PollOption {
    id: number;
    title: string;
    percent: number;
    isVoted?: boolean;
}

interface PollDetailsDialogProps {
    trigger: React.ReactNode;
    title: string;
    description?: string;
    isActive?: boolean;
    isPublic?: boolean;
    options: PollOption[];
}

function PollDetailsDialog({
    trigger,
    title,
    description,
    isActive = true,
    isPublic = true,
    options,
}: PollDetailsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <div onClick={() => setIsOpen(true)}>{trigger}</div>

            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className="max-w-2xl overflow-y-auto custom-scrollbar rounded-4xl border-none bg-neutral-5 p-0"
            >
                {/* Header */}
                <DialogHeader className="relative px-6 py-5">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-danger-2 text-white transition-all hover:opacity-90"
                        >
                            <X className="h-5 w-5" strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="text-center text-2xl font-bold text-neutral-1">
                        جزئیات نظرسنجی
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="space-y-4 px-4 pb-5">
                    {/* Info Box */}
                    <div className="rounded-3xl border border-neutral-4 bg-neutral-5 p-4">
                        {/* top */}
                        <div className="mb-3 flex items-start justify-between gap-3">
                            {/* icon */}
                            <CircleHelp className="h-8 w-8 text-primary-2" />

                            {/* title */}
                            <div className="flex-1 text-right">
                                <h2 className="text-xl font-bold text-neutral-1">
                                    {title}
                                </h2>
                            </div>

                            {/* badges */}
                            <div className="flex items-center gap-2">
                                <div
                                    className={cn(
                                        "rounded-lg px-5 py-1.25 text-sm font-bold",
                                        isPublic
                                            ? "bg-success-op1-3/90 text-neutral-5"
                                            : "bg-danger-3/90 text-neutral-5",
                                    )}
                                >
                                    {isPublic ? "عمومی" : "خصوصی"}
                                </div>

                                <div
                                    className={cn(
                                        "rounded-lg px-5 py-1.25 text-sm font-bold",
                                        isActive
                                            ? "bg-secondary-blue-3/90 text-neutral-5"
                                            : "bg-neutral-3 text-neutral-5",
                                    )}
                                >
                                    {isActive ? "فعال" : "غیرفعال"}
                                </div>
                            </div>
                        </div>

                        {/* description */}
                        <p className="text-center text-sm leading-7 text-neutral-2">
                            {description}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 rounded-3xl border border-neutral-4 bg-neutral-5 p-4">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center gap-4 rounded-2xl border border-neutral-4 bg-neutral-5 px-4 py-3 transition ease-in hover:scale-105 cursor-pointer"
                            >
                                {/* voted */}
                                <div className="h-5 w-5 fill-secondary-blue-2 text-white">
                                    {option.isVoted && (
                                        <BadgeCheck className="h-5 w-5 fill-secondary-blue-2 text-white" />
                                    )}
                                </div>
                                {/* title */}
                                <span className="min-w-[70px] text-right text-base text-neutral-1">
                                    {option.title}
                                </span>

                                {/* progress */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Progress
                                            value={option.percent}
                                            className={cn(
                                                "h-5 rounded-md border border-neutral-3 bg-white",
                                                "[&>div]:rounded-md [&>div]:bg-secondary-blue-2",
                                            )}
                                        />

                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-neutral-1">
                                            %{option.percent}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PollDetailsDialog;
