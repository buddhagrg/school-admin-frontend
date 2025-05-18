import { parseISO } from 'date-fns';
import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const RecipientTypes = ['EV', 'SP'] as const;
export const NoticeFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    status: stringNumberRefinement('Status is required'),
    recipientType: z.enum(RecipientTypes),
    recipientRole: z.union([z.number(), z.string()]).nullable().optional(),
    firstField: z.union([z.number(), z.string()]).nullable().optional()
  })
  .superRefine((value, ctx) => {
    const { recipientType, recipientRole } = value;
    if (recipientType === 'SP') {
      if (!recipientRole) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Role is required',
          path: ['recipientRole']
        });
      }
    }
  });

export const NoticeFilterSchema = z
  .object({
    statusId: z.union([z.string(), z.number()]).optional(),
    roleId: z.union([z.string(), z.number()]).optional(),
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
