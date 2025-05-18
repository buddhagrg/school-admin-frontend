import { z } from 'zod';
import { LeaveRequestFilterSchema, LeaveFormSchema } from './request-leave-schema';
import type { LeaveDetail } from '@/shared/types';

export type MyLeaveHistoryData = {
  leaveHistory: LeaveDetail[];
};
export type LeaveRequestFilterProps = z.infer<typeof LeaveRequestFilterSchema>;
export type LeaveFormProps = z.infer<typeof LeaveFormSchema>;
export type LeaveFormPropsWithId = LeaveFormProps & { id: number };
