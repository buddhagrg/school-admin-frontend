import { z } from 'zod';

export const ClassFormSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  academicLevelId: z
    .union([
      z.number().min(1, 'You must select at least one academic level'),
      z.string().min(1, 'You must select at least one academic level')
    ])
    .optional()
});
export const SectionFormSchema = z.object({
  name: z.string().min(1, 'Section name is required'),
  classId: z
    .union([
      z.string().min(1, 'You must select at least one class'),
      z.number().min(1, 'You must select at least one class')
    ])
    .optional()
});

export const ClassTeacherFormSchema = z.object({
  classId: z.union([
    z.number().min(1, 'Class is required'),
    z.string().min(1, 'Class is required')
  ]),
  teacherId: z.union([
    z.number().min(1, 'Teacher is required'),
    z.string().min(1, 'Teacher is required')
  ]),
  className: z.string().optional()
});
