import React, { type ReactNode, type ElementType } from 'react';
import { type LucideProps } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant = 'primary' | 'secondary' | 'disabled';
type StyleType = 'solid' | 'outline' | 'soft';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  styleType?: StyleType;
  children?: ReactNode;
  icon?: ElementType<LucideProps>;
  className?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    variant = 'primary', 
    styleType = 'solid', 
    children, 
    icon: Icon, 
    className, 
    disabled,
    ...props 
  }, ref) => {
    
    const activeVariant = disabled || variant === 'disabled' ? 'disabled' : variant;

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
      disabled: {
        solid: "bg-neutral-4 text-neutral-3 border-none",
        outline: "ring-2 ring-inset ring-neutral-4 text-neutral-3 bg-transparent border-none",
        soft: "bg-neutral-5 text-neutral-3 border-none",
      },
    };

    const iconColors: Record<ButtonVariant, Record<StyleType, string>> = {
      primary: {
        solid: "text-neutral-6 bg-black/12",
        outline: "text-primary-1",
        soft: "text-primary-2 bg-white/50",
      },
      secondary: {
        solid: "text-neutral-6 bg-black/12",
        outline: "text-secondary-blue-2",
        soft: "text-secondary-blue-3 bg-white/50", 
      },
      disabled: {
        solid: "text-neutral-3",
        outline: "text-neutral-3",
        soft: "text-neutral-3",
      }
    };

    return (
      <Button
        ref={ref}
        disabled={activeVariant === 'disabled'}
        dir="rtl"
        className={cn(
          "flex items-center justify-center gap-3 rounded-xl font-iranyekan font-extrabold transition-all duration-200 active:scale-[0.97] shrink-0 transform-gpu backface-hidden h-auto py-2 px-4",
          variants[activeVariant][styleType],
          className
        )}
        {...props}
      >
        <span className="leading-none">{children}</span>
        {Icon && (
          <span className={cn(
            "flex items-center justify-center rounded-lg p-1.5",
            iconColors[activeVariant][styleType]
          )}>
            <Icon size={18} />
          </span>
        )}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;