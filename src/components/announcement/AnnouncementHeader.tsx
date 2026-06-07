import { Separator } from "@/components/ui/separator.tsx";
import CustomButton from "../ui/CustomeButton";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateAnnouncementDialog from "./CreateAnnouncementDialog";
import useAuthStore from "@/store/useAuthStore";

export function AnnouncementHeader() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const isManager = useAuthStore((store) => store.user?.role === "manager");

  const onCreateClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-3 py-3 px-3 md:py-4 md:px-4 text-2xl font-semibold">
      <div className="flex flex-col border-2 p-1 border-gray-200 rounded-xl">
        <p className="text-center text-sm font-bold">جدول رنگ ها</p>
        <Separator className="h-0.5 w-[95%] self-center mb-2" />

        <div className="flex flex-row flex-wrap justify-around rounded-md gap-y-1">
          <div className="flex flex-row gap-1 px-1 sm:px-2 md:px-4">
            <p className="text-sm">اضطراری</p>
            <div className="self-center w-8 md:w-10 h-4 ring-1 ring-red-600/30 rounded-md bg-red-400" />
          </div>

          <Separator orientation="vertical" className="hidden sm:block w-0.5 h-4/5 self-center" />

          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">اطلاع رسانی</p>
            <div className="self-center w-8 md:w-10 h-4 ring-1 ring-green-600/30 rounded-md bg-green-400" />
          </div>

          <Separator orientation="vertical" className="hidden sm:block w-0.5 h-4/5 self-center" />

          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">هشدار</p>
            <div className="self-center w-8 md:w-10 h-4 ring-1 ring-yellow-600/30 rounded-md bg-yellow-400" />
          </div>

          <Separator orientation="vertical" className="hidden sm:block w-0.5 h-4/5 self-center" />

          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">متفرقه</p>
            <div className="self-center w-8 md:w-10 h-4 ring-1 ring-gray-600/30 rounded-md bg-gray-400" />
          </div>
        </div>
      </div>

      {isManager && (
        <CustomButton icon={PlusCircle} className="h-13 cursor-pointer self-center w-full md:w-auto" onClick={onCreateClick}>
          ثبت اعلامیه جدید
        </CustomButton>
      )}

      <CreateAnnouncementDialog open={showCreateForm} onOpenChange={onCreateClick} />
    </div>
  );
}
