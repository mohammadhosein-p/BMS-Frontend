import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import type { CreatePollBody, PostVoteBody } from "@/types/PollTypes";
import {
  createPollService,
  deletePollByIdService,
  deleteVoteService,
  getAllPollService,
  getPollByIdService,
  postVoteService,
} from "@/services/pollService";
import type { AxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "@/utils/showToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

export const useCreatePoll = (apartment_id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: CreatePollBody) => createPollService(data, apartment_id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["polls", apartment_id],
      });
      showSuccessToast("نظرسنجی با موفقیت آغاز شد.");
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "poll", "createPoll", "خطا در ایجاد نظرسنجی"));
    },
  });
};

export const useGetAllPoll = (apartment_id: string) => {
  return useQuery({
    queryFn: () => getAllPollService(apartment_id),

    queryKey: ["polls", apartment_id],
  });
};

export const useGetPollByID = (apartment_id: string, poll_id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => getPollByIdService(apartment_id, poll_id),

    queryKey: ["polls", apartment_id, poll_id],
    enabled,
  });
};

export const useDeletePollByID = (apartment_id: string, poll_id: string, onSuccess: () => void) => {
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

      showSuccessToast("نظرسنجی با موفقیت حذف شد");
      onSuccess();
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "poll", "deletePoll", "خطا در حذف نظرسنجی"));
    },
  });
};

export const usePostVote = (apartment_id: string, poll_id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (option_data: PostVoteBody) => postVoteService(option_data, apartment_id, poll_id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls", apartment_id, poll_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["polls", apartment_id],
      });

      showSuccessToast("رای شما با موفقیت ثبت شد");
    },
    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "poll", "submitVote", "خطا در ثبت رای"));
    },
  });
};

export const useDeleteVote = (apartment_id: string, poll_id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => deleteVoteService(apartment_id, poll_id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["polls", apartment_id, poll_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["polls", apartment_id],
      });

      showSuccessToast("رای شما با موفقیت پس گرفته شد");
    },

    onError: (error) => {
      const err = error as AxiosError<{
        message?: string;
      }>;

      showErrorToast(getErrorMessage(err, "poll", "deleteVote", "خطا در پس گرفتن رای"));
    },
  });
};
