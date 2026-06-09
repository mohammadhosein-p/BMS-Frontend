import { AxiosError } from "axios";

type Feature = keyof typeof ERROR_MESSAGES;
type Action = string;

export function getErrorMessage(error: AxiosError, feature: Feature, action: Action, fallback: string) {
  const status = error.response?.status;

  if (!status) {
    return fallback;
  }

  const mappedMessage = ERROR_MESSAGES?.[feature]?.[action as never]?.[status as never];

  return mappedMessage || fallback;
}

export const ERROR_MESSAGES = {
  poll: {
    createPoll: {
      400: "اطلاعات نظرسنجی نامعتبر است.",
      403: "شما مجوز ایجاد نظرسنجی را ندارید.",
      404: "مجتمع مورد نظر یافت نشد.",
      500: "خطایی در ایجاد نظرسنجی رخ داد.",
    },

    deletePoll: {
      403: "شما مجوز حذف این نظرسنجی را ندارید.",
      404: "نظرسنجی مورد نظر یافت نشد.",
      500: "خطایی در حذف نظرسنجی رخ داد.",
    },

    submitVote: {
      400: "گزینه انتخاب شده معتبر نیست.",
      403: "شما مجاز به ثبت رای نیستید.",
      404: "نظرسنجی یافت نشد.",
      409: "شما قبلاً در این نظرسنجی شرکت کرده‌اید.",
      500: "خطایی در ثبت رای رخ داد.",
    },

    deleteVote: {
      404: "رای شما یافت نشد.",
      500: "خطایی در پس گرفتن رای رخ داد.",
    },
  },

  ticket: {
    createTicket: {
      400: "اطلاعات تیکت نامعتبر است.",
      403: "شما مجوز ایجاد تیکت را ندارید.",
      404: "بخش مورد نظر یافت نشد.",
      500: "خطایی در ایجاد تیکت رخ داد.",
    },

    updateTicketStatus: {
      400: "وضعیت انتخاب شده معتبر نیست.",
      403: "شما مجوز تغییر وضعیت این تیکت را ندارید.",
      404: "تیکت مورد نظر یافت نشد.",
      500: "خطایی در بروزرسانی وضعیت تیکت رخ داد.",
    },

    deleteTicket: {
      403: "شما مجوز حذف این تیکت را ندارید.",
      404: "تیکت مورد نظر یافت نشد.",
      500: "خطایی در حذف تیکت رخ داد.",
    },

    createComment: {
      400: "متن کامنت نامعتبر است.",
      403: "شما مجوز ثبت کامنت را ندارید.",
      404: "تیکت مورد نظر یافت نشد.",
      500: "خطایی در ارسال کامنت رخ داد.",
    },
  },
} as const;
