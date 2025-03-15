import { z } from 'zod';

export const stringNumberRefinement = (message: string) =>
  z.union([z.number().positive(message), z.string().min(1, message)]);
