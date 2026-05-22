import { createTicketService, getTicketsService } from "@/services/ticketService";
import type { CreateTicketPayload } from "@/types/ticketTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useCreateTicket = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: (data: CreateTicketPayload) => createTicketService(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });
            toast.success("تیکت با موفقیت ایجاد شد.");
        },

        onError: (error) => {
            const err = error as AxiosError<{
                message?: string;
            }>;

            toast.error(err.response?.data?.message || "خطا در ایجاد تیکت");
        },
    });
};

export const useAllTickets = () => {
    return useQuery({
        queryKey: ["tickets"],

        queryFn: getTicketsService,
        
    });
};