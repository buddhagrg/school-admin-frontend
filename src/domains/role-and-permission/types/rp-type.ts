import { z } from 'zod';
import { AddEditRoleSchema } from './rp-schema';

export type SubPermission = {
  id: number;
  name: string;
  isPermissionAvailable?: boolean;
};

export type Permission = {
  id: number;
  name: string;
  isPermissionAvailable?: boolean;
  subMenus?: [] | SubPermission[];
};

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
  permissions: Permission[];
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
  permissions: Permission[] | [];
};

export type RolesAndPermissionState = {
  permissions: Permission[] | [];
  roleTab: number;
  secondaryTab: number;
  anchorElement: HTMLElement | null;
  currentRole: CurrentRole;
};

export type Action =
  | { type: 'SET_PERMISSIONS'; payload: Permission[] | [] }
  | { type: 'SET_ROLE_TAB'; payload: number }
  | { type: 'SET_SECONDARY_TAB'; payload: number }
  | { type: 'SET_ROLE_USERS'; payload: User[] | [] }
  | { type: 'SET_ROLE_ID'; payload: number | null }
  | { type: 'SET_ROLE_PERMISSIONS'; payload: Permission[] | [] };

export type AddEditRoleProps = z.infer<typeof AddEditRoleSchema>;

export type RolePermission = {
  id: number;
  permissions: string;
};

export type UserRole = {
  id: number;
  roleId: number;
};

export type Menu = {
  id: number;
  name: string;
  subMenus?: [
    {
      id: number;
      name: string;
    }
  ];
};

export type MenuData = {
  menus: Menu[];
};
export type HandleRoleStatus = {
  id: number;
  status: boolean;
};
