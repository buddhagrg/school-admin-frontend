import { z } from "zod";

export const NewLeavePolicySchema = z.object({
    name: z.string().min(1, "Policy name is required")
});

export const PolicyUsersSchema = z.object({
    users: z.array(z.number()).min(1, "You must select at least one user")
});

export const LeaveRequestSchema = z.object({
    policy: z.number().min(1, "Policy is required"),
    from: z.union([z.date(), z.null(), z.string()]),
    to: z.union([z.date(), z.null(), z.string()]),
    note: z.string().min(1, "Note is required")
}).refine((data) => !data.from || !data.to || data.from <= data.to, {
    message: "The 'from' date must be before or equal to 'to' date.",
    path: ["to"]
});
