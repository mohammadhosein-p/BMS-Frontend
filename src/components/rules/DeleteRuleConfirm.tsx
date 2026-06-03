import { Dialog, DialogContent } from "@/components/ui/CustomeDialog";
import CustomButton from "@/components/ui/CustomeButton";
import { X, Trash2 } from "lucide-react";

interface DeleteRuleConfirmProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteRuleConfirm({ isOpen, onClose, onConfirm }: DeleteRuleConfirmProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
            <DialogContent isOpen={isOpen} className="!p-0 sm:max-w-sm border-none">
                {/* هدر */}
                <div className="bg-red-500 p-4 flex justify-center items-center relative">
                    <h2 className="text-xl font-bold text-white">حذف قانون</h2>
                    
                    <button
                        onClick={onClose}
                        className="absolute right-4 bg-white rounded-full p-1 hover:scale-110 transition-transform shadow-sm"
                    >
                        <X className="w-5 h-5 text-red-500" strokeWidth={3} />
                    </button>
                </div>

                {/* بدنه */}
                <div className="p-6 flex flex-col gap-6 bg-white text-center">
                    <p className="text-neutral-800 font-semibold text-lg dir-rtl">
                        آیا از حذف این قانون مطمئن هستید؟
                    </p>

                    {/* دکمه‌ها */}
                    <div className="flex justify-center gap-3 dir-rtl mt-2">

                        <CustomButton
                            variant="danger"
                            styleType="solid"
                            icon={Trash2}
                            onClick={onConfirm}
                            className="px-6 shadow-sm"
                        >
                            بله
                        </CustomButton>

                        <CustomButton
                            onClick={onClose}
                            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-700 border-none ring-0 px-6 shadow-sm"
                        >
                            انصراف
                        </CustomButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
