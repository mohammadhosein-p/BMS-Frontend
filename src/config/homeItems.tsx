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
        path: "test",
        title: "اطلاعیه‌ها",
        subtitle: "مدیریت اطلاعیه‌ها",
        icon: "./src/assets/home/sidebar/announcement.png",
        color: "from-[#77BCFF] to-[#2691FF]",
        roles: ["admin", "user"],
        component: <p>test</p>,
    },
];
