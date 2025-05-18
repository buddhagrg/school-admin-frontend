import { z } from 'zod';

export const RoleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  status: z.boolean()
});
