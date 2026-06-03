import type { Rule } from "@/types/ruleTypes";
import { Trash2, Edit } from "lucide-react";

interface RuleItemProps {
    rule: Rule;
    onEdit: (rule: Rule) => void;
    onDelete: (id: string) => void;
}

export default function RuleItem({ rule, onEdit, onDelete }: RuleItemProps) {
    return (
        <div className="flex flex-row-reverse items-center justify-between p-4 bg-white rounded-xl border border-neutral-300 shadow-sm mb-3">
            <div className="flex flex-row-reverse items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-neutral-800 font-bold">
                    {rule.ruleNumber}
                </div>
                <div className="text-right">
                    <div className="flex flex-row-reverse items-center gap-2">
                        <h3 className="font-bold text-lg">{rule.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">{rule.category}</span>
                    </div>
                    <p className="text-sm text-neutral-500 mt-1">{rule.description}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={() => onDelete(rule.id)}
                    className="p-2 text-red-500 border border-red-200 rounded-md hover:bg-red-50 flex gap-1 items-center"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => onEdit(rule)}
                    className="p-2 text-green-600 border border-green-200 rounded-md hover:bg-green-50 flex gap-1 items-center"
                >
                    <span className="text-sm font-medium">ویرایش</span>
                    <Edit className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
