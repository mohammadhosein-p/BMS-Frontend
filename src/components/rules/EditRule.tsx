import { useState, useEffect } from "react";
import type { Rule } from "@/types/ruleTypes";
import { Dialog, DialogContent } from "@/components/ui/CustomeDialog";
import { X, Save } from "lucide-react";

interface EditRuleProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: Rule | null;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function EditRule({ isOpen, onClose, initialData, onSubmit }: EditRuleProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showError, setShowError] = useState(false); // اضافه شدن استیت خطا

    // پر کردن فیلدها زمانی که دیتای اولیه لود می‌شود
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setShowError(false); // ریست کردن خطا هنگام لود دیتای جدید
        }
    }, [initialData]);

    const handleSubmit = () => {
        // بررسی خالی بودن فیلدها و نمایش خطا
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
                // استفاده از !p-0 برای حذف پدینگ پیش‌فرض CustomDialog تا هدر کامل بچسبد
                className="!p-0 sm:max-w-md border-none"
            >
                {/* هدر */}
                <div className="bg-[#20d085] p-4 flex justify-center items-center relative">
                    <h2 className="text-2xl font-extrabold text-white">ویرایش قانون</h2>
                    
                    {/* دکمه خروج سمت چپ */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 bg-white rounded-full p-1 hover:scale-110 transition-transform shadow-sm"
                    >
                        <X className="w-5 h-5 text-indigo-400" strokeWidth={3} />
                    </button>
                </div>

                {/* بدنه */}
                <div className="p-6 flex flex-col gap-4 bg-white text-right">
                    {/* فیلد عنوان */}
                    <input
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setShowError(false); // مخفی کردن خطا هنگام تایپ
                        }}
                        placeholder="تیتر قانون"
                        className="w-full border border-[#20d085] rounded-xl p-3 text-right font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#20d085] transition-all dir-rtl"
                    />
                    
                    {/* فیلد توضیحات */}
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            setShowError(false); // مخفی کردن خطا هنگام تایپ
                        }}
                        placeholder="توضیحات"
                        rows={5}
                        className="w-full bg-neutral-100 border-none rounded-xl p-4 text-right text-neutral-700 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#20d085] transition-all dir-rtl"
                    />

                    {/* نمایش پیام خطا */}
                    {showError && (
                        <p className="text-red-500 text-sm font-medium pr-2">
                            عنوان و توضیحات قانون نمی‌تواند خالی باشد.
                        </p>
                    )}

                    {/* دکمه ذخیره */}
                    <button
                        onClick={handleSubmit}
                        className="bg-[#20d085] hover:bg-[#1bb875] text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto mt-2 transition-colors w-max shadow-sm"
                    >
                        <Save className="w-5 h-5" />                        
                        <span>ذخیره</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
