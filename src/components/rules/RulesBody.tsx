import type { Rule } from "@/types/ruleTypes";
import RuleItem from "./RuleItem";

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
        <div className="flex-1 overflow-y-auto pl-2 pr-1 space-y-3 
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:bg-neutral-300 
                        [&::-webkit-scrollbar-thumb]:rounded-full">
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
        </div>
    );
}
