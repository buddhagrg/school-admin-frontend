import { z } from 'zod';
import { AddEditPermissionSchema } from './permission-schema';
import { PermissionProps } from '@/utils/type/misc';

export type AddEditPermissionProps = z.infer<typeof AddEditPermissionSchema>;
export type AddEditPermissionPropsWithId = AddEditPermissionProps & { id: number };

export type PermissionData = {
  permissions: PermissionProps[];
};
