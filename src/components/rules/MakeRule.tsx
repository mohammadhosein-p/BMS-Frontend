import { useState } from "react";
import type { Rule } from "@/types/ruleTypes";
import { Dialog, DialogContent } from "@/components/ui/CustomeDialog";
import { X, Save } from "lucide-react";

interface MakeRuleProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function MakeRule({ isOpen, onClose, onSubmit }: MakeRuleProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showError, setShowError] = useState(false); // اضافه شدن استیت خطا

    const handleSubmit = () => {
        // بررسی خالی بودن فیلدها و نمایش خطا
        if (!title.trim() || !description.trim()) {
            setShowError(true);
            return; 
        }
        
        setShowError(false); // مخفی کردن خطا در صورت درست بودن مقادیر
        onSubmit({ title, description });
        
        // پاک کردن فیلدها بعد از ارسال
        setTitle("");
        setDescription("");
    };

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setShowError(false); // پاک کردن خطا هنگام خروج
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent 
                isOpen={isOpen} 
                className="!p-0 sm:max-w-md border-none"
            >
                {/* هدر */}
                <div className="bg-red-500 p-4 flex justify-center items-center relative">
                    <h2 className="text-2xl font-extrabold text-white">تعریف قانون جدید</h2>
                    
                    {/* دکمه خروج سمت چپ */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 bg-white rounded-full p-1 hover:scale-110 transition-transform shadow-sm"
                    >
                        <X className="w-5 h-5 text-red-500" strokeWidth={3} />
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
                        className="w-full border border-red-200 rounded-xl p-3 text-right font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all dir-rtl"
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
                        className="w-full bg-neutral-100 border-none rounded-xl p-4 text-right text-neutral-700 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition-all dir-rtl"
                    />

                    {/* نمایش پیام خطا */}
                    {showError && (
                        <p className="text-red-500 text-sm font-medium pr-2">
                            عنوان و توضیحات قانون نمی‌تواند خالی باشد.
                        </p>
                    )}

                    {/* دکمه ارسال */}
                    <button
                        onClick={handleSubmit}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto mt-2 transition-colors w-max shadow-sm"
                    >
                        <Save className="w-5 h-5" />
                        <span>ارسال</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
