// pages/PollsPage.tsx
import PollCard from "@/components/poll/PollCard";
import CustomButton from "@/components/ui/CustomeButton";
import { Plus } from "lucide-react";

const activePolls = [
    {
        id: 1,
        title: "تصمیم گیری درباره ساختمان",
        options: [
            { id: 1, title: "گزینه گزینه گزینه گزینه گزینه 1", percent: 100 },
            { id: 2, title: "گزینه 2", percent: 10 },
            { id: 3, title: "گزینه 3", percent: 0 },
            { id: 4, title: "گزینه 4", percent: 0 },
        ],
    },
    {
        id: 2,
        title: "تصمیم گیری درباره ساختمان",
        options: [
            { id: 1, title: "گزینه 1", percent: 50 },
            { id: 2, title: "گزینه 2", percent: 15 },
            { id: 3, title: "گزینه 3", percent: 30 },
            { id: 4, title: "گزینه 4", percent: 5 },
        ],
    },
    {
        id: 3,
        title: "تصمیم گیری درباره ساختمان",
        options: [
            { id: 1, title: "گزینه 1", percent: 50 },
            { id: 2, title: "گزینه 2", percent: 15 },
            { id: 3, title: "گزینه 3", percent: 30 },
            { id: 4, title: "گزینه 4", percent: 5 },
        ],
    },
];


function PollTab() {
    return (
        <div className="custom-scrollbar h-full overflow-y-auto bg-neutral-5 p-6">
            {/* top section */}
            <div className="mb-6 flex items-center justify-between">
                <CustomButton icon={Plus} className="rtl bg-secondary-blue-3 h-13 cursor-pointer hover:bg-secondary-blue-3/80">
                    ساخت نظرسنجی
                </CustomButton>
                {/* <CreatePollDialog /> */}

                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl ">
                    نظرسنجی‌های فعال
                </h1>
            </div>

            {/* active polls */}
            <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                dir="rtl"
            >
                {activePolls.map((poll) => (
                    <PollCard
                        key={poll.id}
                        title={poll.title}
                        options={poll.options}
                        isActive
                    />
                ))}
            </div>

            {/* finished title */}
            <div className="mt-16 mb-8">
                <h2 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl ">
                    نظرسنجی های تمام شده
                </h2>
            </div>

            {/* finished polls */}
            <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                dir="rtl"
            >
                <PollCard
                    title="تصمیم گیری درباره ساختمان"
                    isActive={false}
                    options={[
                        {
                            id: 1,
                            title: "گزینه 1",
                            percent: 50,
                        },
                        {
                            id: 2,
                            title: "گزینه 2",
                            percent: 15,
                        },
                        {
                            id: 3,
                            title: "گزینه 3",
                            percent: 30,
                        },
                        {
                            id: 4,
                            title: "گزینه 4",
                            percent: 5,
                        },
                    ]}
                />
            </div>
        </div>
    );
}
export default PollTab;
