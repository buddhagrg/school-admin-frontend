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
