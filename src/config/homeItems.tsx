export const homeItems: {
    path: string;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    roles: string[];
    component: React.ReactNode;
}[] = [
    {
        path: "",
        title: "اطلاعیه‌ها",
        subtitle: "مدیریت اطلاعیه‌ها",
        icon: "./src/assets/home/sidebar/announcement.png",
        color: "from-[#77BCFF] to-[#2691FF]",
        roles: ["admin", "user"],
        component: <p>announcement</p>,
    },
    {
        path: "voting",
        title: "رای گیری",
        subtitle: "مدیریت رای گیری‌ها",
        icon: "./src/assets/home/sidebar/vote.png",
        color: "from-[#00CF8B] to-[#00A175]",
        roles: ["admin", "user"],
        component: <p>voting</p>,
    },
    {
        path: "ticket",
        title: "تیکت‌ها",
        subtitle: "مدیریت تیکت",
        icon: "./src/assets/home/sidebar/ticket.png",
        color: "from-[#8B95FF] to-[#5D68E6]",
        roles: ["user"],
        component: <p>tickets</p>,
    },
    {
        path: "member",
        title: "اعضا",
        subtitle: "مدیریت اعضا",
        icon: "./src/assets/home/sidebar/member.png",
        color: "from-[#00CF8B] to-[#00A175]",
        roles: ["admin"],
        component: <p>member</p>,
    },
    {
        path: "rules",
        title: "قوانین",
        subtitle: "قوانین ساختمان",
        icon: "./src/assets/home/sidebar/rule.png",
        color: "from-[#EF5350] to-[#B71C1C]",
        roles: ["user"],
        component: <p>rules</p>,
    },
];
