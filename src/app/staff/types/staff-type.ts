import { z } from 'zod';
import {
  AdminStaffSchema,
  BasicInfoSchema,
  ParentsInfoSchema,
  StaffFormSchema
} from './staff-schema';
import { NameIdType } from '@/types';

export type StaffFormProps = z.infer<typeof StaffFormSchema>;
export type AdminStaffProps = z.infer<typeof AdminStaffSchema>;
export type StaffFormPropsWithId = StaffFormProps & { id: number };
export type StaffData = {
  staff: NameIdType[];
};
export type ParentsInfo = z.infer<typeof ParentsInfoSchema>;
export type BasicInfo = z.infer<typeof BasicInfoSchema>;
