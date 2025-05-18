import type { LeaveDetail } from '@/shared/types';
import type { Notice } from '../notices/types';

export type GeneralData = {
  title: string;
  totalCount: number;
  percentDifference: number;
  totalCountPreviousYear: number;
};

export type CelebrationProps = {
  type: 'B' | 'A'; // B = birthday, A= Anniversary
  user: string;
  event: string;
  eventDate: string;
};

export type AdminDashboardProps = {
  students: GeneralData;
  teachers: GeneralData;
  parents: GeneralData;
  notices: Notice[];
  celebrations: CelebrationProps[];
  oneMonthLeave: LeaveDetail[];
};

export type DefaultDashboardProps = {
  notices: Notice[];
  celebrations: CelebrationProps[];
  oneMonthLeave: LeaveDetail[];
};

export type StudentDashboardProps = {
  notices: Notice[];
  celebrations: CelebrationProps[];
  oneMonthLeave: LeaveDetail[];
};

export type StaticRole =
  | 'SYSTEM_ADMIN'
  | 'ADMIN'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT'
  | 'ACCOUNTANT'
  | 'HR'
  | 'DEFAULT';

export type DashboardData = AdminDashboardProps | DefaultDashboardProps | StudentDashboardProps;
