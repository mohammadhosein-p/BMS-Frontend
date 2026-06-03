import { useState } from "react";
import type { Rule } from "@/types/ruleTypes";
import { mockRules } from "@/mock/rulesMock";

// ایمپورت کامپوننت های خرد شده
import RulesHeader from "@/components/rules/RulesHeader";
import RulesBody from "@/components/rules/RulesBody";
import MakeRule from "@/components/rules/MakeRule";
import EditRule from "@/components/rules/EditRule";

export default function RulesTab() {
    // State ها
    const [rules, setRules] = useState<Rule[]>(mockRules);
    const [isMakeRuleOpen, setIsMakeRuleOpen] = useState(false);
    const [editRuleState, setEditRuleState] = useState<{isOpen: boolean, data: Rule | null}>({ isOpen: false, data: null });

    // هندلرها
    const handleDelete = (id: string) => {
        if(window.confirm("آیا از حذف این قانون مطمئن هستید؟")) {
            setRules(prev => prev.filter(r => r.id !== id));
        }
    };

    const handleCreateSubmit = (data: Partial<Rule>) => {
        console.log("Create data:", data);
        setIsMakeRuleOpen(false);
    };

    const handleEditSubmit = (data: Partial<Rule>) => {
        console.log("Edit data:", data);
        setEditRuleState({ isOpen: false, data: null });
    };

    return (
        <div className="flex flex-col h-full gap-4 p-4 bg-neutral-100 overflow-y-auto">
            <RulesHeader onOpenMakeRule={() => setIsMakeRuleOpen(true)} />
            
            <RulesBody 
                rules={rules} 
                onEdit={(rule) => setEditRuleState({ isOpen: true, data: rule })} 
                onDelete={handleDelete} 
            />

            <MakeRule 
                isOpen={isMakeRuleOpen} 
                onClose={() => setIsMakeRuleOpen(false)} 
                onSubmit={handleCreateSubmit} 
            />

            <EditRule 
                isOpen={editRuleState.isOpen}
                onClose={() => setEditRuleState({ isOpen: false, data: null })}
                initialData={editRuleState.data}
                onSubmit={handleEditSubmit}
            />
        </div>
    );
}
