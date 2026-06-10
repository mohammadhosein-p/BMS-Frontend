import type { Rule } from "@/types/ruleTypes";
import { Trash2 } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton"; 
import { translateNumber } from "@/utils/translateNumber";
import { motion } from "framer-motion";

interface RuleItemProps {
    rule: Rule;
    index: number;
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
    hasAdminAccess?: boolean;
}

export default function RuleItem({ rule, index, onEdit, onDelete, hasAdminAccess }: RuleItemProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
                duration: 0.35, 
                ease: "easeOut",
                delay: Math.min(index * 0.05, 0.3) 
            }}
            dir="rtl"
            className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 shadow-sm hover:border-danger-2 transition-colors duration-200 group mb-2 gap-4 w-full max-w-full overflow-hidden"
        >
            <div className="flex flex-row items-start md:items-center gap-4 flex-1 min-w-0 w-full">
                
                <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold text-xl shrink-0 border-danger-3 text-danger-2`}>
                    {translateNumber(index + 1)}
                </div>
                
                <div className="flex flex-col flex-1 min-w-0 text-right w-full">
                    <div className="flex justify-start items-center gap-2 mb-1 w-full">
                        <h3 className="font-bold text-neutral-800 text-base md:text-lg break-all whitespace-normal w-full">
                            {rule.title}
                        </h3>
                    </div>
                    
                    <p className="text-sm text-neutral-500 break-all whitespace-normal w-full">
                        {rule.description}
                    </p>
                </div>
            </div>

            {/* Action buttons */}
            {hasAdminAccess && (
                <div className="flex items-center justify-end md:justify-end gap-1 shrink-0 mt-4 md:mt-0 w-full md:w-auto md:mr-4">
                    <CustomButton
                        variant="success2"
                        styleType="outline"
                        onClick={() => onEdit(rule)}
                        className="h-10 rounded-lg cursor-pointer"
                    >
                        ویرایش
                    </CustomButton>

                    <CustomButton
                        variant="danger"
                        styleType="outline"
                        onClick={() => onDelete(rule.id!)}
                        className="w-10 h-10 rounded-lg cursor-pointer"
                    >
                        <Trash2 size={20}/>
                    </CustomButton>
                </div>
            )}
        </motion.div>
    );
}