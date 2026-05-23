import type { ReactNode } from "react";

export type ToastVariant = "base" | "success" | "error" | "info" | "warning";

type Props = {
    title: string;
    message: string;
    icon?: ReactNode;
    variant?: ToastVariant;
    className?: string;
};

const VARIANT_STYLES: Record<ToastVariant, string> = {
    base: "border-primary-2 bg-white",
    success: "border-success-op2-3 bg-white",
    error: "border-danger-2 bg-white",
    info: "border-secondary-blue-2 bg-white",
    warning: "border-[#F59E0B] bg-white",
};

const TITLE_TEXT_STYLES: Record<ToastVariant, string> = {
    base: "text-primary-2",
    success: "text-success-op2-2",
    error: "text-danger-2",
    info: "text-secondary-blue-2",
    warning: "text-[#D97706]",
};

const ICON_BG_STYLES: Record<ToastVariant, string> = {
    base: "bg-primary-5 text-primary-1",
    success: "bg-success-op2-5 text-success-op2-1",
    error: "bg-danger-5 text-danger-1",
    info: "bg-secondary-blue-5 text-secondary-blue-1",
    warning: "bg-amber-100 text-amber-600",
};

export default function CustomToast({
    title,
    message,
    icon,
    variant = "base",
    className = "",
}: Props) {
    return (
        <div
            dir="rtl"
            className={`
                flex items-center gap-4 w-full max-w-[400px] p-4 rounded-xl border-2
                backdrop-blur-md pointer-events-auto text-right font-iranyekan
                shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out
                ${VARIANT_STYLES[variant]}
                ${className}
            `.trim()}
        >
            {icon && (
                <div
                    className={`
                        flex items-center justify-center p-2.5 rounded-lg shrink-0 transition-transform duration-200
                        ${ICON_BG_STYLES[variant]}
                    `}
                >
                    {icon}
                </div>
            )}

            <div className="flex-1 min-w-0 space-y-0.5">
                <h4 className={`text-[14px] font-extrabold tracking-tight ${TITLE_TEXT_STYLES[variant]}`}>
                    {title}
                </h4>
                <p className="text-[12px] font-medium text-[#4a4d4a] leading-relaxed break-words opacity-90">
                    {message}
                </p>
            </div>
        </div>
    );
}