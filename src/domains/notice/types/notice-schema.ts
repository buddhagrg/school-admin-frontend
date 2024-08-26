import { z } from "zod";

export const NameValueSchema = z.object({
    name: z.string(),
    id: z.string(),
});

export const SectionSchema = z.record(z.number(), z.array(NameValueSchema));
export const RecipientDetailSchema = z.object({
    id: z.number(),
    name: z.string(),
    primaryDependents: z.object({
        name: z.string(),
        list: z.union([z.array(NameValueSchema), z.array(z.never())])
    })
});

export const NoticeFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.number().min(1, "Status is required"),
    recipientType: z.enum(["EV", "SP"]),
    recipientRole: z.number().optional(),
    firstField: z.union([z.number(), z.string()]).optional()
}).superRefine((value, ctx) => {
    const { recipientType, recipientRole } = value;
    if (recipientType === "SP") {
        if (!recipientRole) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Role is required",
                path: ["recipientRole"]
            });
        }
    }
});
