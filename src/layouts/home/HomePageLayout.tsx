import { Outlet } from "react-router-dom";
import SidebarContent from "../../components/home/SidebarContent";
import HomeHeader from "@/components/home/HomeHeader";

function HomePageLayout() {
    return (
        <div className="h-screen bg-white p-4">
            <div className="flex flex-row-reverse gap-4 h-full">
                
                <aside className="w-[260px] shrink-0 border border-neutral-4/80 bg-white rounded-2xl pt-2 px-2 shadow-sm hidden lg:block">
                    <SidebarContent />
                </aside>

                <main className="flex-1 flex flex-col gap-4 min-h-0">
                    {/* Header */}
                    <HomeHeader />

                    {/* Outlet Container */}
                    <section className="flex-1 min-h-0 bg-white rounded-2xl p-6 shadow-sm border border-neutral-4/80 overflow-auto">
                        <Outlet />
                    </section>
                </main>

            </div>
        </div>
    );
}

export default HomePageLayout;