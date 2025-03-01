import { z } from 'zod';

export const AcademicYearFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    startDate: z.union([z.date(), z.string()]).nullable(),
    endDate: z.union([z.date(), z.string()]).nullable(),
    academicLevelId: z.union([z.number(), z.string()]).refine(
      (value) => {
        if (typeof value === 'string' && value === '') return false;
        if (typeof value === 'number' && value <= 0) return false;
        return true;
      },
      {
        message: 'Academic Level is required',
        path: ['academicLevelId']
      }
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
