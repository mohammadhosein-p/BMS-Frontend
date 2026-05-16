import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import SidebarContent from "./SidebarContent";

function MobileSidebar() {
    return (
        <div className="transition-all">
            <Sheet>
                <SheetTrigger asChild>
                    <button className=" p-2 rounded-xl border bg-white lg:hidden">
                        <Menu />
                    </button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[280px] p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default MobileSidebar;
