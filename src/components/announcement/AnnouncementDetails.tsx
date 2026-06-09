import { ScrollText, X } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "../ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/CustomeDialog";
import type { Announcement } from "@/types/announcementTypes";

interface AnnouncementDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  announcement: Announcement;
}

const tagNameMap: Record<string, string> = {
  Urgent: "فوری",
  Maintenance: "تعمیرات",
  Notice: "اطلاعیه",
  Event: "رویداد",
  Plumbing: "لوله‌کشی",
  Safety: "ایمنی",
};

export function AnnouncementDetails({ open, onOpenChange, announcement }: AnnouncementDetailsProps) {
  const colors = ["bg-red-50", "bg-blue-50", "bg-green-50", "bg-yellow-50", "bg-purple-50", "bg-pink-50", "bg-orange-50", "bg-cyan-50"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent isOpen={open} className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col gap-3" dir="rtl">
        <DialogHeader>
          <div className="flex flex-row justify-between items-center">
            <DialogTitle>جزئیات اطلاعیه</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white bg-red-500">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex flex-row w-fit rounded-xl py-1 px-4 gap-2 bg-secondary">
          <ScrollText />
          <p className="text-md font-bold">{announcement.title}</p>
        </div>

        <div className="border border-border bg-secondary rounded-2xl p-3 overflow-y-auto flex-1">
          <p className="text-sm">
            {announcement.body}
          </p>
        </div>

        <div className="flex flex-row gap-2" dir="ltr">
          {announcement.tags.map((tag, index) => {
            const randomColor = colors[index % colors.length];
            return (
              <div key={tag.id} className={`rounded-3xl px-3 py-1 border border-neutral-3 ${randomColor}`}>
                <p className="text-sm font-medium">{tagNameMap[tag.name] || tag.name}</p>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
