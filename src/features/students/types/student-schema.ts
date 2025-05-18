import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const PersonalFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: stringNumberRefinement('Gender is required'),
  dob: z.union([z.date(), z.string()]),
  classId: stringNumberRefinement('Class is required'),
  sectionId: stringNumberRefinement('Section is required'),
  roll: stringNumberRefinement('Roll is required'),
  admissionDate: z.union([z.date(), z.string(), z.null()]).refine(
    (val) => {
      if (!val) return false;
      return true;
    },
    { message: 'Admission Date is required' }
  ),
  bloodGroup: stringNumberRefinement('Blood Group is required'),
  hasSystemAccess: z.boolean()
});

export const ContactFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1, 'Phone is required'),
  currentAddress: z.string().min(1, 'Current Address is required'),
  permanentAddress: z.string().optional().nullable()
});

export const ParentFormSchema = z.object({
  guardianName: z.string().min(1, 'Name is required'),
  guardianPhone: z.string().min(1, 'Phone is required'),
  guardianEmail: z.string().email().or(z.literal('')),
  guardianRelationship: z.string().optional().nullable()
});

export const StudentFormSchema = PersonalFormSchema.extend(ContactFormSchema.shape).extend(
  ParentFormSchema.shape
);

export const StudentFilterSchema = z
  .object({
    classId: z.union([z.number(), z.string()]),
    sectionId: z.union([z.number(), z.string()])
  })
  .partial();
