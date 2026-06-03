import type { Rule } from "@/types/ruleTypes";

interface MakeRuleProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<Rule>) => void;
}

export default function MakeRule({ isOpen, onClose, onSubmit }: MakeRuleProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
                <div className="bg-red-500 p-4 flex flex-row-reverse justify-between items-center text-white">
                    <h2 className="text-xl font-bold">تعریف قانون جدید</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200">✕</button>
                </div>
                <div className="p-4 flex flex-col gap-4 text-right">
                    <input placeholder="تیتر قانون" className="w-full border rounded-lg p-2 text-right dir-rtl" />
                    <textarea placeholder="توضیحات" rows={4} className="w-full border rounded-lg p-2 text-right dir-rtl" />
                    <select className="w-full border rounded-lg p-2 text-right dir-rtl text-blue-500">
                        <option>قوانین عمومی</option>
                    </select>
                    <button 
                        onClick={() => onSubmit({})} 
                        className="bg-red-500 w-32 mx-auto py-2 rounded-xl text-white font-bold"
                    >
                        ارسال
                    </button>
                </div>
            </div>
        </div>
    );
}
