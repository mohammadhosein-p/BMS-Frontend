import type { BuildingInfo } from "@/types/ruleTypes";
import { MapPin, Map, Mailbox, PlusCircle, Copy, Check } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton";
import { useState } from "react";

interface RulesHeaderProps {
    info: BuildingInfo | null | undefined;
    onOpenMakeRule: () => void;
    isLoading?: boolean;
    hasAdminAccess?: boolean;
}

export default function RulesHeader({ info, onOpenMakeRule, isLoading, hasAdminAccess }: RulesHeaderProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // تابع کپی کردن متن در کلیپ‌بورد
    const handleCopy = (text: string, fieldName: string) => {
        if (!text || text === "-") return;
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        
        // برگشتن آیکون کپی به حالت اول بعد از ۱.۵ ثانیه
        setTimeout(() => {
            setCopiedField(null);
        }, 1500);
    };

    return (
        <div
            dir="rtl"
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-[#f8f8f8] p-4 rounded-2xl border border-neutral-200/60 w-full shrink-0"
        >
            <div className="flex flex-col gap-3 w-full md:w-auto text-right">
                <h1 className="text-xl md:text-2xl font-black text-neutral-800 text-center md:text-right">
                    {isLoading ? "در حال دریافت اطلاعات..." : (info?.name || "نام مجتمع")}
                </h1>

                <div className="flex flex-row flex-wrap items-center gap-x-2 text-sm text-neutral-600 font-medium w-full justify-center md:justify-start">

                    {/* شهر مجتمع */}
                    <div className="flex items-center gap-3 bg-neutral-50/60 border border-none rounded-xl transition-all hover:bg-neutral-50 p-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Map className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[11px] text-neutral-400 font-medium">شهر مجتمع</span>
                            {isLoading ? (
                                <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse mt-1" />
                            ) : (
                                <span className="text-sm text-neutral-800 font-bold truncate">
                                    {info?.city || "-"}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-neutral-50/60 border border-none rounded-xl transition-all hover:bg-neutral-50 p-2 group/btn relative">
                        <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[11px] text-neutral-400 font-medium">آدرس پستی</span>
                            {isLoading ? (
                                <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse mt-1" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="text-sm text-neutral-800 font-bold truncate select-all max-w-[200px] md:max-w-[300px]" 
                                        dir="ltr"
                                    >
                                        {info?.address || "-"}
                                    </span>
                                    {info?.address && (
                                        <button
                                            type="button"
                                            onClick={() => handleCopy(info.address, "address")}
                                            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-md hover:bg-neutral-200/50 cursor-pointer"
                                            title="کپی آدرس"
                                        >
                                            {copiedField === "address" ? (
                                                <Check className="w-3.5 h-3.5 text-green-600 animate-in fade-in zoom-in-75 duration-150" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 justify-center md:justify-start w-full order-3 mt-1 md:mt-0">
                        <div className="flex items-center gap-3 bg-neutral-50/60 border border-none rounded-xl transition-all hover:bg-neutral-50 p-2">
                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                                <Mailbox className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-[11px] text-neutral-400 font-medium">کد پستی (Postal Code)</span>
                                {isLoading ? (
                                    <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse mt-1" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span 
                                            className="text-sm text-neutral-800 font-bold truncate select-all tracking-wider" 
                                            dir="ltr"
                                        >
                                            {info?.postalCode || "-"}
                                        </span>
                                        {info?.postalCode && (
                                            <button
                                                type="button"
                                                onClick={() => handleCopy(info.postalCode, "postalCode")}
                                                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1 rounded-md hover:bg-neutral-200/50 cursor-pointer"
                                                title="کپی کدپستی"
                                            >
                                                {copiedField === "postalCode" ? (
                                                    <Check className="w-3.5 h-3.5 text-green-600 animate-in fade-in zoom-in-75 duration-150" />
                                                ) : (
                                                    <Copy className="w-3.5 h-3.5" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
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