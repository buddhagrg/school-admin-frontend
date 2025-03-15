import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

const BaseAttendanceRecordFilterSchema = z.object({
  name: z.string().optional(),
  academicYearId: stringNumberRefinement(
    z.union([z.number(), z.string()]),
    'Academic Year is required'
  ),
  dateFrom: z.union([z.date(), z.string()]).nullable(),
  dateTo: z.union([z.date(), z.string()]).nullable()
});

const validateDateRange = <T extends z.ZodTypeAny>(schema: T) => {
  return schema.superRefine((data, ctx) => {
    const { dateFrom, dateTo } = data;
    const _dateFrom = dateFrom ? new Date(dateFrom) : null;
    const _dateTo = dateTo ? new Date(dateTo) : null;

    if (_dateFrom && _dateTo && isNaN(_dateFrom.getTime())) {
      ctx.addIssue({
        message: `'From' date is invalid`,
        code: z.ZodIssueCode.custom,
        path: ['dateFrom']
      });
    }

    if (_dateTo && _dateFrom && isNaN(_dateTo.getTime())) {
      ctx.addIssue({
        message: `'To' date is invalid`,
        code: z.ZodIssueCode.custom,
        path: ['dateTo']
      });
    }

    if (_dateFrom && _dateTo && _dateFrom > _dateTo) {
      ctx.addIssue({
        message: "'From' date range must be greater than or equal to 'To' date range",
        code: z.ZodIssueCode.custom,
        path: ['dateFrom']
      });
    }
  }) as unknown as T;
};

export const GetStudentsAttendanceFilterSchema = validateDateRange(
  BaseAttendanceRecordFilterSchema.extend({
    classId: stringNumberRefinement(z.union([z.number(), z.string()]), 'Class is required'),
    sectionId: z.union([z.number(), z.string()]).optional(),
    dateType: z.string()
  })
);

export const GetStaffAttendanceFilterSchema = validateDateRange(
  BaseAttendanceRecordFilterSchema.extend({
    roleId: z.union([z.number(), z.string()]).optional(),
    dateType: z.string()
  })
).superRefine((data, ctx) => {
  const { dateType, dateFrom, dateTo } = data;
  if (dateType === 'S' && !dateFrom) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Date is required',
      path: ['dateFrom']
    });
  }

  if (dateType === 'R') {
    if (!dateFrom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date is required',
        path: ['dateFrom']
      });
    }
    if (!dateTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To date is required',
        path: ['dateTo']
      });
    }
    if (dateFrom && dateTo && dateFrom > dateTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '"To date" must be greater than "From Date"',
        path: ['dateTo']
      });
    }
  }
});

export const TakeStaffAttendanceFilterSchema = z.object({
  name: z.string().optional(),
  roleId: z.union([z.number(), z.string()]).optional(),
  attendanceDate: z
    .union([z.date(), z.string(), z.null()])
    .refine((date) => date !== null, { message: 'Attendance Date is required' })
});

export const TakeStudentsAttendanceFilterSchema = z.object({
  name: z.string().optional(),
  classId: stringNumberRefinement(z.union([z.number(), z.string()]), 'Class is required'),
  sectionId: z.union([z.number(), z.string()]).optional(),
  attendanceDate: z
    .union([z.date(), z.string(), z.null()])
    .refine((date) => date !== null, { message: 'Attendance Date is required' })
});
export const AttendanceFormSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  name: z.string().optional(),
  status: z
    .string()
    .nullable()
    .refine((value) => value !== '' || value !== null, { message: 'Status is required' }),
  remarks: z.string().nullable().optional()
});
