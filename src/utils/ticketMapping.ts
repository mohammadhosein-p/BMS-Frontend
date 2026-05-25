import type { LucideIcon } from "lucide-react";
import {
    Wrench,
    Pipette,
    Zap,
    Shield,
    Sparkles,
    Car,
    Shapes,
} from "lucide-react";

export type TicketStatus = "open" | "in-progress" | "closed";

export type TicketCategory =
    | "maintenance"
    | "plumbing"
    | "electricity"
    | "security"
    | "cleaning"
    | "parking"
    | "other";

type StatusColor = "green" | "yellow" | "red";

type CategoryColor =
    | "blue"
    | "cyan"
    | "yellow"
    | "red"
    | "green"
    | "purple"
    | "gray";

type StatusOption = {
    value: TicketStatus;
    label: string;
    color: StatusColor;
    bgClass: string;
    textClass: string;
};

type CategoryOption = {
    value: TicketCategory | "all";
    label: string;
    color: CategoryColor;
    icon: LucideIcon;
    bgClass: string;
    textClass: string;
};

export const ticketStatusOptions: StatusOption[] = [
    {
        value: "open",
        label: "باز",
        color: "green",
        bgClass: "bg-green-100",
        textClass: "text-green-700",
    },
    {
        value: "in-progress",
        label: "در حال بررسی",
        color: "yellow",
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-700",
    },
    {
        value: "closed",
        label: "بسته شده",
        color: "red",
        bgClass: "bg-red-100",
        textClass: "text-red-700",
    },
];

export const ticketCategoryOptions: CategoryOption[] = [
    {
        value: "maintenance",
        label: "تعمیرات",
        color: "blue",
        icon: Wrench,
        bgClass: "bg-blue-100",
        textClass: "text-blue-600",
    },
    {
        value: "plumbing",
        label: "لوله کشی",
        color: "cyan",
        icon: Pipette,
        bgClass: "bg-cyan-100",
        textClass: "text-cyan-600",
    },
    {
        value: "electricity",
        label: "برق",
        color: "yellow",
        icon: Zap,
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-600",
    },
    {
        value: "security",
        label: "امنیت",
        color: "red",
        icon: Shield,
        bgClass: "bg-red-100",
        textClass: "text-red-600",
    },
    {
        value: "cleaning",
        label: "نظافت",
        color: "green",
        icon: Sparkles,
        bgClass: "bg-green-100",
        textClass: "text-green-600",
    },
    {
        value: "parking",
        label: "پارکینگ",
        color: "purple",
        icon: Car,
        bgClass: "bg-purple-100",
        textClass: "text-purple-600",
    },
    {
        value: "other",
        label: "سایر",
        color: "gray",
        icon: Shapes,
        bgClass: "bg-gray-100",
        textClass: "text-gray-600",
    },
];

export const categoryOptions: CategoryOption[] = [
    {
        value: "all",
        label: "همه دسته‌بندی‌ها",
        color: "gray",
        icon: Shapes,
        bgClass: "bg-gray-100",
        textClass: "text-gray-600",
    },
    ...ticketCategoryOptions,
];
