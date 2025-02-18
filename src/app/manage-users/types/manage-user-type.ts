import { z } from 'zod';
import { UserFilterSchema } from './manage-user-schema';

export type UserAccountBasic = {
  id: number;
  name: string;
  email: string;
  role: string;
  hasSystemAccess: boolean;
  lastLogin: string;
  staticRoleId: number;
};

export type UsersData = {
  users: UserAccountBasic[];
};
export type UserFilterProps = z.infer<typeof UserFilterSchema>;
export type UserSystemAccessRequest = {
  id: number;
  hasSystemAccess: boolean;
};
