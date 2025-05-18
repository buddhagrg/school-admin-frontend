import { ReactNode } from 'react';
import { z } from 'zod';
import {
  LoginSchema,
  PasswordSchema,
  ResetPwdFormSchema,
  SetupPasswordSchema
} from './auth-schema';
import type { BasePermissionProps, PermissionProps } from '@/features/permissions/types';
import { StaticRole } from '@/features/dashboard/dashboard-type';

export type SubMenu = {
  id: number;
  name: string;
  path: string;
};

export type Menu = {
  id: number;
  name: string;
  path: string;
  icon: ReactNode;
  subMenus: SubMenu[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  menus: PermissionProps[];
  apis: BasePermissionProps[];
  uis: BasePermissionProps[];
  roleId: StaticRole;
  appBase: string;
};

export type LoginRequest = z.infer<typeof LoginSchema>;

export type PasswordProps = z.infer<typeof PasswordSchema>;

export type SetupPasswordProps = z.infer<typeof SetupPasswordSchema>;

export type UserId = {
  userId: number;
};

export type ResetPwdFormProps = z.infer<typeof ResetPwdFormSchema>;
