import { AnnouncementCard } from "@/components/announcement/AnnouncementCard.tsx";
import { AnnouncementHeader } from "@/components/announcement/AnnouncementHeader.tsx";
import { useAllAnnouncements } from "@/hooks/useAnnouncement";
import useAuthStore from "@/store/useAuthStore";
import type { Announcement } from "@/types/announcementTypes";


export default function AnnouncementTab() {
  const apartment_id = useAuthStore((store) => store.user?.apartment_id);

  console.log(apartment_id);

  const { data } = useAllAnnouncements(apartment_id as any);
  console.log(data);

  return (
    <div className="flex flex-col w-full h-full" dir="rtl">
      <AnnouncementHeader />

      {/* Scrollable Content Area */}
      <div className="flex-1 mx-4 mb-4 bg-gray-200 rounded-xl overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar p-4 space-y-4">
          {data?.announcements?.map((an: Announcement) => (
            <AnnouncementCard key={an.id} announcement={an} />
          ))}
        </div>
      </div>
    </div>
  );
}
