import { NameIdType } from './types';

export const noticeStatusList: NameIdType<string>[] = [
  { id: 'DRAFTED', name: 'Draft' },
  { id: 'REVIEW_REQUESTED', name: 'Submit for Approval' },
  { id: 'DELETE_REQUESTED', name: 'Submit for deletion' },
  { id: 'REJECTED', name: 'Reject' },
  { id: 'APPROVED', name: 'Approve' },
  { id: 'DELETED', name: 'Delete' }
];

export const genders: NameIdType<string>[] = [
  { id: 'MALE', name: 'Male' },
  { id: 'FEMALE', name: 'Female' },
  { id: 'OTHER', name: 'Other' }
];

export const maritalStatusList: NameIdType<string>[] = [
  { id: 'SINGLE', name: 'Single' },
  { id: 'MARRIED', name: 'Married' },
  { id: 'DIVORCED', name: 'Divorced' },
  { id: 'WIDOWED', name: 'Widowed' }
];

export const menuItemTexts: Record<string, string> = {
  ENABLE_SYSTEM_ACCESS: 'Enable System Access',
  DISABLE_SYSTEM_ACCESS: 'Disable System Access',
  RESEND_VERIFICATION_EMAIL_TO_USER: 'Resend Verification Email',
  RESEND_PWD_LINK_EMAIL_TO_USER: 'Resend Password Setup Link',
  RESET_USER_PWD: 'Reset User Password',
  APPROVE_NOTICE: 'Approve Notice',
  REJECT_NOTICE: 'Reject Notice',
  DELETE_NOTICE: 'Delete Notice',
  DELETE_NOTICE_BY_SELF: 'Delete Notice'
};

export const attendanceStatus: NameIdType<string>[] = [
  { id: 'PRESENT', name: 'Present' },
  { id: 'ABSENT', name: 'Absent' },
  { id: 'EARLY_LEAVE', name: 'Early Leave' },
  { id: 'LATE_PRESENT', name: 'Late Present' }
];
