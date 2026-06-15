import React from "react";
import { motion, type HTMLMotionProps, AnimatePresence } from "framer-motion"; 
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps extends HTMLMotionProps<"button"> {
  onDelete: () => void;
  isLoading?: boolean;
  iconSize?: number;
  variant?: "light" | "outline" | "danger";
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  isLoading = false,
  iconSize = 18,
  variant = "light", 
  className,
  title = "حذف",
  ...props 
}) => {
  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: [0, -10, 10, -5, 5, 0], scale: 1.05, transition: { duration: 0.4 } }
  };

  return (
    <motion.button
      type="button"
      initial="rest"
      whileHover={isLoading ? "rest" : "hover"}
      whileTap={isLoading ? "rest" : { scale: 0.92, y: 1 }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoading) onDelete();
      }}
      disabled={isLoading}
      title={title}
      className={cn(
        "relative flex items-center justify-center rounded-xl font-medium transition-all duration-300 ease-out",
        "cursor-pointer select-none active:scale-95 active:duration-75",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none",
        
        variant === "light" && "bg-red-50/50 border border-red-100 p-2.5 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:bg-red-600",
        
        variant === "outline" && "bg-transparent border-2 border-red-200 p-2.5 text-red-500 hover:bg-red-50 hover:border-red-500 hover:shadow-md hover:shadow-red-500/5",
        
        variant === "danger" && "bg-red-500 p-2.5 text-white shadow-md shadow-red-500/20 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30",
        
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Loader2 size={iconSize} className="animate-spin tracking-widest opacity-80" />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            variants={iconVariants}
            className="flex items-center justify-center"
          >
            <Trash2 size={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};