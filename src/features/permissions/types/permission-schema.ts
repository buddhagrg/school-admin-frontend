import { z } from 'zod';

export const AddEditPermissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  path: z.string().optional(),
  method: z.string().optional(),
  directAllowedRoleId: z.string().optional()
});
