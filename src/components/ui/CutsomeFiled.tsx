import React, { type ReactNode, useState, useRef } from "react";
import { cn } from "../../lib/utils";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon, Smile } from 'lucide-react';

type FieldVariant = "default" | "success" | "error" | "disabled";
type Direction = "rtl" | "ltr";

const POPULAR_EMOJIS = [
  "😂", "❤️", "🤣", "👍", "😭", "🙏", "😘", "🥰", "😍", "😊",
  "🎉", "😁", "💕", "🥺", "😅", "🔥", "☺️", "🤦‍♂️", "🤦‍♀️", "🤷‍♂️",
  "🌹", "🤔", "👏", "💘", "👌", "😜", "😎", "✨", "💙", "🌸",
  "👀", "🙄", "📢", "🙌", "💔", "😑", "👑", "✔️", "💯", "🚀",
];

interface CustomFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  variant?: FieldVariant;
  icon?: ReactNode; 
  suffixIcon?: ReactNode;
  containerClassName?: string;
  direction?: Direction; 
  as?: "input" | "textarea";
  withEmoji?: boolean;
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
      withEmoji = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const isPassword = type === "password";
    const isRtl = direction === "rtl";
    const hasSuffix = isPassword || suffixIcon || withEmoji;

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
      isRtl ? (hasSuffix ? "pl-12" : "pl-4") : (hasSuffix ? "pr-12" : "pr-4"),
      
      "text-right",
      !isRtl && "text-left",
      as === "input" ? "h-11" : "p-3 min-h-[120px] resize-none custom-scrollbar", 
      className
    );

    // مدیریت کلیک روی اموجی و درج هوشمند آن
    const handleEmojiSelect = (emoji: string) => {
      const input = internalRef.current;
      if (!input) return;

      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const text = input.value;
      
      const newText = text.substring(0, start) + emoji + text.substring(end);
      input.value = newText;

      if (onChange) {
        const event = {
          target: input,
          currentTarget: input
        } as React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;
        onChange(event);
      }

      input.focus();
      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    };

    const setRef = (node: HTMLInputElement & HTMLTextAreaElement) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>).current = node;
      }
    };

    return (
      <div className={cn("w-full space-y-1.5 z-0", containerClassName)} dir={direction}>
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
              ref={setRef}
              disabled={variant === "disabled" || props.disabled}
              className={sharedClassName}
              onChange={onChange}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <Input
              ref={setRef}
              type={inputType}
              disabled={variant === "disabled" || props.disabled}
              className={sharedClassName}
              onChange={onChange}
              {...props}
            />
          )}

          <div className={cn(
            "absolute inset-y-0 flex items-center justify-center w-12 z-20",
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
              </button>
            ) : withEmoji ? (
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={cn(
                  'w-full h-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110',
                  showEmojiPicker ? 'text-primary-1' : 'text-neutral-3/70 hover:text-neutral-1'
                )}
              >
                <Smile size={20} />
              </button>
            ) : (
              suffixIcon && (
                <div className="text-neutral-3">
                  {suffixIcon}
                </div>
              )
            )}
          </div>

          {withEmoji && showEmojiPicker && (
            <>
              <div className="fixed inset-0 z-30 " onClick={() => setShowEmojiPicker(false)} />
              <div className={cn(
                "absolute z-40 w-64 bg-neutral-6 border border-neutral-4/60 rounded-2xl shadow-xl p-3 animate-in fade-in zoom-in-95 duration-150",
                "bottom-full mb-2.5", 
                isRtl ? "left-0" : "right-0"
              )}>
                <div className="text-[11px] font-medium text-neutral-3/80 mb-2 px-1 select-none text-right">
                  اموجی‌های پرکاربرد
                </div>
                
                <div className="grid grid-cols-8 max-h-40 overflow-y-auto custom-scrollbar justify-items-center">
                  {POPULAR_EMOJIS.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="w-7 h-7 flex items-center justify-center text-lg rounded-lg hover:bg-neutral-200 transition-colors duration-100 select-none active:scale-90"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

CustomField.displayName = "CustomField";

export default CustomField;