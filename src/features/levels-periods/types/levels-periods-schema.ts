import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const AcademicLevelFormSchema = z.object({
  name: z.string().min(1, 'Level name is required')
});

export const AcademicPeriodFormSchema = z
  .object({
    name: z.string().min(1, 'Period name is required'),
    academicLevelId: stringNumberRefinement('Level is required'),
    startDate: z.union([z.date(), z.string(), z.null()]).refine(
      (val) => {
        if (!val) return false;
        return true;
      },
      { message: 'Required' }
    ),
    endDate: z.union([z.date(), z.string(), z.null()]).refine(
      (val) => {
        if (!val) return false;
        return true;
      },
      { message: 'Required' }
    )
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate } = data;
    if (startDate && endDate && startDate > endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['startDate'],
        message: 'Start Date can not be greater than End Date'
      });
    }
  });
