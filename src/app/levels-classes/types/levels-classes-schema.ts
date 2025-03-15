import { z } from 'zod';
import { stringNumberRefinement } from '@/utils/zod-validation';

export const AddClassToLevelFormSchema = z.object({
  id: stringNumberRefinement('Class is required')
});
