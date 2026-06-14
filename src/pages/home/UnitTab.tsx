// components/Unit/UnitTab.tsx
import { useMemo, useState } from "react";
import type { ApartmentDataResponse, UnitResponse } from "@/types/unitTypes";
import { PlusCircle, Trash2, CheckCircle2, XCircle, Key, Loader2, AlertCircle } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton";
import CustomToast from '@/components/Custom/CustomToast';
import useAuthStore from '@/store/useAuthStore';
import { translateNumber } from "@/utils/translateNumber";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteUnitService, getApartmentUnitsService } from "@/services/unitService";
import RegisterUnitDialog from "@/components/Unit/RegisterUnitDialog";
import CreateInviteDialog from "@/components/Unit/CreateInviteDialog";

interface UnitsHeaderProps {
    onOpenCreateUnit: () => void;
    hasAdminAccess?: boolean;
}

function UnitsHeader({ onOpenCreateUnit, hasAdminAccess }: UnitsHeaderProps) {
    return (
        <div className="flex flex-row justify-between items-center bg-white p-6 rounded-2xl border border-neutral-200/60 w-full shrink-0 shadow-sm mb-5">
            {hasAdminAccess && (
                <div className="shrink-0">
                    <CustomButton
                        variant="green"
                        icon={PlusCircle}
                        onClick={onOpenCreateUnit}
                        className="px-4 py-2.5 cursor-pointer"
                    >
                        ثبت واحد جدید
                    </CustomButton>
                </div>
            )}
            <div className="flex flex-col gap-1 text-right">
                <h1 className="text-xl md:text-2xl font-black text-neutral-800">
                    مدیریت واحدهای ساختمان
                </h1>
                <p className="text-xs md:text-sm text-neutral-400 font-medium">
                    لیست کامل واحدها، اطلاعات سکونت و عملیات مربوط به هر واحد
                </p>
            </div>
        </div>
    );
}

interface UnitItemProps {
    unit: UnitResponse;
    index: number;
    onEdit: (unit: UnitResponse) => void;
    onDelete: (id: string) => void;
    onGenerateInvite: (unit: UnitResponse) => void; 
    hasAdminAccess?: boolean;
}

function UnitItem({ unit, index, onDelete, onGenerateInvite, hasAdminAccess }: UnitItemProps) {
    const isAssigned = !!unit.user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
                delay: Math.min(index * 0.05, 0.3)
            }}
            dir="rtl"
            className="flex flex-col p-4 bg-white rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors duration-200 group mb-3 gap-4 w-full max-w-full overflow-hidden"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-3 bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-100 shrink-0">
                        <div className="flex items-center gap-1 text-sm text-neutral-700 font-medium">
                            <span>شماره واحد:</span>
                            <span className="font-bold text-neutral-900">{translateNumber(unit.unit_number)}</span>
                        </div>
                        <div className="w-px h-4 bg-neutral-200" />
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                            <span>شماره طبقه:</span>
                            <span className="font-semibold">{translateNumber(unit.floor)}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0 w-full">
                        {isAssigned ? (
                            <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60 w-fit shrink-0">
                                <CheckCircle2 size={14} />
                                <span>تخصیص یافته</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-50 text-rose-600 border border-rose-200/60 w-fit shrink-0">
                                <XCircle size={14} />
                                <span>خالی</span>
                            </div>
                        )}

                        <div className="flex items-center gap-1.5 text-sm text-neutral-600 truncate">
                            <Key size={16} className="text-neutral-400 shrink-0" />
                            <span className="text-neutral-500">صاحب:</span>
                            <span className={`font-bold truncate ${isAssigned ? 'text-neutral-800' : 'text-neutral-400'}`}>
                                {isAssigned ? `${unit.user?.first_name} ${unit.user?.last_name}` : "-"}
                            </span>
                        </div>
                    </div>
                </div>

                {hasAdminAccess && (
                    <div className="flex items-center justify-end gap-2 shrink-0 md:mr-4 w-full md:w-auto">
                        {!isAssigned && (
                            <CustomButton
                                variant="secondary"
                                styleType="outline"
                                onClick={() => onGenerateInvite(unit)}
                            >
                                صدور کد دعوت
                            </CustomButton>
                        )}
                        
                        <CustomButton
                            variant="danger"
                            styleType="outline"
                            onClick={() => onDelete(unit.id)}
                            className="w-10 h-10 rounded-lg cursor-pointer p-0 flex items-center justify-center border-rose-200 text-rose-500 hover:bg-rose-50"
                        >
                            <Trash2 size={18} />
                        </CustomButton>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function UnitTab({ hasAdminAccess = true }: { hasAdminAccess?: boolean }) {
    const queryClient = useQueryClient();
    const apartmentId = useAuthStore((state) => state.user?.apartment_id);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    
    const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
    const [selectedUnitForInvite, setSelectedUnitForInvite] = useState<any>(null);

    const { data: apiApartmentData, isLoading, isError } = useQuery<ApartmentDataResponse>({
        queryKey: ['apartmentUnits', apartmentId],
        queryFn: () => getApartmentUnitsService(apartmentId!),
        enabled: !!apartmentId,
        refetchOnWindowFocus: false,
    });

    const deleteUnitMutation = useMutation({
        mutationFn: deleteUnitService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['apartmentUnits', apartmentId] });
            toast.custom(() => (
                <CustomToast
                    title="عملیات موفق"
                    message="واحد مسکونی مورد نظر با موفقیت حذف شد"
                    variant="success"
                    icon={<CheckCircle2 size={20} />}
                />
            ));
        },
        onError: (error: any) => {
            toast.custom(() => (
                <CustomToast
                    title="خطا در عملیات"
                    message={error?.response?.data?.message || "مشکلی در حذف واحد رخ داده است"}
                    variant="error"
                    icon={<AlertCircle size={20} />}
                />
            ));
        }
    });

    const units = useMemo(() => {
        return Array.isArray(apiApartmentData?.units) ? apiApartmentData.units : [];
    }, [apiApartmentData]);

    const handleOpenCreateUnit = () => {
        setIsCreateOpen(true);
    };

    const handleEditUnit = (unit: UnitResponse) => {
        console.log("ادیت واحد کلیک شد:", unit);
    };

    const handleDeleteUnit = (id: string) => {
        deleteUnitMutation.mutate(id);
    };

    const handleOpenInviteDialog = (unit: UnitResponse) => {
        setSelectedUnitForInvite(unit);
        setIsInviteOpen(true);
    };

    if (!apartmentId && !isLoading) {
        return (
            <div className="w-full px-4 sm:px-6 py-12 flex flex-col items-center justify-center gap-3 text-amber-600 bg-amber-50/50 rounded-2xl border border-amber-200" dir="rtl">
                <AlertCircle size={32} />
                <span className="font-bold">شناسه آپارتمان یافت نشد!</span>
                <p className="text-sm text-gray-500 text-center">حساب کاربری شما به هیچ آپارتمانی متصل نیست.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[570px] flex flex-col p-4">
            <RegisterUnitDialog
                isOpen={isCreateOpen}
                setIsOpen={setIsCreateOpen}
            />

            <CreateInviteDialog
                isOpen={isInviteOpen}
                setIsOpen={setIsInviteOpen}
                unit={selectedUnitForInvite}
                apartmentId={apartmentId}
            />

            <UnitsHeader
                onOpenCreateUnit={handleOpenCreateUnit}
                hasAdminAccess={hasAdminAccess}
            />

            {isError && (
                <div className="mb-4 p-4 rounded-xl text-sm text-rose-600 bg-rose-50 border border-rose-100 flex items-center gap-2 shrink-0">
                    <AlertCircle size={16} />
                    <span>⚠️ ارتباط با سرور برقرار نشد؛ لطفاً وضعیت شبکه خود را بررسی کنید.</span>
                </div>
            )}

            {(isLoading) && (
                <div className="w-full bg-white rounded-2xl border border-neutral-200 p-12 shadow-sm flex flex-col items-center justify-center gap-3 flex-1">
                    <Loader2 className="animate-spin text-emerald-600" size={28} />
                    <span className="text-sm text-neutral-500 font-medium">
                     "در حال دریافت لیست واحدهای ساختمان..."
                    </span>
                </div>
            )}

            {!isLoading && (
                <div className="w-full flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <AnimatePresence>
                        {units.length > 0 ? (
                            units.map((unit, index) => (
                                <UnitItem
                                    key={unit.id}
                                    unit={unit}
                                    index={index}
                                    onEdit={handleEditUnit}
                                    onDelete={handleDeleteUnit}
                                    onGenerateInvite={handleOpenInviteDialog}
                                    hasAdminAccess={hasAdminAccess}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-14 text-neutral-400 border border-dashed border-neutral-200 rounded-2xl bg-white font-medium"
                            >
                                هیچ واحدی در این ساختمان ثبت نشده است.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}