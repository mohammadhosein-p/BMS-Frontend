import type { Rule } from "@/types/ruleTypes";
import { Save } from "lucide-react";
import RuleFormDialog from "./RuleFormDialog";

interface MakeRuleProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function MakeRule({ isOpen, onClose, onSubmit }: MakeRuleProps) {
    return (
        <RuleFormDialog
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="تعریف قانون جدید"
            submitText="ارسال"
            submitIcon={Save}
            buttonVariant="danger"
            headerClassName="bg-red-500"
            closeIconColor="text-red-500"
        />
    );
}