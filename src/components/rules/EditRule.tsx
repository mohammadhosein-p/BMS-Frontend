import { useState, useEffect } from "react";
import type { Rule } from "@/types/ruleTypes";
import { Dialog, DialogContent } from "@/components/ui/CustomeDialog";
import { X, Save } from "lucide-react";
import CustomButton from "@/components/ui/CustomeButton";

interface EditRuleProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Rule | null;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function EditRule({ isOpen, onClose, initialData, onSubmit }: EditRuleProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setShowError(false);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            setShowError(true);
            return;
        }

        setShowError(false);
        onSubmit({ title, description });
    };

    const handleClose = () => {
        setShowError(false);
        onClose();
    };

    if (!initialData) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent 
                isOpen={isOpen} 
                className="!p-0 sm:max-w-md border-none"
            >
                <div className="bg-[#20d085] p-4 flex justify-center items-center relative">
                    <h2 className="text-2xl font-extrabold text-white">ویرایش قانون</h2>

                    <button
                        onClick={handleClose}
                        className="absolute right-4 bg-white rounded-full p-1 hover:scale-110 transition-transform shadow-sm"
                    >
                        <X className="w-5 h-5 text-indigo-400" strokeWidth={3} />
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-4 bg-white text-right">

                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setShowError(false);
                        }}
                        placeholder="تیتر قانون"
                        className="w-full border border-[#20d085] rounded-xl p-3 text-right font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#20d085] transition-all dir-rtl"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setShowError(false);
                        }}
                        placeholder="توضیحات"
                        rows={5}
                        className="w-full bg-neutral-100 border-none rounded-xl p-4 text-right text-neutral-700 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#20d085] transition-all dir-rtl"
                    />

                    {showError && (
                        <p className="text-red-500 text-sm font-medium pr-2">
                            عنوان و توضیحات قانون نمی‌تواند خالی باشد.
                        </p>
                    )}

                    <CustomButton
                        variant="success2"
                        icon={Save}
                        onClick={handleSubmit}
                        className="mx-auto mt-2 px-6 py-2.5 w-max shadow-sm"
                    >
                        ذخیره
                    </CustomButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
