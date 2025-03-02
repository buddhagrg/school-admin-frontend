import { z } from 'zod';
import { AddEditPermissionSchema } from './permission-schema';
import { ReactNode } from 'react';

export type BasePermissionProps = {
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
  directAllowedRoleId: string;
  icon?: ReactNode;
};
export type PermissionProps = BasePermissionProps & {
  subMenus?: BasePermissionProps[];
};
export type AddEditPermissionProps = z.infer<typeof AddEditPermissionSchema>;
export type AddEditPermissionPropsWithId = AddEditPermissionProps & { id: number };

export type PermissionData = {
  permissions: PermissionProps[];
};
export type PermissionFormProps = {
  action: string;
  id: number;
  name: string;
  path: string;
  type: string;
  method: string;
  directAllowedRoleId: string;
};
