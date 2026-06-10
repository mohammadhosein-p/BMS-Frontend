import type { Rule } from "@/types/ruleTypes";
import RuleItem from "./RuleItem";
import { AnimatePresence } from "framer-motion";

interface RulesBodyProps {
    rules: Rule[];
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
    isLoading?: boolean;
    hasAdminAccess?: boolean;
}

export default function RulesBody({ rules, onEdit, onDelete, isLoading, hasAdminAccess }: RulesBodyProps) {
    
    // Loading state
    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 text-neutral-500">
                در حال دریافت قوانین...
            </div>
        );
    }

    // Empty state
    if (!rules || rules.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 text-neutral-500">
                هیچ قانونی ثبت نشده است.
            </div>
        );
    }

    // Rules list
    return (
        <div className="flex-1 overflow-y-auto pt-2 pb-2 pl-2 pr-1 space-y-3 custom-scrollbar -mt-2 w-full max-w-full">
            <AnimatePresence mode="popLayout">
                {rules.map((rule, index) => (
                    <RuleItem 
                        key={rule.id} 
                        rule={rule}
                        index={index}
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        hasAdminAccess={hasAdminAccess}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
