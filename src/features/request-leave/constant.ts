import type { NameIdType, Status } from '@/shared/types';

export const LEAVE_STATUS_LIST: Status[] = [
  { code: 'PENDING', name: 'Pending' },
  { code: 'APPROVED', name: 'Approved' },
  { code: 'REJECTED', name: 'Rejected' }
];

export const LEAVE_HISTORY_DATE_RANGES: NameIdType<string>[] = [
  { id: 'LAST_15_DAYS_AND_NEXT_15_DAYS', name: 'Recent Leaves' },
  { id: 'LAST_30_DAYS', name: 'Last 30 Days' },
  { id: 'LAST_6_MONTHS', name: 'Last 6 Months' },
  { id: 'LAST_YEAR', name: 'Last Year' },
  { id: 'THIS_YEAR', name: 'This Year' },
  { id: 'NEXT_2_MONTHS', name: 'Next 2 Months' },
  { id: 'CUSTOM', name: 'Custom' }
];
