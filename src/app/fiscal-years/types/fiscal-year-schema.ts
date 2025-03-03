import { z } from 'zod';

export const FiscalYearFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    startDate: z.union([z.date(), z.string()]).nullable(),
    endDate: z.union([z.date(), z.string()]).nullable()
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate } = data;
    if (!startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start Date is required',
        path: ['startDate']
      });
    }
    if (!endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End Date is required',
        path: ['endDate']
      });
    }
    if (startDate && endDate && startDate > endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End Date must be greater than start date',
        path: ['endDate']
      });
    }
  });
