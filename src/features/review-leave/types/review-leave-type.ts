import type { LeaveDetail } from '@/shared/types';

export type PendingLeavesData = {
  pendingLeaves: LeaveDetail[];
};
export type RejectLeave = {
  id: number;
  note: string;
};
