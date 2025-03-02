import { z } from 'zod';

export const AddClassToLevelFormSchema = z.object({
  id: z.union([z.string(), z.number()]).refine(
    (val) => {
      if (typeof val === 'string' && val === '') return false;
      if (typeof val === 'number' && val <= 0) return false;
      return true;
    },
    { message: 'You must select at least one class' }
  )
});
