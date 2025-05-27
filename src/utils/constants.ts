import type { NameIdType, UserActions } from '../shared/types';

export const GENDERS: NameIdType<string>[] = [
  { id: 'MALE', name: 'Male' },
  { id: 'FEMALE', name: 'Female' },
  { id: 'OTHER', name: 'Other' }
];

export const USER_ACTION_MENUS: Partial<Record<UserActions, string>> = {
  VIEW_DETAIL: 'View Detail',
  EDIT_DETAIL: 'Edit Detail',
  ENABLE_SYSTEM_ACCESS: 'Enable System Access',
  DISABLE_SYSTEM_ACCESS: 'Disable System Access',
  RESEND_VERIFICATION_EMAIL_TO_USER: 'Resend Verification Email',
  RESEND_PWD_LINK_EMAIL_TO_USER: 'Resend Password Setup Link'
};
export const menuItemTexts: Record<string, string> = {
  APPROVE_NOTICE: 'Approve Notice',
  REJECT_NOTICE: 'Reject Notice',
  DELETE_NOTICE: 'Delete Notice',
  DELETE_NOTICE_BY_SELF: 'Delete Notice'
};

export const ATTENDANCE_STATUS_LIST: NameIdType<string>[] = [
  { id: 'PRESENT', name: 'Present' },
  { id: 'ABSENT', name: 'Absent' },
  { id: 'EARLY_LEAVE', name: 'Early Leave' },
  { id: 'LATE_PRESENT', name: 'Late Present' }
];

export const BLOOD_GROUPS: NameIdType<string>[] = [
  { id: 'A+', name: 'A+' },
  { id: 'A-', name: 'A-' },
  { id: 'B+', name: 'B+' },
  { id: 'B-', name: 'B-' },
  { id: 'AB+', name: 'AB+' },
  { id: 'AB-', name: 'AB-' },
  { id: 'O+', name: 'O+' },
  { id: 'O-', name: 'O-' }
];

export const STATUS_LIST: Array<{ id: boolean; name: string; label: string }> = [
  { id: true, name: 'Active', label: 'Yes' },
  { id: false, name: 'Inactive', label: 'No' }
];
