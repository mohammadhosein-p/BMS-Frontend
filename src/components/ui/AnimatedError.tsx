import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedError({ message }: { message?: string }) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <p className="text-xs text-danger-2 text-right">
                        {message}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
