import { ScrollText, X } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "../ui/button";
import { DialogHeader, Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/CustomeDialog";

export function AnnouncementDetails({ open, onOpenChange, title, content }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent isOpen={open} className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col gap-3" dir="rtl">
        <DialogHeader>
          <div className="flex flex-row justify-between items-center">
            <DialogTitle>جزئیات اطلاعیه</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-red-500">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex flex-row w-fit rounded-2xl py-1 px-4 gap-2 bg-secondary">
          {/* Replace ScrollText with your actual component */}
          <ScrollText />
          <p className="text-sm font-medium">قطعی اب</p>
        </div>

        <div className="border border-border bg-secondary rounded-2xl p-3 overflow-y-auto flex-1">
          <p className="text-sm">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
            در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
            طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
