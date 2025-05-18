import { z } from 'zod';

export const SchoolSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().min(1, 'Email is required')
});
