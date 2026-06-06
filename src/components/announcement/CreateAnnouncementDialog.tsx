import { Send, X } from "lucide-react";
import CustomButton from "../ui/CustomeButton";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/CustomeDialog";
import CustomField from "../ui/CutsomeFiled";
import SelectOptions from "../ui/SelectOptions/SelectOptions";
import { useState } from "react";
import { useCreateAnnouncement, useAllTags } from "@/hooks/useAnnouncement";
import useAuthStore from "@/store/useAuthStore";
import type { AnnouncementPayload } from "@/types/announcementTypes";

interface AnnouncementCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tagNameMap: Record<string, string> = {
  Urgent: "فوری",
  Maintenance: "تعمیرات",
  Notice: "اطلاعیه",
  Event: "رویداد",
  Plumbing: "لوله‌کشی",
  Safety: "ایمنی",
};


export default function CreateAnnouncementDialog({ open, onOpenChange }: AnnouncementCreateProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<AnnouncementPayload["order"]>("other");
  const [isPinned, setIsPinned] = useState(false);

  const apartment_id = useAuthStore((store) => store.user?.apartment_id);

  const { mutateAsync: createAnnouncement, isPending } = useCreateAnnouncement(apartment_id as string);
  const { data: tagsData, isLoading: tagsLoading } = useAllTags(open);

  const tagOptions = [{ value: "", label: "انتخاب تگ" }, ...(tagsData ?? []).map((tag) => ({ value: tag.id, label: tagNameMap[tag.name] ?? tag.name }))];

  const orderOptions = [
    { value: "very_important", label: "خیلی مهم", color: "red" },
    { value: "warning", label: "هشدار", color: "amber" },
    { value: "important", label: "اطلاعات", color: "blue" },
    { value: "other", label: "متفرقه", color: "gray" },
  ];

  const handleTagChange = (tagId: string) => {
    if (!tagId) return;
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
  };

  const resetForm = () => {
    setTitle("");
    setBody("");
    setSelectedTags([]);
    setSelectedOrder("other");
    setIsPinned(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const payload: AnnouncementPayload = {
      title: title.trim(),
      description: "",
      body: body.trim(),
      order: selectedOrder,
      is_pinned: isPinned,
      expired_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      tag_ids: selectedTags,
    };

    try {
      await createAnnouncement(payload);
      resetForm();
      onOpenChange(false);
    } catch {
      // errors handled by hook's onError toast
    }
  };

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
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </button>
          </DialogClose>

          <DialogTitle className="text-center text-xl font-bold md:text-2xl md:font-extrabold text-white w-full">
            ساخت اعلامیه جدید
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-3 p-6 bg-white">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-neutral-3 block text-right">عنوان:</label>
            <CustomField
              placeholder="عنوان اعلامیه"
              direction="rtl"
              variant="default"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-visible:border-primary-2"
              required
            />
          </div>

          {/* Body */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-neutral-3 block text-right">متن کامل:</label>
            <CustomField
              as="textarea"
              placeholder="متن اعلامیه خود را اینجا بنویسید..."
              direction="rtl"
              variant="default"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="text-sm placeholder:text-sm focus-visible:border-primary-2"
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-3 block text-right">تگ‌ها:</label>
            <SelectOptions
              value=""
              onChange={handleTagChange}
              options={tagsLoading ? [{ value: "", label: "در حال بارگذاری..." }] : (tagOptions as any)}
            />
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1" dir="rtl">
                {selectedTags.map((tagId) => {
                  const tag = tagOptions.find((t) => t.value === tagId);
                  if (!tag) return null;
                  return (
                    <span
                      key={tagId}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-800 border"
                    >
                      {tag.label}
                      <button
                        type="button"
                        onClick={() => handleTagChange(tagId)}
                        className="hover:bg-neutral-200 rounded-full p-0.5 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3 text-neutral-500" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Order */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-3 block text-right">سطح اولویت:</label>
            <SelectOptions
              value={selectedOrder}
              onChange={(val) => setSelectedOrder(val as AnnouncementPayload["order"])}
              options={orderOptions as any}
            />
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
            <CustomButton
              icon={Send}
              type="submit"
              className="ltr h-11 cursor-pointer"
              disabled={isPending || !title.trim() || !body.trim()}
            >
              {isPending ? "در حال ارسال..." : "ثبت اعلامیه"}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
