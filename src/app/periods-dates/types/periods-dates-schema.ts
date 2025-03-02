import { z } from 'zod';

const PeriodDateSchema = z
  .object({
    id: z.number(),
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
        message: 'Start Date can not be greater than end date',
        path: ['startDate']
      });
    }
  });

export const PeriodsDatesFormSchema = z.array(PeriodDateSchema);
