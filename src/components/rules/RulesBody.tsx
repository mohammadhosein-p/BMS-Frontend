import type { Rule } from "@/types/ruleTypes";
import RuleItem from "./RuleItem";

interface RulesBodyProps {
    rules: Rule[];
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}

export default function RulesBody({ rules, onEdit, onDelete }: RulesBodyProps) {
    if (rules.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 text-neutral-500">
                هیچ قانونی ثبت نشده است.
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto pl-2 pr-1 space-y-3 
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:bg-neutral-300 
                        [&::-webkit-scrollbar-thumb]:rounded-full">
            {rules.map((rule) => (
                <RuleItem 
                    key={rule.id} 
                    rule={rule} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}
