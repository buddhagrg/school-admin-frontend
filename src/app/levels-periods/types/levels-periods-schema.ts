import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const AcademicLevelFormSchema = z.object({
  name: z.string().min(1, 'Academic level name is required')
});

export const AcademicPeriodFormSchema = z.object({
  name: z.string().min(1, 'Period name is required'),
  academicLevelId: stringNumberRefinement('Academic Level is required')
});
