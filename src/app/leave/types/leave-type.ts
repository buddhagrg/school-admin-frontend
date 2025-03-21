import { z } from 'zod';
import { LeaveRequestFormSchema, PolicyUsersSchema } from './leave-schema';
import { NameIdType } from '@/types';
import { UserAccountBasic } from '@/app/manage-users/types';

export type LeavePolicy = {
  id: number;
  name: string;
  icon: string;
  isActive: boolean;
  totalUsersAssociated: number;
};

export type MyLeavePolicy = {
  id: number;
  name: string;
  icon: string;
  totalDaysUsed: number;
};

export type MyLeaveRequestDetail = {
  id: number;
  user: string;
  from: string;
  status: string;
  statusId: number;
  to: string;
  note: string;
  policy: string;
  policyId: number;
  days: number;
  submitted: string;
  updated: string;
  approved: string;
  approver: string;
};

export type PolicyUser = {
  id: number;
  name: string;
  role: string;
  totalDaysUsed: string;
};

export type PolicyDetail = {
  id: number;
  name: string;
  operation: string;
};

export type PolicyUsers = z.infer<typeof PolicyUsersSchema>;

export type LeaveRequestForm = z.infer<typeof LeaveRequestFormSchema>;
export type LeaveRequestFormWithId = LeaveRequestForm & { id: number | undefined };
export type LeaveRequestHistory = {
  leaveHistory: MyLeaveRequestDetail[];
};
export type PendingLeaveRequestHistory = {
  pendingLeaves: MyLeaveRequestDetail[];
};
export type LeavePolicyData = {
  leavePolicies: LeavePolicy[];
};

export type EligiblePolicyUsers = {
  users: NameIdType[];
};

export type PolicyUserData = {
  users: PolicyUser[];
};

export type AddUserToPolicy = {
  userList: string;
  id: number;
};

export type RemoveUserFromPolicy = {
  userId: number;
  policyId: number;
};

export type PolicyStatus = {
  id: number;
  status: boolean;
};

export type LeaveStatusProps = {
  id: number;
  status: LeaveStatusType;
};

export type MyLeavePolicyData = {
  leavePolicies: MyLeavePolicy[];
};

export type LeaveHistory = {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  days: number;
};
export type UserDetailWithLeavePolicies = {
  leaveHistory: LeaveHistory[];
  leavePolicies: LeavePolicy[];
  user: Pick<UserAccountBasic, 'id' | 'name' | 'role' | 'email'>;
};
export type LeaveRequestForOther = LeaveRequestForm & { userId: number };
export type LeaveStatusType = 'APPROVED' | 'CANCELLED' | 'REVIEW_REQUEST';
