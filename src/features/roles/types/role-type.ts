import { z } from 'zod';
import { RoleFormSchema } from './role-schema';
import type { BasePermissionProps } from '@/features/permissions/types';
import type { NameIdType } from '@/shared/types';

export type Role = {
  id: number;
  name: string;
  status: boolean;
  staticRole: string;
  isEditable: boolean;
};
export type RoleWithUsersAssociated = Role & { usersAssociated: number };

export type RolesData = {
  roles: RoleWithUsersAssociated[];
};

export type RolePermissionsData = {
  permissions: NameIdType[];
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type RoleUsersData = {
  users: User[];
};

export type RoleFormProps = z.infer<typeof RoleFormSchema>;
export type RoleFormPropsWithId = RoleFormProps & { id: number };
export type Permission = {
  id: number;
  subPermissions?: number[];
};
export type RolePermission = {
  roleId: number;
  permissions: Permission[];
};

export type UserRole = {
  id: number;
  roleId: number;
};
export type ExtendedPermission = BasePermissionProps & {
  isPermissionAvailable?: boolean;
  subMenus?: ExtendedPermission[];
};
