import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const AcademicYearFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    startDate: z.union([z.date(), z.string()]).nullable(),
    endDate: z.union([z.date(), z.string()]).nullable(),
    academicLevelId: stringNumberRefinement(
      z.union([z.number(), z.string()]),
      'Academic Level is required'
    )
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
        message: 'End Date must be greater then start date',
        path: ['endDate']
      });
    }
  });
