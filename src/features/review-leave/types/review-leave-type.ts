import type { LeaveDetail } from '@/types';

export type PendingLeavesData = {
  pendingLeaves: LeaveDetail[];
};
export type RejectLeave = {
  id: number;
  note: string;
};
