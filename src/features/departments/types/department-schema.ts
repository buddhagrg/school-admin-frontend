import { z } from 'zod';

export const DepartmentFormSchema = z.object({
  name: z.string().min(1, 'Name is required')
});
