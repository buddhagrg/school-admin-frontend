import { z } from 'zod';

export const NewLeavePolicySchema = z.object({
  name: z.string().min(1, 'Policy name is required')
});

export const PolicyUsersSchema = z.object({
  users: z.array(z.number()).min(1, 'You must select at least one user')
});

export const BaseLeaveSchema = z.object({
  policyId: z.number().min(1, 'Policy is required').or(z.string().min(1, 'Policy is required')),
  note: z.string().min(1, 'Note is required')
});

export const LeaveRequestFormSchema = BaseLeaveSchema.extend({
  from: z.union([z.string(), z.null(), z.date()]),
  to: z.union([z.string(), z.null(), z.date()])
}).refine((data) => !data.from || !data.to || data.from <= data.to, {
  message: "The 'from' date must be before or equal to 'to' date.",
  path: ['to']
});
