import { Separator } from "@/components/ui/separator.tsx";
import CustomButton from "../ui/CustomeButton";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateAnnouncementDialog from "./CreateAnnouncementDialog";

export function AnnouncementHeader() {
    const [showCreateForm, setShowCreateForm] = useState(false)


    const onCreateClick = () => {
    setShowCreateForm(!showCreateForm);
  }

  return (
    <div className="flex flex-row justify-between py-4 px-4 text-2xl font-semibold">

      <div className="flex flex-col border-2 p-1 border-gray-200 rounded-xl">
        <p className="text-center text-sm font-bold">جدول رنگ ها</p>
        <Separator className="h-0.5 w-[95%] self-center mb-2" />

        <div className="flex flex-row justify-around rounded-md">
          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">اضطراری</p>
            <div className="self-center w-10 h-4 ring-1 ring-red-600/30 rounded-md bg-red-400" />
          </div>

          <Separator orientation="vertical" className="w-0.5 h-4/5 self-center" />

          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">اطلاع رسانی</p>
            <div className="self-center w-10 h-4 ring-1 ring-green-600/30 rounded-md bg-green-400" />
          </div>

          <Separator orientation="vertical" className="w-0.5 h-4/5 self-center" />

          <div className="flex flex-row gap-2 px-4">
            <p className="text-sm">هشدار</p>
            <div className="self-center w-10 h-4 ring-1 ring-yellow-600/30 rounded-md bg-yellow-400" />
          </div>
        </div>
      </div>

      <CustomButton icon={PlusCircle} className="h-13 cursor-pointer self-center" onClick={onCreateClick}>
        ثبت اعلامیه جدید
      </CustomButton>

      <CreateAnnouncementDialog open={showCreateForm} onOpenChange={onCreateClick} />
    </div>
  );
}
