import type { BuildingInfo } from "@/types/ruleTypes";
import { MapPin, Map, Mailbox, PlusCircle } from "lucide-react";

interface RulesHeaderProps {
    info: BuildingInfo | null | undefined;
    onOpenMakeRule: () => void;
    isLoading?: boolean;
    hasAdminAccess?: boolean;
}

export default function RulesHeader({ info, onOpenMakeRule, isLoading, hasAdminAccess }: RulesHeaderProps) {
    return (
        <div 
            dir="rtl" 
            className={`flex bg-neutral-100 p-6 rounded-2xl border border-neutral-200 transition-all
                ${hasAdminAccess ? "justify-between items-center md:items-start" : "justify-center items-center"}
            `}
        >
            
            {/* Building Info */}
            <div className={`flex flex-col gap-4 ${!hasAdminAccess ? "items-center text-center" : ""}`}>
                <h1 className="text-xl md:text-2xl font-black text-neutral-800">
                    {isLoading ? "در حال دریافت اطلاعات..." : (info?.name || "نام مجتمع")}
                </h1>
                
                {/* Address Details */}
                <div className={`hidden md:flex flex-col gap-3 text-sm text-neutral-700 font-medium ${!hasAdminAccess ? "items-center" : ""}`}>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-neutral-600" />
                            <span>آدرس : {isLoading ? "..." : (info?.address || "-")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Map className="w-5 h-5 text-neutral-600" />
                            <span>شهر : {isLoading ? "..." : (info?.city || "-")}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mailbox className="w-5 h-5 text-neutral-600" />
                        <span>کدپستی : {isLoading ? "..." : (info?.postalCode || "-")}</span>
                    </div>
                </div>
            </div>

            {/* Action Button - Only visible for admin/manager */}
            {hasAdminAccess && (
                <div className="flex flex-col gap-5 items-center justify-center h-full shrink-0">
                    <button 
                        onClick={onOpenMakeRule}
                        className="bg-[#de4444] hover:bg-red-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm text-sm md:text-base"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>اضافه کردن قانون</span>
                    </button>
                </div>
            )}

        </div>
    );
}
