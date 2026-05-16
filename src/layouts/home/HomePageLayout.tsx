import { Outlet } from "react-router-dom";
import SidebarContent from "../../components/home/SidebarContent";
import HomeHeader from "@/components/home/HomeHeader";

function HomePageLayout() {
    return (
        <div className="h-screen bg-white p-4">
            <div className="flex flex-row-reverse gap-4 h-full">
                {/* Sidebar */}
                <aside className="flex-1 shrink-0 border border-neutral-4/80 bg-white rounded-3xl p-4 shadow-wm hidden md:block">
                    <SidebarContent />
                </aside>

                {/* Main Section */}
                <main className="flex-3 lg:flex-5 flex flex-col gap-4 min-h-0">
                    {/* Header */}
                    <HomeHeader />

                    {/* Outlet Container */}
                    <section className="flex-1 min-h-0 bg-white rounded-3xl p-6 shadow overflow-auto">
                        <Outlet />
                    </section>
                </main>
            </div>
        </div>
    );
}

export default HomePageLayout;
