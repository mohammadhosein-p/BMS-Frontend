import React, { type ReactNode, useState } from "react";
import { cn } from "../../lib/utils";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type FieldVariant = "default" | "success" | "error" | "disabled";
type Direction = "rtl" | "ltr";

interface CustomFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  variant?: FieldVariant;
  icon?: ReactNode; 
  suffixIcon?: ReactNode;
  containerClassName?: string;
  direction?: Direction; 
  as?: "input" | "textarea";
}

const CustomField = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, CustomFieldProps>(
  (
    {
      label,
      variant = "default",
      icon,
      suffixIcon,
      className,
      containerClassName,
      type,
      direction = "rtl", 
      as = "input", 
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const isPassword = type === "password";
    const isRtl = direction === "rtl";

    const variantStyles: Record<FieldVariant, string> = {
      default: "border-neutral-4 bg-neutral-5 text-neutral-1",
      success: "border-success-op2-2 text-success-op2-2 focus:text-neutral-1 shadow-[0_0_0_4px_var(--color-success-op2-5)]",
      error: "border-danger-2 bg-danger-5/30 text-danger-2 focus:text-neutral-1 shadow-[0_0_0_4px_var(--color-danger-5)]",
      disabled: "border-neutral-3 bg-neutral-4 opacity-70 cursor-not-allowed",
    };

    const inputType = isPassword ? (isVisible ? 'text' : 'password') : type;

    const sharedClassName = cn(
      "w-full rounded-xl border transition-all duration-200",
      "shadow-none outline-none",
      "placeholder:text-neutral-3/60",
      "focus-visible:ring-0",
      "focus-visible:border-primary-1",
      "focus-visible:shadow-[0_0_0_4px_var(--color-primary-5)]",
      "focus-visible:bg-neutral-6",
      variantStyles[variant],
      
      isRtl ? (icon ? "pr-10" : "pr-4") : (icon ? "pl-10" : "pl-4"),
      isRtl ? ((isPassword || suffixIcon) ? "pl-12" : "pl-4") : ((isPassword || suffixIcon) ? "pr-12" : "pr-4"),
      
      "text-right",
      !isRtl && "text-left",
      as === "input" ? "h-11" : "p-3 min-h-[120px] resize-none custom-scrollbar", 
      className
    );

    return (
      <div
        className={cn("w-full space-y-1.5", containerClassName)}
        dir={direction}
      >
        {label && (
          <label className={cn(
            "block text-sm font-iranyekan font-medium text-neutral-2",
            isRtl ? "mr-1" : "ml-1" 
          )}>
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className={cn(
              "absolute z-10 text-neutral-3",
              isRtl ? "right-3" : "left-3",
              as === "textarea" && "top-3"
            )}>
              {icon}
            </div>
          )}

          {as === "textarea" ? (
            <textarea
              ref={ref as any}
              disabled={variant === "disabled" || props.disabled}
              className={sharedClassName}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <Input
              ref={ref as any}
              type={inputType}
              disabled={variant === "disabled" || props.disabled}
              className={sharedClassName}
              {...props}
            />
          )}

          <div className={cn(
            "absolute inset-y-0 flex items-center justify-center w-12",
            isRtl ? "left-0" : "right-0",
            as === "textarea" && "top-3 bottom-auto" 
          )}>
            {isPassword ? (
              <button
                type="button" 
                onClick={() => setIsVisible(prevState => !prevState)}
                className='w-full h-full text-neutral-3/70 hover:text-neutral-1 flex items-center justify-center transition-colors'
              >
                {isVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
              </button>
            ) : (
              suffixIcon && (
                <div className="text-neutral-3">
                  {suffixIcon}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
);

CustomField.displayName = "CustomField";

export default CustomField;