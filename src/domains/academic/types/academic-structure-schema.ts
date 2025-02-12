import { z } from 'zod';

export const AcademicLevelFormSchema = z.object({
  name: z.string().min(1, 'Academic level name is required')
});

export const AcademicPeriodFormSchema = z.object({
  name: z.string().min(1, 'Period name is required'),
  academicLevelId: z
    .number()
    .min(1, 'Academic Level is required')
    .or(z.string().min(1, 'Academic Level is required'))
    .optional()
});

export const AddClassToLevelForm = z.object({
  id: z.union([
    z.string().min(1, 'You must select at least one class'),
    z.number().min(1, 'You must select at least one class')
  ])
});
