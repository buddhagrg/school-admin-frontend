import { ReactNode } from 'react';

export type Column = {
  value: string;
  label: string;
  minWidth?: number;
  colSpan?: number;
};

export type NameIdType<T = string | number> = {
  name: string;
  id: T;
};

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
