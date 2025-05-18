import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const PersonalFormSchema = z.object({
  roleId: stringNumberRefinement('Role is required'),
  name: z.string().min(1, 'Name is required'),
  gender: stringNumberRefinement('Gender is required'),
  dob: z.union([z.date(), z.string()]),
  joinDate: z.union([z.date(), z.string(), z.null()]).refine(
    (val) => {
      if (!val) return false;
      return true;
    },
    { message: 'Join Date is required' }
  ),
  maritalStatus: stringNumberRefinement('Marital Status is required'),
  bloodGroup: stringNumberRefinement('Blood Group is required'),
  hasSystemAccess: z.boolean()
});

export const ContactFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1, 'Phone is required'),
  departmentId: z.union([z.string(), z.number()]).optional().nullable(),
  currentAddress: z.string().min(1, 'Current Address is required'),
  permanentAddress: z.string().optional().nullable(),
  qualification: z.string().optional().nullable(),
  experience: z.string().optional().nullable()
});

export const ErContactFormSchema = z.object({
  guardianName: z.string().min(1, 'Name is required'),
  guardianPhone: z.string().min(1, 'Phone is required'),
  guardianEmail: z.string().email().or(z.literal('')),
  guardianRelationship: z.string().optional().nullable()
});

export const StaffFormSchema = PersonalFormSchema.extend(ContactFormSchema.shape).extend(
  ErContactFormSchema.shape
);
