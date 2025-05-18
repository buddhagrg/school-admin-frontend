import { z } from 'zod';
import { PolicyFormSchema, PolicyUsersSchema } from './leave-policy-schema';
import type { NameIdType } from '@/shared/types';

export type PolicyFormProps = z.infer<typeof PolicyFormSchema>;
export type PolicyFormPropsWithId = PolicyFormProps & { id: number };

export type LeavePolicyData = {
  leavePolicies: LeavePolicy[];
};

export type LeavePolicy = {
  id: number;
  name: string;
  isActive: boolean;
  totalUsersAssociated: number;
};

export type PolicyUser = {
  id: number;
  name: string;
  role: string;
};

export type PolicyUserData = {
  users: PolicyUser[];
};

export type PolicyUsersProps = z.infer<typeof PolicyUsersSchema>;
export type EligiblePolicyUsers = {
  users: NameIdType[];
};
export type AddUserToPolicy = {
  users: string;
  id: number;
};
export type RemoveUserFromPolicy = {
  userId: number;
  policyId: number;
};
type MyLeavePolicy = {
  id: number;
  name: string;
  daysUsed: number;
};
export type MyLeavePolicyData = {
  leavePolicies: MyLeavePolicy[];
};
