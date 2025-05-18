import type { NameIdType, Status } from '@/shared/types';

export const NOTICE_STATUS_LIST: Status[] = [
  { code: 'DRAFT', name: 'Draft', action: 'Save as Draft' },
  { code: 'PENDING', name: 'Pending', action: 'Submit for Review' },
  { code: 'REJECTED', name: 'Rejected', action: 'Reject' },
  { code: 'APPROVED', name: 'Approved', action: 'Approve' },
  { code: 'PUBLISHED', name: 'Published', action: 'Publish' }
] as const;

export const DATE_RANGES: NameIdType<string>[] = [
  { id: 'LAST_7_DAYS', name: 'Last 7 Days' },
  { id: 'LAST_30_DAYS', name: 'Last 1 Month' },
  { id: 'LAST_3_MONTHS', name: 'Last 3 Months' },
  { id: 'LAST_6_MONTHS', name: 'Last 6 Months' },
  { id: 'THIS_YEAR', name: 'This Year' },
  { id: 'CUSTOM', name: 'Custom' }
];
