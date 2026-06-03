import type { Rule } from "@/types/ruleTypes";
import { Trash2 } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton"; // املای دقیق فایل خودتان را چک کنید

interface RuleItemProps {
    rule: Rule;
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}

export default function RuleItem({ rule, onEdit, onDelete }: RuleItemProps) {
    return (
        // با استفاده از flex-row-reverse کل چیدمان را معکوس کردیم تا دکمه‌ها راست و شماره چپ قرار بگیرد
        <div className="flex flex-row-reverse items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-secondary-blue-3 transition-colors group mb-3">
            
            {/* بخش سمت چپ: دایره شماره و متن */}
            <div className="flex flex-row-reverse items-start md:items-center gap-4 w-full">
                
                {/* دایره شماره (چپ‌ترین قسمت) */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-[1.5px] border-neutral-800 text-neutral-800 font-bold text-lg shrink-0">
                    {rule.ruleNumber}
                </div>
                
                {/* بخش متون */}
                <div className="flex flex-col w-full text-right">
                    {/* ردیف عنوان و تگ */}
                    <div className="flex justify-end items-center gap-2 mb-1">
                        {/* عنوان (قرارگیری در سمت راست تگ) */}
                        <h3 className="font-bold text-neutral-800 text-base md:text-lg">
                            {rule.title}
                        </h3>
                    </div>
                    
                    {/* توضیحات */}
                    <p className="text-sm text-neutral-500">
                        {rule.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 mr-4 md:mr-8">
                {/* دکمه ویرایش (بزرگ‌تر و کشیده‌تر) */}
                <CustomButton
                    variant="success2"
                    styleType="outline"
                    onClick={() => onEdit(rule)}
                    className="!px-5 md:!px-7 !py-2 md:!py-2.5 h-10 md:h-11 text-sm md:text-base font-bold rounded-xl"
                >
                    ویرایش
                </CustomButton>

                {/* دکمه حذف (مربعی، کمی بزرگ‌تر و آیکون کاملاً وسط‌چین) */}
                <CustomButton
                    variant="danger"
                    styleType="outline"
                    onClick={() => onDelete(rule.id)}
                    className="w-10 h-10 md:w-11 md:h-11 !p-0 flex items-center justify-center rounded-xl"
                >
                <Trash2/>
                </CustomButton>
            </div>

            
        </div>
    );
}
