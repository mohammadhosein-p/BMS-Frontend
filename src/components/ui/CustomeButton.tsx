import React, { type ReactNode, type ElementType } from 'react';
import { type LucideProps } from 'lucide-react';
import { cn } from "@/lib/utils";
import SendingDots from './SignUp-Login/SendingDots';

type ButtonVariant = 'primary' | 'secondary' | 'green' | 'success1' | 'success2' | 'danger' | 'disabled' | 'dark-gradient';
type StyleType = 'solid' | 'outline' | 'soft';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  styleType?: StyleType;
  children?: ReactNode;
  icon?: ElementType<LucideProps>;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({
    variant = 'primary',
    styleType = 'solid',
    children,
    icon: Icon,
    className,
    disabled,
    isLoading = false,
    loadingText,
    ...props
  }, ref) => {

    const isButtonDisabled = disabled || isLoading || variant === 'disabled';
    const activeVariant = isButtonDisabled ? 'disabled' : variant;

    const variants: Record<ButtonVariant, Record<StyleType, string>> = {
      primary: {
        solid: "bg-primary-2 text-neutral-6 hover:bg-primary-1 border-none",
        outline: "ring-2 ring-inset ring-primary-1 text-primary-1 bg-transparent hover:bg-primary-5/60 border-none",
        soft: "bg-primary-5 text-neutral-1 hover:bg-primary-4/70 border-none",
      },
      secondary: {
        solid: "bg-secondary-blue-3 text-neutral-6 hover:bg-secondary-blue-2 border-none",
        outline: "ring-2 ring-inset ring-secondary-blue-2 text-secondary-blue-2 bg-transparent hover:bg-secondary-blue-5/60 border-none",
        soft: "bg-secondary-blue-5 text-neutral-1 hover:bg-secondary-blue-4 border-none",
      },
      green: {
        solid: "bg-[var(--secondary-green-1)] text-white hover:bg-[var(--secondary-green-2)] border-none",
        outline: "ring-2 ring-inset ring-[var(--secondary-green-1)] text-[var(--secondary-green-1)] bg-transparent hover:bg-[var(--secondary-green-5)] border-none",
        soft: "bg-[var(--secondary-green-5)] text-[var(--secondary-green-1)] hover:bg-[var(--secondary-green-4)] border-none",
      },
      success1: {
        solid: "bg-[var(--success-op1-1)] text-white hover:bg-[var(--success-op1-2)] border-none",
        outline: "ring-2 ring-inset ring-[var(--success-op1-1)] text-[var(--success-op1-1)] bg-transparent hover:bg-[var(--success-op1-5)] border-none",
        soft: "bg-[var(--success-op1-5)] text-[var(--success-op1-1)] hover:bg-[var(--success-op1-4)] border-none",
      },
      success2: {
        solid: "bg-[var(--success-op2-3)] text-white hover:bg-[var(--success-op2-2)] border-none",
        outline: "ring-2 ring-inset ring-[var(--success-op2-3)] text-[var(--success-op2-3)] bg-transparent hover:bg-[var(--success-op2-5)]/50 border-none",
        soft: "bg-[var(--success-op2-5)] text-[var(--success-op2-2)] hover:bg-[var(--success-op2-4)]/70 border-none",
      },
      danger: {
        solid: "bg-[var(--danger-2)] text-white hover:bg-[var(--danger-1)] border-none",
        outline: "ring-2 ring-inset ring-[var(--danger-3)] text-[var(--danger-3)] bg-transparent hover:bg-[var(--danger-5)] border-none",
        soft: "bg-[var(--danger-5)] text-[var(--danger-2)] hover:bg-[var(--danger-4)]/50 border-none",
      },
      disabled: {
        solid: "bg-neutral-4 text-neutral-3 border-none opacity-60 cursor-not-allowed",
        outline: "ring-2 ring-inset ring-neutral-4 text-neutral-3 bg-transparent border-none opacity-60 cursor-not-allowed",
        soft: "bg-neutral-5 text-neutral-3 border-none opacity-60 cursor-not-allowed",
      },
      'dark-gradient': {
        solid: "bg-gradient-to-r from-neutral-800 to-neutral-700 text-neutral-200 border border-neutral-600 shadow-sm hover:from-neutral-700 hover:to-neutral-600 transition-all",
        outline: "ring-2 ring-inset ring-neutral-600 text-neutral-600 bg-transparent hover:bg-neutral-800/10 border-none transition-all",
        soft: "bg-gradient-to-r from-neutral-800 to-neutral-700 text-neutral-200 border border-neutral-600 shadow-sm hover:from-neutral-700 hover:to-neutral-600 transition-all",
      }
    };

    const iconColors: Record<ButtonVariant, Record<StyleType, string>> = {
      primary: { solid: "text-neutral-6 bg-black/12", outline: "text-primary-1", soft: "text-primary-2 bg-white/50" },
      secondary: { solid: "text-neutral-6 bg-black/12", outline: "text-secondary-blue-2", soft: "text-secondary-blue-3 bg-white/50" },
      green: { solid: "text-white bg-black/10", outline: "text-[var(--secondary-green-1)]", soft: "text-[var(--secondary-green-1)]" },
      success1: { solid: "text-white bg-black/10", outline: "text-[var(--success-op1-1)]", soft: "text-[var(--success-op1-1)]" },
      success2: { solid: "text-white bg-black/10", outline: "text-[var(--success-op2-3)]", soft: "text-[var(--success-op2-2)]" },
      danger: { solid: "text-white bg-black/10", outline: "text-[var(--danger-3)]", soft: "text-[var(--danger-2)]" },
      disabled: { solid: "text-neutral-3", outline: "text-neutral-3", soft: "text-neutral-3" },
      'dark-gradient': { solid: "text-neutral-300", outline: "text-neutral-600", soft: "text-neutral-300" }
    };

    return (
      <button
        ref={ref}
        disabled={isButtonDisabled}
        className={cn(
          "inline-flex items-center text-sm justify-center gap-2 rounded-xl font-iranyekan font-extrabold transition-all duration-200 active:scale-[0.98] shrink-0 transform-gpu backface-hidden min-h-10 py-2 px-4 w-max select-none whitespace-nowrap",
          variants[activeVariant][styleType],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <SendingDots text={loadingText} />
        ) : (
          <>
            {Icon && (
              <span className={cn(
                "flex items-center justify-center rounded-sm order-first transition-all",
                (styleType === 'outline' || activeVariant === 'dark-gradient') ? "p-0" : "p-1",
                iconColors[activeVariant][styleType]
              )}>
                <Icon size={(styleType === 'outline' || activeVariant === 'dark-gradient') ? 20 : 16} className="shrink-0" />
              </span>
            )}
            <span className="leading-none">{children}</span>
          </>
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;