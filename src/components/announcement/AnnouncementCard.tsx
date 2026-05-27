import CustomButton from "@/components/ui/CustomeButton.tsx";
import { Pin } from "lucide-react";
import { useState } from "react";
import { AnnouncementDetails } from "./AnnouncementDetails";

type AnnouncementCardProps = {
  color: "red" | "green" | "yellow";
  title: string;
  content: string;
  created: string;
  isPinned?: boolean;
};

export function AnnouncementCard({ color, title, content, created, isPinned = false }: AnnouncementCardProps) {
  const colorMap = {
    red: "bg-red-400",
    green: "bg-green-400",
    yellow: "bg-yellow-400",
  };

  const [showDetails, setShowDetails] = useState(false);

  const onDetailClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div className="flex flex-row gap-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className={`w-5 ${colorMap[color]}`} />

        <div className="flex flex-col gap-1 px-4 py-2 flex-1">
          <div className="flex flex-row gap-2 items-center">
            <p className="font-semibold">{title}</p>
            {isPinned && <Pin className="w-4 h-4 text-gray-600" />}
          </div>
          <p className="text-gray-600 line-clamp-1">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
            در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
            طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
          <p className="text-sm text-gray-500">2025-02-14</p>
        </div>

        <div className="flex items-center pl-4">
          <CustomButton variant="primary" styleType="outline" onClick={onDetailClick}>
            مشاهده جزئیات
          </CustomButton>
        </div>
      </div>

      <AnnouncementDetails open={showDetails} onOpenChange={setShowDetails} title={title} content={content} />
    </>
  );
}
