import { AlarmClock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import PollDetailsDialog from "./PollDetailDialog";
import type { PollCardProp } from "@/types/PollTypes";
import { useEffect, useState } from "react";
import { getPollTimeLeftParts } from "@/utils/pollTimer";
import getQueryClient from "@/hooks/queryClient";

export default function PollCard({
    title,
    options,
    expires_at,
    id,
    isActive,
    onExpire,
}: PollCardProp) {
    const [timeLeft, setTimeLeft] = useState(() =>
        getPollTimeLeftParts(expires_at),
    );
    const queryClient = getQueryClient();

    useEffect(() => {
        if (!isActive) return;

        const intervalId = setInterval(() => {
            const newTimeLeft = getPollTimeLeftParts(expires_at);
            setTimeLeft(newTimeLeft);

            if (
                newTimeLeft.days === 0 &&
                newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0
            ) {
                clearInterval(intervalId);

                onExpire();
            }
        }, 60_000);

        return () => clearInterval(intervalId);
    }, [expires_at, isActive, id, queryClient]);

    const totalVotes = options.reduce(
        (sum, option) => sum + option.votes_count,
        0,
    );

    const normalizedOptions = options.map((option) => {
        const percent =
            totalVotes > 0
                ? Math.round((option.votes_count / totalVotes) * 100)
                : 0;

        return {
            ...option,
            percent,
        };
    });

    return (
        <div className="w-full">
            {/* timer */}
            {isActive && (
                <div className="mb-3 flex items-center justify-right px-4 gap-2">
                    <div className="flex items-center gap-3">
                        <AlarmClock className="h-6 w-6 text-zinc-400" />
                        {/* نمایش روز */}
                        {timeLeft.days > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold leading-none text-zinc-800">
                                    {String(timeLeft.days).padStart(2, "0")}
                                </span>
                                <span className="pb-0.75 text-md font-bold text-zinc-800">
                                    روز
                                </span>
                            </div>
                        )}

                        {/* نمایش ساعت */}
                        {timeLeft.hours > 0 && (
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold leading-none text-zinc-800">
                                    {String(timeLeft.hours).padStart(2, "0")}
                                </span>
                                <span className="pb-0.75 text-md font-bold text-zinc-800">
                                    ساعت
                                </span>
                            </div>
                        )}

                        {/* نمایش دقیقه */}
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-bold leading-none text-zinc-800">
                                {String(timeLeft.minutes).padStart(2, "0")}
                            </span>
                            <span className="pb-0.75 text-md font-bold text-zinc-800">
                                دقیقه
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* card */}
            <div className="overflow-hidden rounded-[28px] bg-white shadow-md">
                {/* header */}
                <div
                    className={cn(
                        "flex items-center justify-between p-5 gap-2",
                        isActive ? "bg-secondary-blue-5" : "bg-zinc-200",
                    )}
                >
                    <h2 className="text-neutral-1 flex-1 line-clamp-2">
                        {title}
                    </h2>

                    <div
                        className={cn(
                            "flex h-10.5 w-20 items-center justify-center rounded-xl text-lg font-bold",
                            isActive
                                ? "bg-secondary-blue-4 text-zinc-900"
                                : "bg-neutral-3 text-neutral-5",
                        )}
                    >
                        {isActive ? "فعال" : "غیرفعال"}
                    </div>
                </div>

                {/* body */}
                <div className="px-6 py-6 h-52 overflow-y-auto custom-scrollbar">
                    <div className="space-y-6">
                        {normalizedOptions.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center gap-2"
                            >
                                {/* title */}
                                <span className="w-30 line-clamp-1 text-right text-md text-zinc-900">
                                    {option.text}
                                </span>

                                {/* progress */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <Progress
                                            value={Math.max(option.percent, 1)}
                                            className={cn(
                                                "h-9 rounded-xl bg-transparent",
                                                "[&>div]:rounded-xl",
                                                isActive
                                                    ? "[&>div]:bg-[#6CABEA]"
                                                    : "[&>div]:bg-neutral-3",
                                            )}
                                        />

                                        {option.percent >= 15 && (
                                            <span
                                                style={{
                                                    right: `calc(${Math.min(option.percent, 95)}% - ${option.percent < 20 ? "35px" : "40px"})`,
                                                }}
                                                className="absolute inset-y-0 flex items-center px-2 text-sm font-bold text-white"
                                            >
                                                %{option.percent}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="py-6 flex justify-center">
                    <PollDetailsDialog id={id} isActive={isActive} />
                </div>
            </div>
        </div>
    );
}
