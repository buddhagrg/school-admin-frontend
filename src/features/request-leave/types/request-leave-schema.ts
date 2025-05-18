import { parseISO } from 'date-fns';
import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const LeaveFormSchema = z
  .object({
    policyId: stringNumberRefinement('Leave Type is required'),
    fromDate: z.union([z.date(), z.string()]).nullable(),
    toDate: z.union([z.date(), z.string()]).nullable(),
    note: z.string().optional()
  })
  .superRefine((data, ctx) => {
    const { fromDate, toDate } = data;
    const formattedFromDate = typeof fromDate === 'string' ? parseISO(fromDate) : fromDate;
    const formattedToDate = typeof toDate === 'string' ? parseISO(toDate) : toDate;
    if (!formattedFromDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fromDate'],
        message: 'Required'
      });
    }
    if (!formattedToDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['toDate'],
        message: 'Required'
      });
    }
    if (formattedFromDate && formattedToDate && formattedFromDate > formattedToDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fromDate'],
        message: '"From Date" must be less than or equal to "To Date"'
      });
    }
  });

export const LeaveRequestFilterSchema = z
  .object({
    statusId: z.union([z.string(), z.number()]).optional(),
    policyId: z.union([z.string(), z.number()]).optional(),
    dateRangeId: z.string().optional(),
    fromDate: z.union([z.string(), z.date()]).nullable().optional(),
    toDate: z.union([z.string(), z.date()]).nullable().optional()
  })
  .superRefine((data, ctx) => {
    const { dateRangeId, fromDate, toDate } = data;
    const formattedFromDt = typeof fromDate === 'string' ? parseISO(fromDate) : null;
    const formattedToDt = typeof toDate === 'string' ? parseISO(toDate) : null;

    if (dateRangeId === 'CUSTOM') {
      if (!formattedFromDt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['fromDate'],
          message: 'Required'
        });
      }
      if (!formattedToDt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['toDate'],
          message: 'Required'
        });
      }
      if (formattedFromDt && formattedToDt && formattedFromDt > formattedToDt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['fromDate'],
          message: '"From Date" must be less than or equal to "To Date"'
        });
      }
    }
  });
