import {
  createTicketComment,
  createTicketService,
  deleteTicketService,
  getFullyTicketDetails,
  getTicketsService,
  updateTicketStatusService,
} from "@/services/ticketService";
import type { CreateTicketPayload } from "@/types/ticketTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import type { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useCreateTicket = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: CreateTicketPayload) => createTicketService(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
      showSuccessToast("تیکت با موفقیت ایجاد شد.");
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(err.response?.data?.message || "خطا در ایجاد تیکت");
    },
  });
};

export const useAllTickets = (params?: { status?: string; category?: string; user_id?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["tickets", params],

    queryFn: () => getTicketsService(params),
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: updateTicketStatusService,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      showSuccessToast("وضعیت تیکت بروزرسانی شد");
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "ticket", "updateTicketStatus", "خطا در به روز رسانی وضعیت تیکت"));
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: deleteTicketService,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });

      showSuccessToast("تیکت حذف شد");
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "ticket", "deleteTicket", "خطا در حذف تیکت"));
    },
  });
};

export const useTicketDetails = (id?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["ticket-details", id],
    queryFn: () => getFullyTicketDetails(id!),
    enabled,
  });
};

export const useCreateTicketComment = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) => createTicketComment(id, text),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-details", variables.id],
      });
      showSuccessToast("کامنت با موفقیت ارسال شد.");
    },
    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "ticket", "createComment", "خطا در ارسال کامنت"));
    },
  });
};
