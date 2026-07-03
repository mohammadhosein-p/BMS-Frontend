import CreatePollDialog from "@/components/poll/CeatePollDialog";
import PollCard from "@/components/poll/PollCard";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPoll } from "@/hooks/usePoll";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

function PollTab() {
    const apartment_id =
        useAuthStore((store) => store.user?.apartment_id) || "";
    const isAdmin = useAuthStore(store => store.user?.role == "manager")
    const { data, isPending, refetch } = useGetAllPoll(apartment_id);
    const [currentTime, setCurrentTime] = useState(Date.now());

    const activePolls =
        data?.data?.filter(
            (poll) =>
                new Date(poll.expires_at).getTime() > currentTime - 1 * 60 * 1000 + 1 * 60 * 60 * 1000, // - 1 minute + 1 hour
        ) ?? [];

    const finishedPolls =
        data?.data?.filter(
            (poll) =>
                new Date(poll.expires_at).getTime() <= currentTime - 1 * 60 * 1000 + 1 * 60 * 60 * 1000, // - 1 minute + 1 hour
        ) ?? [];

    return (
        <div className="custom-scrollbar h-full overflow-y-auto bg-neutral-5 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between text-right">
                {isAdmin ? <CreatePollDialog /> : <div />}

                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl">
                    {activePolls.length > 0 ? "نظرسنجی های فعال" : "نظرسنجی"}
                </h1>
            </div>

            {/* Active Polls */}
            <section>
                <div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    dir="rtl"
                >
                    {isPending ? (
                        <div className="col-span-full flex justify-center py-10">
                            <Spinner className="size-10" />
                        </div>
                    ) : activePolls.length > 0 ? (
                        activePolls.map((poll) => (
                            <PollCard
                                key={poll.id}
                                id={poll.id}
                                title={poll.title}
                                options={poll.options}
                                expires_at={poll.expires_at}
                                isActive
                                onExpire={() => {
                                    refetch();
                                    setCurrentTime(Date.now());
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full rounded-3xl border border-dashed border-neutral-4 bg-neutral-5 p-8 text-center text-neutral-2">
                            هیچ نظرسنجی فعالی وجود ندارد.
                        </div>
                    )}
                </div>
            </section>

            {/* Finished Polls */}
            <section className="mt-16">
                <h2 className="mb-6 text-right text-2xl font-extrabold text-neutral-1">
                    نظرسنجی‌های تمام‌شده
                </h2>

                <div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    dir="rtl"
                >
                    {isPending ? (
                        <div className="col-span-full flex justify-center py-10">
                            <Spinner className="size-10" />
                        </div>
                    ) : finishedPolls.length > 0 ? (
                        finishedPolls.map((poll) => (
                            <PollCard
                                key={poll.id}
                                id={poll.id}
                                title={poll.title}
                                options={poll.options}
                                expires_at={poll.expires_at}
                                isActive={false}
                                onExpire={() => {
                                    refetch();
                                    setCurrentTime(Date.now());
                                }}
                            />
                        ))
                    ) : (
                        <div className="col-span-full rounded-3xl border border-dashed border-neutral-4 bg-white p-8 text-center text-neutral-2">
                            هیچ نظرسنجی پایان‌یافته‌ای وجود ندارد.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default PollTab;
