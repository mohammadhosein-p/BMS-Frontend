// pages/PollsPage.tsx
import PollCard from "@/components/poll/PollCard";
import { Plus } from "lucide-react";

const activePolls = [
    {
        id: 1,
        title: "تصمیم گیری درباره ساختمان",
        options: [
            { id: 1, title: "گزینه 1", percent: 50 },
            { id: 2, title: "گزینه 2", percent: 15 },
            { id: 3, title: "گزینه 3", percent: 30 },
            { id: 4, title: "گزینه 4", percent: 5 },
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

const finishedPolls = [
    {
        id: 1,
        title: "تصمیم گیری درباره ساختمان",
        options: [
            { id: 1, title: "گزینه 1", percent: 50 },
            { id: 2, title: "گزینه 2", percent: 15 },
            { id: 3, title: "گزینه 3", percent: 30 },
            { id: 4, title: "گزینه 4", percent: 5 },
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
                <button className="flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600">
                    <Plus className="h-5 w-5" />
                    ساخت نظرسنجی
                </button>
                {/* <CreatePollDialog /> */}

                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl ">
                    نظرسنجی‌های فعال
                </h1>
            </div>

            {/* active polls */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" dir="rtl">
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3" dir="rtl">
                <PollCard
                    title="تصمیم گیری درباره ساختمان"
                    isActive
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
