import { z } from 'zod';

export const AddEditRoleSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required')
});
