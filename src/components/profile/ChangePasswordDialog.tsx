import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
} from '@/components/ui/CustomeDialog';
import { KeyRound, LockKeyholeIcon } from "lucide-react";
import CustomField from "../ui/CutsomeFiled";
import CustomButton from "../ui/CustomeButton";

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    console.log("رمز عبور جدید:", newPassword);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent isOpen={isOpen} className="w-[95%] max-w-sm p-8 rounded-3xl">
        <div className="flex flex-col items-center gap-6" dir="rtl">
          
          <div className="w-20 h-20 rounded-2xl bg-success-op2-5 flex items-center justify-center text-success-op2-3 border border-success-op2-5/50">
                <LockKeyholeIcon size={36} strokeWidth={2.5} />
          </div>

          <DialogTitle className="text-xl font-black text-neutral-800">
            تغییر رمز عبور
          </DialogTitle>

          <div className="w-full">
            <CustomField
              placeholder="رمز عبور جدید را وارد کنید"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              icon={<KeyRound size={18} />}
              className="w-full text-center"
            />
          </div>

          <CustomButton
            variant="success2"
            styleType="solid"
            className="w-full h-12 rounded-xl text-base font-bold"
            onClick={handleSave}
            disabled={newPassword.length < 6}
          >
            ذخیره رمز جدید
          </CustomButton>
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;