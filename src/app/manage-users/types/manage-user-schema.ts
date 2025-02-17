import { z } from 'zod';

export const UserFilterSchema = z
  .object({
    roleId: z.union([z.number(), z.string()]),
    name: z.string(),
    classId: z.union([z.number(), z.string()]),
    sectionId: z.union([z.number(), z.string()]),
    roll: z.string()
  })
  .partial();
