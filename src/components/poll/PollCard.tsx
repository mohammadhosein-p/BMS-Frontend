// components/PollCard.tsx

import { AlarmClock, Clock, Clock3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PollOption {
    id: number;
    title: string;
    percent: number;
}

interface PollCardProps {
    title: string;
    options: PollOption[];
    isActive?: boolean;
}

export default function PollCard({
    title,
    options,
    isActive = true,
}: PollCardProps) {
    return (
        <div className="w-full">
            {/* timer */}
            <div className="mb-3 flex items-center justify-right px-4 gap-2">
                <div className="flex items-end gap-3">
                    <AlarmClock className="h-6 w-6 text-zinc-400" />
                    <div className="flex items-center gap-1">
                        <span className="text-xl font-bold leading-none text-zinc-800">
                            20
                        </span>
                        <span className="pb-[2px] text-md font-bold text-zinc-800">
                            دقیقه
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-xl font-bold leading-none text-zinc-800">
                            10
                        </span>
                        <span className="pb-[2px] text-lg font-bold text-zinc-800">
                            ساعت
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-xl font-bold leading-none text-zinc-800">
                            01
                        </span>
                        <span className="pb-[2px] text-lg font-bold text-zinc-800">
                            روز
                        </span>
                    </div>
                </div>
            </div>

            {/* card */}
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
                {/* header */}
                <div
                    className={cn(
                        "flex items-center justify-between px-6 py-4 gap-4",
                        isActive ? "bg-[#DCE8F6]" : "bg-zinc-200",
                    )}
                >
                    <h2 className="text-xl text-zinc-900">{title}</h2>

                    <div
                        className={cn(
                            "flex h-[42px] w-[80px] items-center justify-center rounded-xl text-lg font-bold",
                            isActive
                                ? "bg-[#C8D8EE] text-zinc-900"
                                : "bg-zinc-300 text-zinc-700",
                        )}
                    >
                        {isActive ? "فعال" : "غیر فعال"}
                    </div>
                </div>

                {/* body */}
                <div className="px-8 py-8">
                    <div className="space-y-6">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center gap-4"
                            >
                                {/* title */}
                                <span className="min-w-[85px] text-right text-xl text-zinc-900">
                                    {option.title}
                                </span>

                                {/* progress */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Progress
                                            value={option.percent}
                                            className={cn(
                                                "h-9 rounded-xl bg-transparent",
                                                "[&>div]:rounded-xl",
                                                isActive
                                                    ? "[&>div]:bg-[#6CABEA]"
                                                    : "[&>div]:bg-zinc-300",
                                            )}
                                        />

                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white">
                                            %{option.percent}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* button */}
                    <div className="mt-10 flex justify-center">
                        <button
                            className={cn(
                                "rounded-2xl border-[3px] px-6 py-2 text-lg transition-all",
                                isActive
                                    ? "border-[#2F86FF] text-[#2F86FF]"
                                    : "border-zinc-500 text-zinc-700",
                            )}
                        >
                            مشاهده نتایج و جزئیات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
