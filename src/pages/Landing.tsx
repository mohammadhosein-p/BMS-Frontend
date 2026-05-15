import { useState } from "react"; // Added state to manage selection
import { Upload, ArrowLeft, ChartNoAxesCombinedIcon } from "lucide-react";
import CustomField from "@/components/ui/CutsomeFiled";
import CustomButton from "@/components/ui/CustomeButton";
import SelectOptions from "@/components/ui/SelectOptions/SelectOptions";

function Landing() {
  const roles = [
    { value: "admin", label: "مدیر ساختمان", color: "cyan" },
    { value: "resident", label: "ساکن واحد", color: "amber" },
    { value: "guest", label: "مهمان", color: "blue" },
  ];

  const [selectedRole, setSelectedRole] = useState(roles[1].value);

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

        <div className="flex flex-col gap-2" dir="rtl">
          <label className="text-sm text-neutral-1 mr-1 iranyekan font-extrabold">
            نقش کاربری
          </label>
          <SelectOptions
            options={roles}
            value={selectedRole}
            onChange={setSelectedRole}
            disabled={false}
          />
        </div>

        <CustomField
          placeholder="password"
          direction="ltr"
          type="password"
          icon={<ChartNoAxesCombinedIcon size={20} />}
          variant="success"
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
        طراحی شده با عشق برای شما
      </p>
    </div>
  );
}

export default Landing;