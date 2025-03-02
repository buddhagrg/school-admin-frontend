import { NameIdType } from './types';

export const noticeStatusList: NameIdType[] = [
  { id: 1, name: 'Draft' },
  { id: 2, name: 'Submit for Approval' }
];

export const genders: NameIdType<string>[] = [
  { name: 'Male', id: 'Male' },
  { name: 'Female', id: 'Female' },
  { name: 'Other', id: 'Other' }
];

export const maritalStatusList: NameIdType<string>[] = [
  { name: 'Single', id: 'Single' },
  { name: 'Married', id: 'Married' },
  { name: 'Divorced', id: 'Divorced' },
  { name: 'Widowed', id: 'Widowed' }
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
