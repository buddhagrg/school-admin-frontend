import { z } from 'zod';

export const AcademicLevelFormSchema = z.object({
  name: z.string().min(1, 'Academic level name is required')
});

export const AcademicPeriodFormSchema = z.object({
  name: z.string().min(1, 'Period name is required'),
  academicLevelId: z.union([z.number(), z.string()]).refine(
    (val) => {
      if (typeof val === 'string' && val === '') return false;
      if (typeof val === 'number' && val <= 0) return false;
      return true;
    },
    { message: 'Academic Levelis required' }
  )
});

export const AddClassToLevelForm = z.object({
  id: z.union([z.string(), z.number()]).refine(
    (val) => {
      if (typeof val === 'string' && val === '') return false;
      if (typeof val === 'number' && val <= 0) return false;
      return true;
    },
    { message: 'You must select at least one class' }
  )
});

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

export const PeriodDateFormSchema = z.array(PeriodDateSchema);
