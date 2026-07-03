import { Dialog, DialogContent } from "@/components/ui/CustomeDialog";
import CustomButton from "@/components/ui/CustomeButton";
import { X } from "lucide-react";

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TicketDeleteConfirm({ isOpen, onClose, onConfirm }: Prop) {
  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent isOpen={isOpen} className="p-0! sm:max-w-sm border-none">
        <div className="bg-primary-2 p-4 flex justify-center items-center relative">
          <h2 className="text-xl font-bold text-white">حذف تیکت</h2>

          <button onClick={onClose} className="absolute right-4 bg-white rounded-full p-1 hover:scale-110 transition-transform shadow-sm">
            <X className="w-5 h-5 text-danger-3" strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 bg-white text-center">
          <p className="text-neutral-800 font-semibold text-lg dir-rtl">آیا از حذف این تیکت مطمئن هستید؟</p>

          <div className="flex justify-center gap-3 dir-rtl mt-2">
            <CustomButton variant="danger" styleType="solid" onClick={() => { onConfirm();  onClose()}} className="w-20 cursor-pointer">
              بله
            </CustomButton>

            <CustomButton variant="dark-gradient" styleType="outline" onClick={onClose} className="w-20 cursor-pointer">
              انصراف
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
