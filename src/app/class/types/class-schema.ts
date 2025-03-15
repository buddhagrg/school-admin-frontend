import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const ClassFormSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  academicLevelId: stringNumberRefinement(
    z.union([z.number(), z.string()]),
    'Academic Level is required'
  )
});
export const SectionFormSchema = z.object({
  name: z.string().min(1, 'Section name is required'),
  classId: stringNumberRefinement(z.union([z.string(), z.number()]), 'Class is required')
});

export const ClassTeacherFormSchema = z.object({
  classId: stringNumberRefinement(z.union([z.number(), z.string()]), 'Class is required'),
  teacherId: stringNumberRefinement(z.union([z.number(), z.string()]), 'Teacher is required'),
  className: z.string().optional()
});
