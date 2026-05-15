import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { colorStyles } from "./SelectOptionsColorStyles";

interface Option {
  value: string;
  label: string;
  color: keyof typeof colorStyles;
  className?: string;
  disabled?: boolean; 
}

interface SelectOptionsProps {
  value: string;
  onChange?: (val: string) => void;
  className?: string;
  options: Option[];
  disabled?: boolean;
}

export default function SelectOptions({ value, onChange, className, options, disabled }: SelectOptionsProps) {
  const selected = options.find((opt) => opt.value === value) || options[0];
  const styles = colorStyles[selected?.color] || colorStyles.gray;

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative w-full" dir="rtl">
        <ListboxButton
          className={`
            relative w-full flex items-center justify-between 
            bg-white border border-gray-200 rounded-xl 
            pl-3 pr-4 py-3 text-sm font-bold
            transition-all duration-200 outline-none
            border-r-[6px] 
            
            /* 3. Added visual styles for disabled state */
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer hover:bg-gray-50"}
            
            ${styles.buttonText} ${styles.buttonBorder} ${styles.buttonBg}
            ${className}
          `}
        >
          {({ open }) => (
            <>
              <span className="block truncate">{selected?.label}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <ChevronDown size={18} />
              </motion.span>
            </>
          )}
        </ListboxButton>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            className="
              absolute z-50 mt-2 max-h-60 w-full overflow-auto bg-white 
              border border-gray-100 rounded-2xl p-2 
              shadow-xl shadow-black/5
              list-none outline-none
            "
          >
            {options.map((opt) => {
              const optStyles = colorStyles[opt.color] || colorStyles.gray;

              return (
                <ListboxOption
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={`
                    group relative flex items-center px-4 py-3 rounded-md transition-colors text-right text-sm
                    
                    /* 5. Logic for styling disabled vs active options */
                    data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed data-[disabled]:grayscale-[0.5]
                    data-[focus]:outline-none
                    ${!opt.disabled ? "cursor-pointer" : ""}
                    ${optStyles.optionFocusBg} ${optStyles.optionFocusText}
                    ${optStyles.optionSelectedBg} ${optStyles.optionSelectedText}
                    data-[selected]:font-bold
                    text-neutral-3
                  `}
                >
                  <span className="block truncate">{opt.label}</span>
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}