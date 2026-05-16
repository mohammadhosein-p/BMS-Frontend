import { Outlet } from "react-router-dom";
import SidebarContent from "./SidebarContent";
import MobileSidebar from "./MobileSidebar";

function HomePageLayout() {
    return (
        <div className="h-screen bg-green-100 p-4">
            <div className="flex flex-row-reverse gap-4 h-full">
                {/* Sidebar */}
                <aside className="flex-1 shrink-0 bg-white rounded-3xl p-4 shadow hidden md:block">
                    <SidebarContent />
                </aside>

                {/* Main Section */}
                <main className="flex-4 lg:flex-5 flex flex-col gap-4 min-h-0">
                    {/* Header */}
                    <header className="h-20 shrink-0 bg-red-600 rounded-3xl flex items-center justify-between p-4">
                        <p>header</p>
                        <MobileSidebar />
                    </header>

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
