import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(5, 'Password must be at least 6 characters')
});

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current Password is required'),
    newPassword: z.string().min(1, 'New Password is required'),
    confirmNewPassword: z.string().min(1, 'Confirm Password is required')
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmPassword'],
    message: 'New Password and Confirm Password do not match'
  });

export const SetupPasswordSchema = z
  .object({
    password: z.string().min(1, 'New Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'New Password and Confirm Password do not match'
  });

export const ResetPwdFormSchema = z.object({
  email: z.string().email()
});
