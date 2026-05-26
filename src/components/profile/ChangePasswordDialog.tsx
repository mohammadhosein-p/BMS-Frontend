import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
} from '@/components/ui/CustomeDialog';
import { KeyRound, LockKeyholeIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import CustomField from "../ui/CutsomeFiled";
import CustomButton from "../ui/CustomeButton";
import CustomToast from '../Custom/CustomToast';

import { changePasswordService } from '@/services/userService'; 

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [fieldError, setFieldError] = useState("");

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordService,
    onSuccess: () => {
      setNewPassword("");
      setFieldError("");
      onClose();

      toast.custom((t) => (
        <CustomToast
          title="موفقیت‌آمیز"
          message="رمز عبور شما با موفقیت تغییر یافت"
          variant="success"
          icon={<CheckCircle2 size={20} />}
        />
      ));
    },
    onError: (error: any) => {
      toast.custom((t) => (
        <CustomToast
          title="خطا در عملیات"
          message={error?.response?.data?.message || "مشکلی در تغییر رمز عبور رخ داده است"}
          variant="error"
          icon={<AlertCircle size={20} />}
        />
      ));
    }
  });

  const handleSave = () => {
    if (newPassword.length < 6) {
      setFieldError("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setFieldError("");
    changePasswordMutation.mutate(newPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (fieldError) setFieldError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open && !changePasswordMutation.isPending) onClose(); }}>
      <DialogContent isOpen={isOpen} className="w-[95%] max-w-sm p-8 rounded-3xl">
        <div className="flex flex-col items-center gap-6" dir="rtl">
          
          <div className="w-20 h-20 rounded-2xl bg-success-op2-5 flex items-center justify-center text-success-op2-3 border border-success-op2-5/50">
            <LockKeyholeIcon size={36} strokeWidth={2.5} />
          </div>

          <DialogTitle className="text-xl font-black text-neutral-800">
            تغییر رمز عبور
          </DialogTitle>

          <div className="w-full flex flex-col">
            <CustomField
              placeholder="رمز عبور جدید را وارد کنید"
              type="password"
              value={newPassword}
              onChange={handleInputChange}
              disabled={changePasswordMutation.isPending} 
              icon={<KeyRound size={18} />}
              className="w-full text-center"
              variant={fieldError ? "error" : "default"}
            />
            {fieldError && (
              <span className="text-red-500 text-xs mt-1 px-1 font-medium">{fieldError}</span>
            )}
          </div>

          <CustomButton
            variant="success2"
            styleType="solid"
            className="w-full h-12 rounded-xl text-base font-bold"
            onClick={handleSave}
            disabled={newPassword.length < 6 || changePasswordMutation.isPending} 
          >
            {changePasswordMutation.isPending ? "در حال ذخیره‌سازی..." : "ذخیره رمز جدید"}
          </CustomButton>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;