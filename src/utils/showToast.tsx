import CustomToast from "@/components/Custom/CustomToast";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const showErrorToast = (message: string) => {
    toast.custom(() => (
        <CustomToast
            title="خطا"
            message={message}
            variant="error"
            icon={<AlertCircle size={20} />}
        />
    ));
};

export const showSuccessToast = (message: string) => {
    toast.custom(() => (
        <CustomToast
            title="موفق"
            message={message}
            variant="success"
            icon={<CheckCircle2 size={20} />}
        />
    ));
};
