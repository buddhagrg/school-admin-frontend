import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const SchoolGeneralSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  motto: z.string().optional().nullable(),
  establishedYear: stringNumberRefinement('Required')
});
export const SchoolContactSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1, 'Phone is required'),
  address: z.string().min(1, 'Address is required'),
  websiteUrl: z.string().optional().nullable()
});
export const SchoolLegalSchema = z.object({
  pan: z.string().min(1, 'PAN is required'),
  registrationNumber: z.string().min(1, 'Required')
});
export const CalendarEnum = ['BS', 'AD'] as const;
export const SchoolPreferencesSchema = z.object({
  calendarType: z.enum(CalendarEnum)
});

export const SchoolFormSchema = SchoolGeneralSchema.extend(SchoolContactSchema.shape)
  .extend(SchoolLegalSchema.shape)
  .extend(SchoolPreferencesSchema.shape);
