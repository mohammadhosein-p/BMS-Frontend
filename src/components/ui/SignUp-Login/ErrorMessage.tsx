import { motion, AnimatePresence } from "framer-motion";

interface ErrorMessageProps {
  message?: string | null;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          key="error-message"
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            text-xs text-danger-2 bg-danger-5/10
            p-2 rounded-lg border border-danger-2/20
          "
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
