import { z } from 'zod';
import { AddEditRoleSchema } from './role-schema';
import { BasePermissionProps, PermissionProps } from '@/app/permissions/types';

export type Role = {
  id: number;
  name: string;
  status: boolean;
};
export type RoleWithUsersAssociated = Role & { usersAssociated: number };

export type RolesData = {
  roles: RoleWithUsersAssociated[];
};

export type RolePermissionsData = {
  permissions: PermissionProps[];
};

export type User = {
  id: number;
  name: string;
  lastLogin: string;
};

export type RoleUsersData = {
  id: number;
  role: string;
  users: User[];
};

export type CurrentRole = {
  id: number | null;
  users: User[] | [];
  permissions: ExtendedPermission[] | [];
};

export type RolesAndPermissionState = {
  permissions: ExtendedPermission[] | [];
  roleTab: number;
  secondaryTab: number;
  anchorElement: HTMLElement | null;
  currentRole: CurrentRole;
};

export type Action =
  | { type: 'SET_PERMISSIONS'; payload: ExtendedPermission[] }
  | { type: 'SET_ROLE_TAB'; payload: number }
  | { type: 'SET_SECONDARY_TAB'; payload: number }
  | { type: 'SET_ROLE_USERS'; payload: User[] | [] }
  | { type: 'SET_ROLE_ID'; payload: number | null }
  | { type: 'SET_ROLE_PERMISSIONS'; payload: ExtendedPermission[] | [] };

export type AddEditRoleProps = z.infer<typeof AddEditRoleSchema>;

export type RolePermission = {
  id: number;
  permissions: string[];
};

export type UserRole = {
  id: number;
  roleId: number;
};
export type ExtendedPermission = BasePermissionProps & {
  isPermissionAvailable?: boolean;
  subMenus?: ExtendedPermission[];
};
export type HandleRoleStatusProps = {
  id: number;
  status: boolean;
};
