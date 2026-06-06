import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "./queryClient";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { AnnouncementPayload, Tag } from "@/types/announcementTypes";
import {
    getAnnouncementDetailsService,
    createAnnouncementService,
    updateAnnouncementService,
    deleteAnnouncementService,
    getAnnouncementsService,
    getAllTagsService,
} from "@/services/announcementService";

// ۱. هوک دریافت جزئیات اطلاعیه
export const useAnnouncementDetails = (apartmentId: string, announcementId: string, enabled = true) => {
    return useQuery({
        queryKey: ["announcement-details", announcementId],
        queryFn: () => getAnnouncementDetailsService(apartmentId, announcementId),
        enabled: enabled && !!announcementId && !!apartmentId,
    });
};

// ۲. هوک ایجاد اطلاعیه جدید
export const useCreateAnnouncement = (apartmentId: string) => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: (data: AnnouncementPayload) => createAnnouncementService(apartmentId, data),
        onSuccess: async () => {
            // لیست اطلاعیه‌ها رو باطل میکنه تا جدول یا لیست اصلی صفحه دوباره لود بشه
            await queryClient.invalidateQueries({ queryKey: ["announcements", apartmentId] });
            toast.success("اطلاعیه با موفقیت ایجاد شد.");
        },
        onError: (error) => {
            const err = error as AxiosError<{ message?: string }>;
            toast.error(err.response?.data?.message || "خطا در ایجاد اطلاعیه");
        },
    });
};

// ۳. هوک ویرایش اطلاعیه
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

// ۴. هوک حذف اطلاعیه
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

// ۵. هوک دریافت لیست تمامی اطلاعیه‌ها
export const useAllAnnouncements = (apartmentId: string, enabled = true): any => {
    return useQuery({
        queryKey: ["announcements", apartmentId],
        queryFn: () => getAnnouncementsService(apartmentId),
        enabled: enabled && !!apartmentId, // فقط زمانی درخواست می‌زند که آیدی آپارتمان وجود داشته باشد
    });
};

export const useAllTags = (enabled = true) => {
  return useQuery({
    queryKey: [],
    queryFn: () => getAllTagsService(),
    enabled: enabled
  })
}