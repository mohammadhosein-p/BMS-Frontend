import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

import type { Rule } from "@/types/ruleTypes";
import type { AxiosBackendError } from "@/types/apiTypes";
import useAuthStore from "@/store/useAuthStore";

import {
    getRulesService,
    createRuleService,
    updateRuleService,
    deleteRuleService,
    getApartmentInfoService
} from "@/services/ruleServices";

// Child components
import RulesHeader from "@/components/rules/RulesHeader";
import RulesBody from "@/components/rules/RulesBody";
import MakeRule from "@/components/rules/MakeRule";
import EditRule from "@/components/rules/EditRule";
import DeleteRuleConfirm from "@/components/rules/DeleteRuleConfirm";
import CustomToast from "@/components/Custom/CustomToast";

export default function RulesTab() {
    const queryClient = useQueryClient();
    
    // Extract apartment_id and role from user store
    const user = useAuthStore(state => state.user);
    const apartmentId = user?.apartment_id;
    const role = user?.role;
    
    // Check if user has admin/manager privileges
    const hasAdminAccess = role === "manager" || role === "admin";

    // Modal states
    const [isMakeRuleOpen, setIsMakeRuleOpen] = useState(false);
    const [editRuleState, setEditRuleState] = useState<{isOpen: boolean, data: Rule | null}>({ isOpen: false, data: null });
    const [deleteRuleState, setDeleteRuleState] = useState<{isOpen: boolean, id: string | null}>({ isOpen: false, id: null });
    
    // 1. Fetch Apartment Info
    const { data: apartmentResponse, isLoading: isApartmentLoading } = useQuery({
        queryKey: ['apartment', apartmentId],
        queryFn: () => getApartmentInfoService(apartmentId!),
        enabled: !!apartmentId,
    });

    // Safe mapping with fallback values
    const rawApartmentData = apartmentResponse?.data;
    const buildingInfo = {
        name: rawApartmentData?.name || "-",
        address: rawApartmentData?.address || "-",
        city: rawApartmentData?.city || "-",
        postalCode: rawApartmentData?.postal_code || "-"
    };
    
    // 2. Fetch Rules List
    const { data: rulesResponse, isLoading: isRulesLoading } = useQuery({
        queryKey: ['rules', apartmentId],
        queryFn: () => getRulesService(apartmentId!),
        enabled: !!apartmentId,
    });

    // Support both standard and wrapped response structures
    const rules = rulesResponse?.data || rulesResponse?.data || [];

    // 3. Create Rule
    const createMutation = useMutation({
        mutationFn: (data: Partial<Rule>) => {
            const payload = { ...data, category: "other" } as any;
            return createRuleService(apartmentId!, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rules', apartmentId] });
            setIsMakeRuleOpen(false);
            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="قانون جدید با موفقیت اضافه شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: AxiosBackendError) => {
            toast.custom(() => (
                <CustomToast
                    title="خطا در ثبت"
                    message={error?.response?.data?.message || "مشکلی در افزودن قانون رخ داد"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    // 4. Update Rule
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Rule> }) => {
            const payload = { ...data, category: "other" } as any;
            return updateRuleService(apartmentId!, id, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rules', apartmentId] });
            setEditRuleState({ isOpen: false, data: null });
            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="قانون با موفقیت ویرایش شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
            
        },
        onError: (error: AxiosBackendError) => {
            toast.custom(() => (
                <CustomToast
                    title="خطا در ویرایش"
                    message={error?.response?.data?.message || "مشکلی در ویرایش قانون رخ داد"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    // 5. Delete Rule
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteRuleService(apartmentId!, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rules', apartmentId] });
            setDeleteRuleState({ isOpen: false, id: null });
            toast.custom(() => (
                <CustomToast
                    title="موفقیت‌آمیز"
                    message="قانون با موفقیت حذف شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: AxiosBackendError) => {
            setDeleteRuleState({ isOpen: false, id: null });
            toast.custom(() => (
                <CustomToast
                    title="خطا در حذف"
                    message={error?.response?.data?.message || "مشکلی در حذف قانون رخ داد"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    // Handlers
    const handleDeleteClick = (id: string) => {
        setDeleteRuleState({ isOpen: true, id });
    };

    // Guard against missing apartmentId
    const confirmDelete = () => {
        if (!apartmentId) return;
        if (deleteRuleState.id) {
            deleteMutation.mutate(deleteRuleState.id);
        }
    };

    const handleCreateSubmit = (data: Partial<Rule>) => {
        if (!apartmentId) return;
        createMutation.mutate(data);
    };

    const handleEditSubmit = (data: Partial<Rule>) => {
        if (!apartmentId) return;
        if (editRuleState.data?.id) {
            updateMutation.mutate({ id: editRuleState.data.id, data });
        }
    };

    return (
        <div className="flex flex-col h-full gap-4 p-4 bg-neutral-100 overflow-hidden">
            <RulesHeader
                onOpenMakeRule={() => setIsMakeRuleOpen(true)}
                info={buildingInfo}
                isLoading={isApartmentLoading}
                hasAdminAccess={hasAdminAccess}
            />
            
            <RulesBody 
                rules={rules} 
                onEdit={(rule) => setEditRuleState({ isOpen: true, data: rule })} 
                onDelete={handleDeleteClick}
                isLoading={isRulesLoading}
                hasAdminAccess={hasAdminAccess}
            />

            {/* Modals are conditionally rendered or logic handled, but safe to keep mounted */}
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

            <DeleteRuleConfirm
                isOpen={deleteRuleState.isOpen}
                onClose={() => setDeleteRuleState({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
