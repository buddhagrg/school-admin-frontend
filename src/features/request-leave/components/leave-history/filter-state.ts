import type { LeaveRequestFilterProps } from '../../types';

export const filterState: LeaveRequestFilterProps = {
  statusId: '',
  policyId: '',
  dateRangeId: 'LAST_15_DAYS_AND_NEXT_15_DAYS',
  fromDate: null,
  toDate: null
};
