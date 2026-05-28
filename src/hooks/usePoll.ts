import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import type { CreatePollBody } from "@/types/PollTypes";
import {
    createPollService,
    deletePollByIdService,
    getAllPollService,
    getPollByIdService,
} from "@/services/pollService";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useCreatePoll = (apartment_id: string) => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: (data: CreatePollBody) =>
            createPollService(data, apartment_id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["polls", apartment_id],
            });
            toast.success("نظرسنجی با موفقیت آغاز شد.");
        },

        onError: (error) => {
            const err = error as AxiosError<{
                message?: string;
            }>;

            toast.error(err.response?.data?.message || "خطا در ایجاد نظرسنجی");
        },
    });
};

export const useGetAllPoll = (apartment_id: string) => {
    return useQuery({
        queryFn: () => getAllPollService(apartment_id),

        queryKey: ["polls", apartment_id],
    });
};

export const useGetPollByID = (apartment_id: string, poll_id: string, enabled:boolean) => {
    return useQuery({
        queryFn: () => getPollByIdService(apartment_id, poll_id),

        queryKey: ["polls", apartment_id, poll_id],
        enabled
    });
};

export const useDeletePollByID = (
    apartment_id: string,
    poll_id: string,
    onSuccess: () => void,
) => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: () => deletePollByIdService(apartment_id, poll_id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["polls", apartment_id, poll_id],
            });
            queryClient.invalidateQueries({
                queryKey: ["polls", apartment_id],
            });

            toast.success("نظرسنجی با موفقیت حذف شد");
            onSuccess();
        },
    });
};
