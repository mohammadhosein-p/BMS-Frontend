import type { BuildingInfo } from "@/types/ruleTypes";
import { MapPin, Map, Mailbox, User, PlusCircle } from "lucide-react";

interface RulesHeaderProps {
    info: BuildingInfo;
    onOpenMakeRule: () => void;
}

export default function RulesHeader({ info, onOpenMakeRule }: RulesHeaderProps) {
    return (
        <div dir="rtl" className="flex justify-between items-center md:items-start bg-neutral-100 p-6 rounded-2xl border border-neutral-200">
            
            {/* سمت راست: اطلاعات مجتمع */}
            <div className="flex flex-col gap-4">
                <h1 className="text-xl md:text-2xl font-black text-neutral-800">
                    {info.name}
                </h1>
                
                {/* جزئیات آدرس - در موبایل مخفی (hidden) و در دسکتاپ نمایش داده می‌شود (md:flex) */}
                <div className="hidden md:flex flex-col gap-3 text-sm text-neutral-700 font-medium">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-neutral-600" />
                            <span>آدرس : {info.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Map className="w-5 h-5 text-neutral-600" />
                            <span>شهر : {info.city}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mailbox className="w-5 h-5 text-neutral-600" />
                        <span>کدپستی : {info.postalCode}</span>
                    </div>
                </div>
            </div>

            {/* سمت چپ: دکمه و اطلاعات مدیر */}
            <div className="flex flex-col gap-5 items-center">
                {/* باکس مدیریت - در موبایل مخفی و در دسکتاپ نمایش داده می‌شود */}
                <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="bg-black text-white p-1 rounded-full">
                         <User className="w-4 h-4 fill-current" />
                    </div>
                    <span className="text-sm font-bold text-neutral-800">
                        مدیریت : {info.managerName}
                    </span>
                </div>
                
                {/* دکمه اضافه کردن */}
                <button 
                    onClick={onOpenMakeRule}
                    className="bg-[#de4444] hover:bg-red-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm text-sm md:text-base"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>اضافه کردن قانون</span>
                </button>
            </div>

        </div>
    );
}
