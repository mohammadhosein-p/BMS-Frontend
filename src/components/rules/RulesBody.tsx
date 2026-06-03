import type { Rule } from "@/types/ruleTypes";
import RuleItem from "./RuleItem";

interface RulesBodyProps {
    rules: Rule[];
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}

export default function RulesBody({ rules, onEdit, onDelete }: RulesBodyProps) {
    if (rules.length === 0) {
        return <div className="text-center p-8 text-neutral-500">هیچ قانونی ثبت نشده است.</div>;
    }

    return (
        <div className="mt-4">
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
