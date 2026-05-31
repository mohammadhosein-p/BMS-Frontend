// pages/PollsPage.tsx
import CreatePollDialog from "@/components/poll/CeatePollDialog";
import PollCard from "@/components/poll/PollCard";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllPoll } from "@/hooks/usePoll";
import useAuthStore from "@/store/useAuthStore";


function PollTab() {
    const apartment_id =
        useAuthStore((store) => store.user?.apartment_id) || "";
    const { data, isPending } = useGetAllPoll(apartment_id);
    return (
        <div className="custom-scrollbar h-full overflow-y-auto bg-neutral-5 p-6">
            {/* top section */}
            <div className="mb-6 flex items-center justify-between">
                <CreatePollDialog />

                <h1 className="text-right text-2xl font-extrabold text-neutral-1 sm:text-3xl ">
                    نظرسنجی‌های فعال
                </h1>
            </div>

            {/* active polls */}
            <div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                dir="rtl"
            >
                {isPending ? (
                    <Spinner />
                ) : data ? (
                    data.data
                        .filter(
                            (poll) =>
                                new Date(poll.expires_at).getTime() >
                                Date.now(),
                        )
                        .map((poll) => (
                            <PollCard
                                key={poll.id}
                                id={poll.id}
                                expires_at={poll.expires_at}
                                options={poll.options}
                                title={poll.title}
                                isActive
                            />
                        ))
                ) : (
                    <p>no polls found</p>
                )}
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
                {isPending ? (
                    <Spinner />
                ) : data ? (
                    data.data
                        .filter(
                            (poll) =>
                                new Date(poll.expires_at).getTime() <
                                Date.now(),
                        )
                        .map((poll) => (
                            <PollCard
                                key={poll.id}
                                id={poll.id}
                                expires_at={poll.expires_at}
                                options={poll.options}
                                title={poll.title}
                                isActive={false}
                            />
                        ))
                ) : (
                    <p>no polls found</p>
                )}
            </div>
        </div>
    );
}
export default PollTab;
