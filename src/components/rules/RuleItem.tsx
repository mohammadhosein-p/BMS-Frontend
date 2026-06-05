import type { Rule } from "@/types/ruleTypes";
import { Trash2 } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton"; 
import { translateNumber } from "@/utils/translateNumber";

interface RuleItemProps {
    rule: Rule;
    index: number;
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
    hasAdminAccess?: boolean;
}

export default function RuleItem({ rule, index, onEdit, onDelete, hasAdminAccess }: RuleItemProps) {
    return (
        <div className="flex flex-col md:flex-row-reverse md:items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-primary-3 transition-colors group mb-3">
            
            <div className="flex flex-row-reverse items-start md:items-center gap-4 w-full">
                
                {/* Index circle */}
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-xl shrink-0 ${!hasAdminAccess ? 'border-primary-3 text-primary-2' : 'border-danger-3 text-danger-2'}`}>
                    {translateNumber(index + 1)}
                </div>
                
                {/* Rule content */}
                <div className="flex flex-col w-full text-right">
                    <div className="flex justify-end items-center gap-2 mb-1">
                        <h3 className="font-bold text-neutral-800 text-base md:text-lg">
                            {rule.title}
                        </h3>
                    </div>
                    
                    <p className="text-sm text-neutral-500">
                        {rule.description}
                    </p>
                </div>
            </div>

            {/* Action buttons - Only visible for admin/manager */}
            {hasAdminAccess && (
                <div className="flex items-center justify-start md:justify-end gap-3 shrink-0 mt-4 md:mt-0 w-full md:w-auto md:mr-8">
                    <CustomButton
                        variant="success2"
                        styleType="outline"
                        onClick={() => onEdit(rule)}
                        className="!px-5 md:!px-7 !py-2 md:!py-2.5 h-10 md:h-11 text-sm md:text-base font-bold rounded-xl"
                    >
                        ویرایش
                    </CustomButton>

                    <CustomButton
                        variant="danger"
                        styleType="outline"
                        onClick={() => onDelete(rule.id!)}
                        className="w-10 h-10 md:w-11 md:h-11 !p-0 flex items-center justify-center rounded-xl"
                    >
                        <Trash2/>
                    </CustomButton>
                </div>
            )}
        </div>
    );
}
