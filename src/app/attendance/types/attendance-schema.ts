import { z } from 'zod';

const CommonFilterSchema = z.object({
  name: z.string().optional(),
  academicYearId: z.union([z.number(), z.string()]),
  dateFrom: z.union([z.date(), z.string()]).nullable(),
  dateTo: z.union([z.date(), z.string()]).nullable()
});
export const StudentsAttendanceFilterSchema = CommonFilterSchema.extend({
  classId: z.union([z.number(), z.string()]),
  sectionId: z.union([z.number(), z.string()])
});

export const StaffAttendanceFilterSchema = CommonFilterSchema.extend({
  roleId: z.union([z.number(), z.string()])
}).partial();

export const StaffAttendanceCurrentFilterSchema = z
  .object({
    name: z.string(),
    roleId: z.union([z.number(), z.string()])
  })
  .partial();
export const StudentsAttendanceCurrentFilterSchema = z.object({
  name: z.string().optional(),
  classId: z.union([z.number(), z.string()]).refine(
    (value) => {
      if (typeof value === 'string' && value === '') return false;
      if (typeof value === 'number' && value <= 0) return false;
      return true;
    },
    {
      message: 'Class is required'
    }
  ),
  sectionId: z.union([z.number(), z.string()]).optional()
});
