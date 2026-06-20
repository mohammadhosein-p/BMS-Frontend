import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion"; 
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailsButtonProps extends HTMLMotionProps<"button"> {
  onClick: () => void;
  iconSize?: number;
  variant?: "light" | "outline" | "indigo";
}

export const DetailsButton: React.FC<DetailsButtonProps> = ({
  onClick,
  iconSize = 18,
  variant = "light", 
  className,
  title = "مشاهده جزئیات",
  ...props 
}) => {
  const iconVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.07, transition: { duration: 0.2 } }
  };

  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.92, y: 0.5 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={title}
      className={cn(
        "relative flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out",
        "cursor-pointer select-none active:scale-95 active:duration-75",
        
        variant === "light" && "bg-indigo-50/50 border border-indigo-100 p-2.5 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20 active:bg-indigo-600",
        
        variant === "outline" && "bg-transparent border-2 border-indigo-200 p-2.5 text-indigo-500 hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/5",
        
        variant === "indigo" && "bg-indigo-500 p-2.5 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30",
        
        className
      )}
      {...props}
    >
      <motion.div
        variants={iconVariants}
        className="flex items-center justify-center"
      >
        <Info size={iconSize} />
      </motion.div>
    </motion.button>
  );
};
