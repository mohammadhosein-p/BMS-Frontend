import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { AnnouncementPayload } from "@/types/announcementTypes";
import {
  getAnnouncementDetailsService,
  createAnnouncementService,
  updateAnnouncementService,
  deleteAnnouncementService,
  getAnnouncementsService,
  getAllTagsService,
} from "@/services/announcementService";

export const useAnnouncementDetails = (apartmentId: string, announcementId: string, enabled = true) => {
  return useQuery({
    queryKey: ["announcement-details", announcementId],
    queryFn: () => getAnnouncementDetailsService(apartmentId, announcementId),
    enabled: enabled && !!announcementId && !!apartmentId,
  });
};

export const useCreateAnnouncement = (apartmentId: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: AnnouncementPayload) => createAnnouncementService(apartmentId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["announcements", apartmentId] });
      toast.success("اطلاعیه با موفقیت ایجاد شد.");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "خطا در ایجاد اطلاعیه");
    },
  });
};

export const useUpdateAnnouncement = (apartmentId: string, announcementId: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: AnnouncementPayload) => updateAnnouncementService(apartmentId, announcementId, data),
    onSuccess: async () => {
      // هم لیست اصلی و هم جزئیات همین اطلاعیه رو کش‌زدایی میکنه
      await queryClient.invalidateQueries({ queryKey: ["announcements", apartmentId] });
      await queryClient.invalidateQueries({ queryKey: ["announcement-details", announcementId] });
      toast.success("اطلاعیه با موفقیت بروزرسانی شد.");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "خطا در بروزرسانی اطلاعیه");
    },
  });
};

export const useDeleteAnnouncement = (apartmentId: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (announcementId: string) => deleteAnnouncementService(apartmentId, announcementId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["announcements", apartmentId] });
      toast.success("اطلاعیه با موفقیت حذف شد.");
    },
    onError: (error) => {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message || "خطا در حذف اطلاعیه");
    },
  });
};

export const useAllAnnouncements = (apartmentId: string, enabled = true): any => {
  return useQuery({
    queryKey: ["announcements", apartmentId],
    queryFn: () => getAnnouncementsService(apartmentId),
    enabled: enabled && !!apartmentId,
  });
};

export const useAllTags = (enabled = true) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getAllTagsService(),
    enabled: enabled,
  });
};
