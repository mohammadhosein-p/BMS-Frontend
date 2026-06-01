import { useMemo, useState } from "react";
import { BadgeCheck, CircleHelp, Trash, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "../ui/CustomeDialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import CustomButton from "../ui/CustomeButton";
import {
    useDeletePollByID,
    useDeleteVote,
    useGetPollByID,
    usePostVote,
} from "@/hooks/usePoll";
import { Spinner } from "../ui/spinner";

function PollDetailsDialog({
    id,
    isActive,
    isPublic = true,
}: {
    id: string;
    isActive: boolean;
    isPublic?: boolean;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const apartment_id =
        useAuthStore((store) => store.user?.apartment_id) || "";

    const { data, isPending } = useGetPollByID(apartment_id, id, isOpen);
    const { mutate: deletePoll, isPending: isPendingDeletePoll } =
        useDeletePollByID(apartment_id, id, () => setIsOpen(false));
    const { mutate: postVoteMutate, isPending: isSubmitVotePending } =
        usePostVote(apartment_id, data?.data.id || "");
    const { mutate: deleteVoteMutate, isPending: isDeleteVotePending } =
        useDeleteVote(apartment_id, data?.data.id || "");

    const isManager = useAuthStore((store) => store.user?.role == "manager");

    const normalizedOptions = useMemo(() => {
        const totalVotes =
            data?.data.options.reduce(
                (sum, option) => sum + option.votes_count,
                0,
            ) || 0;

        return (
            data?.data.options.map((option) => ({
                ...option,
                percent:
                    totalVotes > 0
                        ? Math.round((option.votes_count / totalVotes) * 100)
                        : 0,
            })) || []
        );
    }, [data]);

    const submitVote = (optionId: string) => {
        if (isSubmitVotePending || isDeleteVotePending || !isActive) return;

        if (data?.data.user_voted_option_id == optionId) {
            deleteVoteMutate();
            return;
        }

        postVoteMutate({ option_id: optionId });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "rounded-2xl border-[3px] px-4 py-1.25 text-md cursor-pointer hover:scale-105 transition-all",
                    isActive
                        ? "border-secondary-blue-2 text-secondary-blue-2"
                        : "border-zinc-500 text-zinc-700",
                )}
            >
                مشاهده نتایج و جزئیات
            </button>

            {/* Dialog */}
            <DialogContent
                isOpen={isOpen}
                className="max-w-2xl overflow-y-auto custom-scrollbar rounded-4xl border-none bg-neutral-5 p-0"
            >
                {/* Header */}
                <DialogHeader className="relative px-6 py-5">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-danger-2 text-white transition-all hover:opacity-90"
                        >
                            <X className="h-5 w-5" strokeWidth={3} />
                        </button>
                    </DialogClose>

                    <DialogTitle className="text-center text-2xl font-bold text-neutral-1">
                        جزئیات نظرسنجی
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="space-y-4 px-4 pb-5">
                    {isPending ? (
                        <div className="flex justify-center items-center my-10">
                            <Spinner className="size-12 text-primary-1" />
                        </div>
                    ) : data ? (
                        <>
                            {/* Info Box */}
                            <div className="rounded-3xl border border-neutral-4 bg-neutral-5 p-4">
                                {/* top */}
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    {/* icon */}
                                    <CircleHelp className="h-8 w-8 text-primary-2" />

                                    {/* title */}
                                    <div className="flex-1 text-right">
                                        <h2 className="text-xl font-bold text-neutral-1">
                                            {data?.data.title}
                                        </h2>
                                    </div>

                                    {/* badges */}
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={cn(
                                                "rounded-lg px-5 py-1.25 text-sm font-bold",
                                                isActive
                                                    ? "bg-secondary-blue-3/90 text-neutral-5"
                                                    : "bg-neutral-3 text-neutral-5",
                                            )}
                                        >
                                            {isActive ? "فعال" : "غیرفعال"}
                                        </div>

                                        <div
                                            className={cn(
                                                "rounded-lg px-5 py-1.25 text-sm font-bold",
                                                isPublic
                                                    ? "bg-success-op1-3/90 text-neutral-5"
                                                    : "bg-danger-3/90 text-neutral-5",
                                            )}
                                        >
                                            {isPublic ? "عمومی" : "خصوصی"}
                                        </div>
                                    </div>
                                </div>

                                {/* description */}
                                <p className="text-center text-sm leading-7 text-neutral-2">
                                    {data?.data.description}
                                </p>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 rounded-3xl border border-neutral-4 bg-neutral-5 p-4">
                                {normalizedOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className="flex items-center gap-4 rounded-2xl border border-neutral-4 bg-neutral-5 px-4 py-3 transition ease-in hover:scale-105 cursor-pointer"
                                        onClick={() => submitVote(option.id)}
                                    >
                                        {/* voted */}
                                        <div className="h-5 w-5 fill-secondary-blue-2 text-white">
                                            {isSubmitVotePending ||
                                            isDeleteVotePending ? (
                                                <Spinner />
                                            ) : (
                                                data?.data
                                                    .user_voted_option_id ==
                                                    option.id && (
                                                    <BadgeCheck className="h-5 w-5 fill-secondary-blue-2 text-white" />
                                                )
                                            )}
                                        </div>
                                        {/* title */}
                                        <span className="w-48 text-right text-base text-neutral-1">
                                            {option.text}
                                        </span>

                                        {/* progress */}
                                        <div className="flex-1">
                                            <div className="relative">
                                                <Progress
                                                    value={option.percent}
                                                    className={cn(
                                                        "h-5 rounded-md bg-white",
                                                        "[&>div]:rounded-md [&>div]:bg-secondary-blue-3",
                                                    )}
                                                />

                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-neutral-1">
                                                    %{option.percent}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {isManager && (
                                <div className="flex justify-center pt-2">
                                    {isPendingDeletePoll ? (
                                        <Spinner />
                                    ) : (
                                        <CustomButton
                                            className="bg-danger-3 hover:bg-danger-2 cursor-pointer"
                                            icon={Trash}
                                            onClick={() => deletePoll()}
                                        >
                                            حذف نظرسنجی
                                        </CustomButton>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex justify-center items-center my-10">
                            <div className="text-primary-1">
                                جزئیات نظرسنجی دریافت نشد. دوباره تلاش کنید
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PollDetailsDialog;
