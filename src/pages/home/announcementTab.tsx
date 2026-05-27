import { AnnouncementCard } from "@/components/announcement/AnnouncementCard.tsx";
import { AnnouncementHeader } from "@/components/announcement/AnnouncementHeader.tsx";
import { useState } from "react";

export default function AnnouncementTab() {
  return (
    <div className="flex flex-col w-full h-full" dir="rtl">
      <AnnouncementHeader />

      {/* Scrollable Content Area */}
      <div className="flex-1 mx-4 mb-4 bg-gray-200 rounded-xl overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar p-4 space-y-4">
          <AnnouncementCard color="red" title="title" content="description" created="created" isPinned={true} />
          <AnnouncementCard color="green" title="title" content="description" created="created" />
          <AnnouncementCard color="yellow" title="title" content="description" created="created" />
          <AnnouncementCard color="yellow" title="title" content="description" created="created" />
          <AnnouncementCard color="red" title="title" content="description" created="created" />
          <AnnouncementCard color="green" title="title" content="description" created="created" />
          <AnnouncementCard color="yellow" title="title" content="description" created="created" />
        </div>
      </div>
    </div>
  );
}
