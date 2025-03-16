import { MyLeavePolicy } from '@/app/leave/types';
import { Notice } from '@/app/notice/types';

export type GeneralData = {
  title: string;
  totalNumberCurrentYear: number;
  totalNumberPercInComparisonFromPrevYear: number;
  totalNumberValueInComparisonFromPrevYear: number;
};

export type CelebrationProps = {
  userId: number;
  user: string;
  event: string;
  eventDate: string;
};

export type WhoIsOutProps = {
  fromDate: string;
  toDate: string;
  user: string;
  userId: number;
  leaveType: string;
};

export type DashboardProps = {
  students: GeneralData;
  teachers: GeneralData;
  parents: GeneralData;
  notices: Notice[];
  leavePolicies: MyLeavePolicy[];
  celebrations: CelebrationProps[];
  oneMonthLeave: WhoIsOutProps[];
};
