import { Upload, ArrowLeft, ChartNoAxesCombinedIcon } from "lucide-react";
import CustomField from "@/components/ui/CutsomeFiled";
import CustomButton from "@/components/ui/CustomeButton";

function Landing() {

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background gap-8 p-4">
      
      <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-2xl border border-border shadow-sm">
        <p className="text-3xl font-bold text-center text-foreground iranyekan">
          خوش آمدید
        </p>

        <CustomField 
          placeholder="نام کاربری" 
          variant="default"
        />

        <CustomField 
          placeholder="example@mail.com" 
          direction="ltr"
          type="password"
          icon = {<ChartNoAxesCombinedIcon size={20} />}
          variant="success" 
        />

		<CustomField 
          placeholder="example@mail.com" 
          type="password"
        />

        <div className="flex flex-col gap-3 pt-4">
          <CustomButton
            variant="primary"
            styleType="solid"
            className="w-full py-2"
            icon={Upload}
          >
            بارگذاری فایل
          </CustomButton>

          <CustomButton
            variant="secondary"
            styleType="soft"
            className="w-full py-2"
            icon={ArrowLeft}
          >
            بازگشت به پنل
          </CustomButton>
        </div>
      </div>

      <p className="text-neutral-3 text-sm iranyekan">
        طراحی شده با عشقققققق برای شما
      </p>
    </div>
  );
}

export default Landing;