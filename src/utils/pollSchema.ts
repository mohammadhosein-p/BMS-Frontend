import { z } from "zod";

export const createPollSchema = z
    .object({
        title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
        description: z.string().min(5, "توضیحات باید حداقل ۵ کاراکتر باشد"),
        expires_at: z.date().refine((date) => date.getTime() > Date.now(), {
            message: "تاریخ انقضا باید در آینده باشد",
        }),
        is_votes_public: z.boolean(),
        options: z
            .array(
                z.object({
                    value: z.string().min(1, "گزینه نمی‌تواند خالی باشد"),
                }),
            )
            .min(2, "حداقل دو گزینه لازم است")
            .max(5, "حداکثر می توانید 5 گزینه داشته باشید"),
    })
    .superRefine((data, ctx) => {
        const seen = new Map<string, number>();
        data.options.forEach((option, index) => {
            const normalized = option.value.trim().toLowerCase();
            if (!normalized) return;
            if (seen.has(normalized)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "این گزینه قبلاً وارد شده است",
                    path: ["options", index, "value"],
                });
            } else {
                seen.set(normalized, index);
            }
        });
    });

export type CreatePollFormData = z.infer<typeof createPollSchema>;
