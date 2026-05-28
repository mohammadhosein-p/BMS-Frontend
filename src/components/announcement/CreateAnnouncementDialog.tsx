import { Send, X } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/CustomeDialog";
import CustomField from "../ui/CutsomeFiled";
import SelectOptions from "../ui/SelectOptions/SelectOptions";
import { useState } from "react";

export default function CreateAnnouncementDialog({ open, onOpenChange }) {
  const [selectedTag, setSelectedTag] = useState("general");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [isPinned, setIsPinned] = useState(false);

  const tagOptions = [
    { value: "general", label: "عمومی", color: "gray" },
    { value: "important", label: "مهم", color: "red" },
    { value: "event", label: "رویداد", color: "blue" },
    { value: "update", label: "بروزرسانی", color: "green" },
  ];

  const priorityOptions = [
    { value: "low", label: "کم", color: "gray" },
    { value: "medium", label: "متوسط", color: "yellow" },
    { value: "high", label: "زیاد", color: "orange" },
    { value: "urgent", label: "فوری", color: "red" },
  ];

  const onSubmit = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent isOpen={open} className="max-w-md rounded-3xl p-0 overflow-auto bg-white">
        {/* Header */}
        <DialogHeader className="relative bg-indigo-500 text-white px-14 py-5 m-0 flex flex-col items-center justify-center">
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-1.5 hover:bg-white/30 transition-all cursor-pointer border-none outline-none"
              aria-label="Close"
              onClick={onOpenChange}
            >
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
          </DialogClose>

          <DialogTitle className="text-center text-xl font-bold md:text-2xl md:font-extrabold text-white w-full">
            ساخت اعلامیه جدید
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-2 p-6 bg-white">
          <div className="space-y-1">
            <CustomField placeholder="عنوان" direction="rtl" variant="default" className="focus-visible:border-primary-2" />
          </div>

          <div className="space-y-1">
            <CustomField
              as="textarea"
              placeholder="متن اعلامیه خود را اینجا بنویسید..."
              direction="rtl"
              variant="default"
              className="text-sm placeholder:text-sm focus-visible:border-primary-2"
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-3 block text-right">سطح اولویت:</label>

            <SelectOptions value={selectedPriority} onChange={setSelectedPriority} options={priorityOptions as any} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-3 block text-right">تگ:</label>

            <SelectOptions value={selectedTag} onChange={setSelectedTag} options={tagOptions as any} />
          </div>


          {/* Pin Checkbox */}
          <div className="flex items-center justify-start gap-2 rounded-2xl">
            <input
              id="pinned"
              type="checkbox"
              checked={isPinned}
              onChange={(e) => setIsPinned(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-indigo-500"
            />
            <label htmlFor="pinned" className="text-sm font-bold text-neutral-3 cursor-pointer">
              پین شدن اعلامیه
            </label>
          </div>

          <div className="flex justify-center pt-2">
            <CustomButton icon={Send} className="ltr h-11 cursor-pointer" disabled={false}>
              ثبت اعلامیه
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
