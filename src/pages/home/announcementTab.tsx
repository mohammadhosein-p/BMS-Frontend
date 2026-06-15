import { AnnouncementCard } from "@/components/announcement/AnnouncementCard.tsx";
import { AnnouncementHeader } from "@/components/announcement/AnnouncementHeader.tsx";
import { useAllAnnouncements } from "@/hooks/useAnnouncement";
import useAuthStore from "@/store/useAuthStore";
import type { Announcement } from "@/types/announcementTypes";


export default function AnnouncementTab() {
  const apartment_id = useAuthStore((store) => store.user?.apartment_id);
  const { data } = useAllAnnouncements(apartment_id as any);

  return (
    <div className="flex flex-col w-full h-full min-h-0" dir="rtl">
      <AnnouncementHeader />

      {/* Scrollable Content Area */}
      <div className="flex-1 min-h-0 mx-2 mb-2 md:mx-4 md:mb-4 bg-gray-200 rounded-xl overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar p-2 md:p-4 space-y-3 md:space-y-3">
          {data?.announcements?.map((an: Announcement) => (
            <AnnouncementCard key={an.id} announcement={an} />
          ))}
        </div>
      </div>
    </div>
  );
}
