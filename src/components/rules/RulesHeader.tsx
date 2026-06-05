import type { BuildingInfo } from "@/types/ruleTypes";
import { MapPin, Map, Mailbox, PlusCircle } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton";

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
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-[#f8f8f8] p-6 rounded-2xl border border-neutral-200/60 w-full shrink-0"
        >
            <div className="flex flex-col gap-3 w-full md:w-auto text-right">
                <h1 className="text-xl md:text-2xl font-black text-neutral-800 text-center md:text-right">
                    {isLoading ? "در حال دریافت اطلاعات..." : (info?.name || "نام مجتمع")}
                </h1>
                
                <div className="flex flex-row flex-wrap items-center gap-y-2.5 gap-x-6 text-sm text-neutral-600 font-medium w-full justify-center md:justify-start">
                    
                    <div className="flex items-center gap-1.5 justify-center md:justify-start order-1 md:order-2">
                        <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span className="text-neutral-700">آدرس:</span>
                        <span className="text-neutral-800 font-bold" dir="ltr">
                            {isLoading ? "..." : (info?.address || "-")}
                        </span>
                    </div>
                    
                    {/* شهر */}
                    <div className="flex items-center gap-1.5 justify-center md:justify-start order-2 md:order-1">
                        <Map className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span className="text-neutral-700">شهر:</span>
                        <span className="text-neutral-800 font-bold">
                            {isLoading ? "..." : (info?.city || "-")}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 justify-center md:justify-start w-full order-3 mt-1 md:mt-0">
                        <Mailbox className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span className="text-neutral-700">کدپستی:</span>
                        <span className="text-neutral-800 font-bold" dir="ltr">
                            {isLoading ? "..." : (info?.postalCode || "-")}
                        </span>
                    </div>
                </div>
            </div>

            {hasAdminAccess && (
                <div className="w-full md:w-auto pt-4 md:pt-0 border-t border-neutral-200/40 md:border-none flex justify-center md:justify-end shrink-0">
                    <CustomButton 
                        variant="danger"
                        icon={PlusCircle}
                        onClick={onOpenMakeRule}
                        className="shadow-sm w-full md:w-auto px-5 py-2.5 cursor-pointer justify-center text-sm md:text-base font-bold rounded-xl"
                    >
                        اضافه کردن قانون
                    </CustomButton>
                </div>
            )}
        </div>
    );
}