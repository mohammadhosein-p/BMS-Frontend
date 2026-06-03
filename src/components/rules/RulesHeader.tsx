interface RulesHeaderProps {
    onOpenMakeRule: () => void;
}

export default function RulesHeader({ onOpenMakeRule }: RulesHeaderProps) {
    return (
        <div className="flex flex-row-reverse justify-between items-start bg-white p-4 rounded-xl border">
            <div className="text-right">
                <h1 className="text-2xl font-bold mb-2">مجتمع ساختمانی ممد</h1>
                <div className="text-sm text-neutral-600 flex flex-row-reverse gap-4">
                    <span>آدرس: خیابان ممدی...</span>
                    <span>شهر: تهران</span>
                </div>
            </div>
            
            <button 
                onClick={onOpenMakeRule}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold flex gap-2 items-center transition-colors"
            >
                <span>اضافه کردن قانون</span>
                <span className="text-xl">+</span>
            </button>
        </div>
    );
}
