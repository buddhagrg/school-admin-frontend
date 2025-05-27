import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password must be at least 6 characters')
});

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current Password is required'),
    newPassword: z.string().min(1, 'New Password is required'),
    confirmNewPassword: z.string().min(1, 'Confirm Password is required')
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New password and re-typed password do not match. Please re-enter them.'
  });

export const PasswordActionFormSchema = z
  .object({
    password: z.string().min(1, 'New Password is required'),
    confirmPassword: z.string().min(1, 'Confirm Password is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords don’t match. Please re-enter them.'
  });

export const ForgotPwdFormSchema = z.object({
  email: z.string().email()
});
