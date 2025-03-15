import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const AddClassToLevelFormSchema = z.object({
  id: stringNumberRefinement(z.union([z.string(), z.number()]), 'Class is required')
});
