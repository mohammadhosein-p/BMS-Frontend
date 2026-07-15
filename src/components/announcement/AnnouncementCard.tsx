import CustomButton from "@/components/ui/CustomeButton.tsx";
import { Calendar, Pin } from "lucide-react";
import { useState } from "react";
import { AnnouncementDetails } from "./AnnouncementDetails";
import type { Announcement } from "@/types/announcementTypes";
import { useDeleteAnnouncement } from "@/hooks/useAnnouncement";
import useAuthStore from "@/store/useAuthStore";
import { DeleteButton } from "../ui/TrashButton";
import { translateDate } from "@/utils/translateDate";

const orderColorMap: Record<string, string> = {
  very_important: "bg-red-400",
  warning: "bg-yellow-400",
  important: "bg-green-400", // information
  other: "bg-zinc-400",
};

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const apartment_id = useAuthStore((store) => store.user?.apartment_id);
  const isManager = useAuthStore((store) => store.user?.role === "manager");

  const [showDetails, setShowDetails] = useState(false);
  const deleteAnnouncementMutation = useDeleteAnnouncement(apartment_id as any);

  const onDetailClick = () => {
    setShowDetails(true);
  };

  const onDeleteClick = () => {
    deleteAnnouncementMutation.mutate(announcement.id);
  };

  return (
    <>
      <div className="flex flex-row bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className={`w-2 md:w-5 ${orderColorMap[announcement.order]}`} />

        <div className="flex flex-col gap-1 px-2 md:px-4 py-2 flex-1 min-w-0">
          <div className="group flex flex-row items-center gap-2.5">
            {announcement.is_pinned && (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                <Pin className="h-3.5 w-3.5 rotate-45" />
              </div>
            )}
            <p className="font-semibold text-slate-800 transition-colors duration-20">
              {announcement.title}
            </p>
          </div>
          <p className="text-gray-600 line-clamp-1 text-sm wrap-anywhere">{announcement.body}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="h-3.5 w-3.5 stroke-[1.5]" />
            <span className="font-medium tracking-wide">
              {translateDate(announcement.created_at)}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center p-2 md:pl-4 gap-2">
          {isManager && (
            <DeleteButton
              onDelete={onDeleteClick}
              className="bg-white p-2 rounded-lg text-danger-2 border-danger-3 flex items-center justify-center transition-colors duration-200"
              variant="outline"
            />
          )}
          <CustomButton variant="primary" styleType="outline" onClick={onDetailClick}>
            <span className="hidden sm:inline">مشاهده جزئیات</span>
            <span className="sm:hidden">جزئیات</span>
          </CustomButton>
        </div>
      </div>

      <AnnouncementDetails open={showDetails} onOpenChange={setShowDetails} announcement={announcement} />
    </>
  );
}
