import { z } from 'zod';
import {
  CalendarEnum,
  SchoolContactSchema,
  SchoolFormSchema,
  SchoolGeneralSchema,
  SchoolLegalSchema,
  SchoolPreferencesSchema
} from './school-setting-schema';

export type SchoolFormProps = z.infer<typeof SchoolFormSchema>;
export type SchoolGeneralProps = z.infer<typeof SchoolGeneralSchema>;
export type SchoolContactProps = z.infer<typeof SchoolContactSchema>;
export type SchoolLegalProps = z.infer<typeof SchoolLegalSchema>;
export type SchoolPreferencesProps = z.infer<typeof SchoolPreferencesSchema>;
export type SchoolCalendar = (typeof CalendarEnum)[number];
export type SchoolDataResponse = {
  name: string;
  code: string;
  motto: string;
  establishedYear: string;
  email: string;
  phone: string;
  address: string;
  websiteUrl: string;
  pan: string;
  registration: string;
  calendarType: SchoolCalendar;
};
