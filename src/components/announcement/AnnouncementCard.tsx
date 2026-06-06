import CustomButton from "@/components/ui/CustomeButton.tsx";
import { Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import { AnnouncementDetails } from "./AnnouncementDetails";
import { motion } from "framer-motion";
import type { Announcement } from "@/types/announcementTypes";
import { useDeleteAnnouncement } from "@/hooks/useAnnouncement";
import useAuthStore from "@/store/useAuthStore";

const orderColorMap: Record<string, string> = {
  very_important: "bg-red-400",
  warning: "bg-yellow-400",
  important: "bg-green-400", // information
  other: "bg-zinc-400",
};

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const apartment_id = useAuthStore((store) => store.user?.apartment_id);

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
      <div className="flex flex-row gap-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className={`w-2 md:w-5 ${orderColorMap[announcement.order]}`} />

        <div className="flex flex-col gap-1 px-2 md:px-4 py-2 flex-1 min-w-0">
          <div className="flex flex-row gap-2 items-center">
            {announcement.is_pinned && <Pin className="w-4 h-4 text-gray-600" />}
            <p className="font-semibold">{announcement.title}</p>
          </div>
          <p className="text-gray-600 line-clamp-1 text-sm">{announcement.body}</p>
          <p className="text-xs md:text-sm text-gray-500">{new Date(announcement.created_at).toLocaleDateString("fa-IR")}</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center p-2 md:pl-4 gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDeleteClick}
            className="bg-white border-2 p-2 rounded-lg text-danger-2 border-danger-3 flex items-center justify-center transition-colors duration-200"
          >
            <Trash2 size={16} className="text-danger-2" />
          </motion.button>
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
