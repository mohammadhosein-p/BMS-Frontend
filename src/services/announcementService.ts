import type { ApiResponse } from "../types/authTypes"; // یا هر مسیری که ApiResponse تعریف شده
import type { Announcement, AnnouncementPayload, Tag } from "../types/announcementTypes";
import { getData, postData, putData, deleteData } from "./services";

/**
 * GET /apartments/:apartmentId/announcements/:announcementId
 * دریافت جزئیات یک اطلاعیه خاص
 */
export const getAnnouncementDetailsService = async (apartmentId: string, announcementId: string): Promise<Announcement> => {
  const res: ApiResponse<Announcement> = await getData({
    endPoint: `/apartments/${apartmentId}/announcements/${announcementId}`,
  });
  return res.data;
};

/**
 * POST /apartments/:apartmentId/announcements
 * ایجاد یک اطلاعیه جدید
 */
export const createAnnouncementService = async (apartmentId: string, data: AnnouncementPayload): Promise<ApiResponse<Announcement>> => {
  return postData({
    endPoint: `/apartments/${apartmentId}/announcements`,
    data,
  });
};

/**
 * PUT /apartments/:apartmentId/announcements/:announcementId
 * بروزرسانی کامل یک اطلاعیه
 */
export const updateAnnouncementService = async (
  apartmentId: string,
  announcementId: string,
  data: AnnouncementPayload,
): Promise<Announcement> => {
  const res: ApiResponse<Announcement> = await putData({
    endPoint: `/apartments/${apartmentId}/announcements/${announcementId}`,
    data,
  });
  return res.data;
};

/**
 * DELETE /apartments/:apartmentId/announcements/:announcementId
 * حذف یک اطلاعیه
 */
export const deleteAnnouncementService = async (apartmentId: string, announcementId: string): Promise<ApiResponse<null>> => {
  return deleteData({
    endPoint: `/apartments/${apartmentId}/announcements/${announcementId}`,
  });
};

/**
 * GET /apartments/:apartmentId/announcements
 * دریافت لیست تمامی اطلاعیه‌های یک آپارتمان
 */
export const getAnnouncementsService = async (apartmentId: string) => {
    const res: ApiResponse<Announcement[]> = await getData({
        endPoint: `/apartments/${apartmentId}/announcements`,
    });
    return res.data;
};


export const getAllTagsService = async () => {
  const res: ApiResponse<Tag[]> = await getData({
    endPoint: "/tags"
  })
  return res.data;
}
