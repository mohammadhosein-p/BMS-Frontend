"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts" // ایمپورت کامپوننت Sector اضافه شد
import { BarChart3 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/CustomeDialog"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import CustomButton from "../ui/CustomeButton"
import { translateNumber } from "@/utils/translateNumber"
import { StatCard } from "./StatCard"

interface Ticket {
    status: string;
}

interface TicketStatusChartDialogProps {
    tickets: Ticket[] | undefined;
}

const chartConfig = {
    count: {
        label: "تعداد",
    },
    open: {
        label: "باز",
        color: "rgb(34, 197, 94)",
    },
    "in-progress": {
        label: "در حال بررسی",
        color: "rgb(234, 179, 8)",
    },
    closed: {
        label: "بسته شده",
        color: "rgb(239, 68, 68)",
    },
} satisfies ChartConfig

export function TicketStatusChartDialog({ tickets = [] }: TicketStatusChartDialogProps) {
    const [open, setOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

    const chartData = React.useMemo(() => {
        const counts = { open: 0, "in-progress": 0, closed: 0 }

        tickets.forEach((ticket) => {
            if (ticket.status === "open") counts.open++
            else if (ticket.status === "in-progress") counts["in-progress"]++
            else if (ticket.status === "closed") counts.closed++
        })

        return [
            { status: "open", count: counts.open, fill: "var(--color-open)" },
            { status: "in-progress", count: counts["in-progress"], fill: "var(--color-in-progress)" },
            { status: "closed", count: counts.closed, fill: "var(--color-closed)" },
        ]
    }, [tickets])

    const totalTickets = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0)
    }, [chartData])

    return (
        <>
            <CustomButton
                variant="success1"
                styleType="soft"
                icon={BarChart3}
                onClick={() => setOpen(true)}
                className="hidden md:inline-flex h-11 rounded-xl cursor-pointer"
            >
                نمودار وضعیت تیکت‌ها
            </CustomButton>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent isOpen={open} >
                    <DialogHeader className="space-y-1">
                        <DialogTitle>
                            آمار و وضعیت تیکت‌ها
                        </DialogTitle>
                        <DialogDescription className="text-neutral-3">
                            خلاصه وضعیت تیکت‌های ثبت شده به صورت تفکیک شده
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mx-auto flex flex-col items-center justify-center">
                        <div className="relative w-full aspect-square max-h-50">
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square w-full h-full"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel className="rounded-xl" />}
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="count"
                                        nameKey="status"
                                        innerRadius={65}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        strokeWidth={0}
                                        isAnimationActive={true}
                                        animationDuration={600}
                                        activeIndex={activeIndex ?? undefined}
                                        onMouseEnter={(_, index) => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        activeShape={({ innerRadius = 0, outerRadius = 0, ...props }) => (
                                            <Sector {...props} innerRadius={innerRadius + 1} outerRadius={outerRadius + 1} />
                                        )}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                className="fill-neutral-1 text-4xl font-black tracking-tight"
                                                            >
                                                                {translateNumber(totalTickets)}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-neutral-3 text-xs font-bold"
                                                            >
                                                                کل تیکت‌ها
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>

                        <div className="mt-7 grid grid-cols-3 gap-3.5 w-full" dir="rtl">
                            <StatCard
                                variant="open"
                                label="تیکت‌های باز"
                                count={chartData[0].count}
                            />

                            <StatCard
                                variant="in-progress"
                                label="در حال بررسی"
                                count={chartData[1].count}
                            />

                            <StatCard
                                variant="closed"
                                label="بسته شده"
                                count={chartData[2].count}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}