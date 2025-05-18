import { z } from 'zod';
import { ContactFormSchema, ErContactFormSchema, StaffFormSchema } from './staff-schema';

export type StaffData = {
  staff: Staff[];
};
export type ContactFormProps = z.infer<typeof ContactFormSchema>;
export type ErContactFormProps = z.infer<typeof ErContactFormSchema>;
export type StaffFormProps = z.infer<typeof StaffFormSchema>;
export type StaffFormPropsWithId = StaffFormProps & { id: number };
export type Staff = {
  id: number;
  role: string;
  staffId: string;
  name: string;
  department: string;
  email: string;
  hasSystemAccess: boolean;
};

export type GetStaffDetail = {
  id: number;
  mode: 'edit' | 'view';
};
