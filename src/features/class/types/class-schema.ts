import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const ClassFormSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  academicLevelId: stringNumberRefinement('Academic Level is required'),
  status: z.boolean()
});
export const SectionFormSchema = z.object({
  name: z.string().min(1, 'Section name is required'),
  classId: stringNumberRefinement('Class is required'),
  status: z.boolean()
});

export const ClassTeacherFormSchema = z.object({
  classId: stringNumberRefinement('Class is required'),
  teacherId: stringNumberRefinement('Teacher is required'),
  className: z.string().optional()
});
