export type Column = {
  value: string;
  label: string;
  minWidth?: number;
  colSpan?: number;
};

export type NameIdType<T = number> = {
  name: string;
  id: T;
};
export type Status = {
  code: string;
  name: string;
  action?: string;
};
export type ApiResponseSuccessMessage = {
  message: string;
};
export type StatCardProps = {
  title: string;
  totalCount: number;
  totalCountPreviousYear?: number;
  percentDiff: number;
  icon: React.ReactNode;
  bgColor?: string;
};
export type SetupItems = {
  route: string;
  name: string;
  description?: string;
};
export type LeaveDetail = {
  id: number;
  user: string;
  policy: string;
  policyId: number;
  fromDate: Date | string;
  toDate: Date | string;
  note: string;
  reviewerNote: string;
  duration: number;
  status: string;
  statusId: string;
  reviewer: string | null;
  submittedDate: string | null;
  updatedDate: string | null;
  reviewedDate: string | null;
};

export type TableProps<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error?: string;
};

export type UserEntity = 'students' | 'staff';
export type UserSystemAccess = {
  hasSystemAccess: boolean;
  entity: UserEntity;
  userId: number;
};

export type UserActions =
  | 'NO_ACTION'
  | 'VIEW_DETAIL'
  | 'EDIT_DETAIL'
  | 'ENABLE_SYSTEM_ACCESS'
  | 'DISABLE_SYSTEM_ACCESS'
  | 'RESEND_VERIFICATION_EMAIL_TO_USER'
  | 'RESEND_PWD_LINK_EMAIL_TO_USER'
  | 'RESET_USER_PWD';
