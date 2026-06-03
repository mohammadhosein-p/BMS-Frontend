import { useState } from "react";
import type { Rule, BuildingInfo } from "@/types/ruleTypes";
import { mockRules , mockBuildingInfo } from "@/mock/rulesMock";

// ایمپورت کامپوننت های خرد شده
import RulesHeader from "@/components/rules/RulesHeader";
import RulesBody from "@/components/rules/RulesBody";
import MakeRule from "@/components/rules/MakeRule";
import EditRule from "@/components/rules/EditRule";
import DeleteRuleConfirm from "@/components/rules/DeleteRuleConfirm";

export default function RulesTab() {
    // State ها
    const [rules, setRules] = useState<Rule[]>(mockRules);
    const [buildingInfo] = useState<BuildingInfo>(mockBuildingInfo);
    
    // State های مربوط به مودال‌ها
    const [isMakeRuleOpen, setIsMakeRuleOpen] = useState(false);
    const [editRuleState, setEditRuleState] = useState<{isOpen: boolean, data: Rule | null}>({ isOpen: false, data: null });
    const [deleteRuleState, setDeleteRuleState] = useState<{isOpen: boolean, id: string | null}>({ isOpen: false, id: null });
    
    // هندلرها
    const handleDeleteClick = (id: string) => {
        // به جای پاک کردن مستقیم، مودال تایید را باز می‌کنیم
        setDeleteRuleState({ isOpen: true, id });
    };

    const confirmDelete = () => {
        // پاک کردن واقعی قانون
        if (deleteRuleState.id) {
            setRules(prev => prev.filter(r => r.id !== deleteRuleState.id));
        }
        setDeleteRuleState({ isOpen: false, id: null });
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
        <div className="flex flex-col h-full gap-4 p-4 bg-neutral-100 overflow-hidden">
            <RulesHeader
                onOpenMakeRule={() => setIsMakeRuleOpen(true)}
                info={buildingInfo}
            />
            
            <RulesBody 
                rules={rules} 
                onEdit={(rule) => setEditRuleState({ isOpen: true, data: rule })} 
                onDelete={handleDeleteClick}
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

            {/* مودال تایید حذف */}
            <DeleteRuleConfirm
                isOpen={deleteRuleState.isOpen}
                onClose={() => setDeleteRuleState({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
