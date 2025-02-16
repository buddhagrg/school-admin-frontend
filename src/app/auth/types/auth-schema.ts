import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(5, 'Password must be at least 6 characters')
});

export const PasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old Password is required'),
    newPassword: z.string().min(1, 'New Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'New Password and Confirm Password do not match'
  });

export const SetupPasswordSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'New Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    token: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'New Password and Confirm Password do not match'
  });

export const SchoolProfileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string()
  })
  .superRefine((data, ctx) => {
    const { id, name, email, phone } = data;
    if (!id && (!name || !email || !phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'ID is required',
        path: ['id']
      });

      if (!name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Name is required',
          path: ['name']
        });
      }

      if (!email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email is required',
          path: ['email']
        });
      }

      if (!phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Phone is required',
          path: ['phone']
        });
      }
    }
  });
