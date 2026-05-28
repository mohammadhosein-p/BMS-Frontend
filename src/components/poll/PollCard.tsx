// components/PollCard.tsx

import { AlarmClock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import PollDetailsDialog from "./PollDetailDialog";

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
                <div className="flex items-center gap-3">
                    <AlarmClock className="h-6 w-6 text-zinc-400" />
                    <div className="flex items-center gap-1">
                        <span className="text-lg font-bold leading-none text-zinc-800">
                            01
                        </span>
                        <span className="pb-0.75 text-md font-bold text-zinc-800">
                            روز
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-lg font-bold leading-none text-zinc-800">
                            10
                        </span>
                        <span className="pb-0.75 text-md font-bold text-zinc-800">
                            ساعت
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-lg font-bold leading-none text-zinc-800">
                            20
                        </span>
                        <span className="pb-0.75 text-md font-bold text-zinc-800">
                            دقیقه
                        </span>
                    </div>
                </div>
            </div>

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
                <div className="px-6 py-8">
                    <div className="space-y-6">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="flex items-center gap-2"
                            >
                                {/* title */}
                                <span className="w-21.25 line-clamp-1 text-right text-md text-zinc-900">
                                    {option.title}
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

                    <div className="mt-10 flex justify-center">
                        <PollDetailsDialog
                            title={title}
                            isActive={isActive}
                            isPublic
                            description="سلام وقتتون بخیر من به شدت نیاز دارم راهرو طبقه سوم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک ووم تمیز بشه چون همسایمون زده به تعویض همسری و هست لطفا هر چه زودتر پیگیری کنین چون به شدت محیط تاریک و ترسناکی داره"
                            options={[
                                {
                                    id: 1,
                                    title: "گزینه 1",
                                    percent: 30,
                                    isVoted: true,
                                },
                                {
                                    id: 2,
                                    title: "گزینه 2",
                                    percent: 30,
                                },
                                {
                                    id: 3,
                                    title: "گزینه 3",
                                    percent: 30,
                                },
                                {
                                    id: 4,
                                    title: "گزینه 4",
                                    percent: 30,
                                },
                            ]}
                            trigger={
                                <button
                                    className={cn(
                                        "rounded-2xl border-[3px] px-4 py-1.25 text-md cursor-pointer hover:scale-105 transition-all",
                                        isActive
                                            ? "border-[#2F86FF] text-[#2F86FF]"
                                            : "border-zinc-500 text-zinc-700",
                                    )}
                                >
                                    مشاهده نتایج و جزئیات
                                </button>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
