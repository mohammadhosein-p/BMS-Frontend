import type { Rule } from "@/types/ruleTypes";
import { Save } from "lucide-react";
import RuleFormDialog from "./RuleFormDialog";

interface EditRuleProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Rule | null;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function EditRule({ isOpen, onClose, initialData, onSubmit }: EditRuleProps) {
    if (!initialData) return null;

    return (
        <RuleFormDialog
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            initialData={initialData}
            title="ویرایش قانون"
            submitText="ذخیره"
            submitIcon={Save}
            buttonVariant="success2"
            headerClassName="bg-success-op2-3"
            closeIconColor="text-success-op2-3"
        />
    );
}