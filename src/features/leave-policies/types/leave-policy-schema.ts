import { z } from 'zod';

export const PolicyFormSchema = z.object({
  name: z.string().min(1, 'Policy name is required'),
  isActive: z.boolean()
});

export const PolicyUsersSchema = z.object({
  users: z.array(z.number()).min(1, 'At least one user must be selected')
});
