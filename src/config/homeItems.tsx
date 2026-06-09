import ManagerUsers from "@/pages/home/ManagerUsers";
import TicketTab from "@/pages/home/TicketTab";
import { Megaphone, Vote, Ticket, Users, Scale, type LucideIcon } from "lucide-react";
import PollTab from "@/pages/home/PollTab";
import RulesTab from "@/pages/home/RulesTab";
import AnnouncementTab from "@/pages/home/announcementTab.tsx";

export const homeItems: {
    path: string;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    border_color: string;
    text_color: string;
    roles: string[];
    component: React.ReactNode;
}[] = [
        {
            path: "announcement",
            title: "اطلاعیه‌ها",
            subtitle: "مدیریت اطلاعیه‌ها",
            icon: Megaphone,
            color: "from-[var(--secondary-blue-3)] to-[var(--secondary-blue-2)]",
            border_color: "border-[var(--secondary-blue-2)]",
            text_color: "text-[var(--secondary-blue-2)]",
            roles: ["admin", "manager", "resident"],
            component: <AnnouncementTab/>,
        },
        {
            path: "voting",
            title: "رای گیری",
            subtitle: "مدیریت رای گیری‌ها",
            icon: Vote,
            color: "from-[var(--success-op2-3)] to-[var(--success-op2-2)]",
            border_color: "border-[var(--success-op2-3)]",
            text_color: "text-[var(--success-op2-3)]",
            roles: ["admin" ,"manager", "resident"],
            component: <PollTab />,
        },
        {
            path: "ticket",
            title: "تیکت‌ها",
            subtitle: "مدیریت تیکت",
            icon: Ticket,
            color: "from-[var(--primary-3)] to-[var(--primary-1)]",
            border_color: "border-[var(--primary-1)]",
            text_color: "text-[var(--primary-1)]",
            roles: ["admin", "manager", "resident"],
            component: <TicketTab />,
        },
        {
            path: "manage-users",
            title: "اعضا",
            subtitle: "مدیریت اعضا",
            icon: Users,
            color: "from-[var(--orange-3)] to-[var(--orange-2)]",
            border_color: "border-[var(--orange-3)]/40",
            text_color: "text-[var(--orange-2)]",
            roles: ["manager"],
            component: <ManagerUsers />,
        },
        {
            path: "rules",
            title: "قوانین",
            subtitle: "قوانین ساختمان",
            icon: Scale,
            color: "from-[var(--danger-3)] to-[var(--danger-1)]",
            border_color: "border-[var(--danger-3)]",
            text_color: "text-[var(--danger-3)]",
            roles: ["admin" ,"manager", "resident"],
            component: <RulesTab/>,
        },
    ];