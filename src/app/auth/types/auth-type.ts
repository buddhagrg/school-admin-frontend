import { ReactNode } from 'react';
import { z } from 'zod';
import {
  LoginSchema,
  PasswordSchema,
  SchoolProfileSchema,
  SetupPasswordSchema
} from './auth-schema';
import { BasePermissionProps, PermissionProps } from '@/app/permissions/types';

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
  roleId: number;
  appBase: string;
};

export type LoginRequest = z.infer<typeof LoginSchema>;

export type PasswordProps = z.infer<typeof PasswordSchema>;

export type SetupPasswordProps = z.infer<typeof SetupPasswordSchema>;

export type UserId = {
  userId: number;
};

export type SchoolProfileProps = z.infer<typeof SchoolProfileSchema>;
