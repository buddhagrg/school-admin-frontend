import { z } from 'zod';

export const stringNumberRefinement = <T extends z.ZodTypeAny>(schema: T, message: string) => {
  return schema.refine(
    (value) => {
      if (typeof value === 'string' && value === '') return false;
      if (typeof value === 'number' && value <= 0) return false;
      return true;
    },
    { message }
  );
};
