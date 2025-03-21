import { z } from 'zod';
import {
  AttendanceFormSchema,
  TakeStaffAttendanceFilterSchema,
  GetStaffAttendanceFilterSchema,
  TakeStudentsAttendanceFilterSchema,
  GetStudentsAttendanceFilterSchema
} from './attendance-schema';
import { NameIdType } from '@/types';
import { attendanceStatus } from '@/constants';

export type AttendanceStatusType = (typeof attendanceStatus)[number]['id'];
export type UserAttendance = {
  userId: number;
  status: AttendanceStatusType;
  remarks?: string | null;
};
export type UserAttendanceProps = {
  attendances: UserAttendance[];
  attendanceDate: string | Date;
};
export type UserAttendanceCommonDetail = {
  id?: number;
  userId: number;
  name: string;
  attendanceStatus: string | null;
  attendanceStatusCode: AttendanceStatusType;
  remarks: string | null;
  attendanceDate: Date | string | null;
  lastUpdatedDate: Date | string | null;
};
export type AttendanceCount = {
  totalOperatingDays: number;
  totalPresentDays: number;
  totalAbsentDays: number;
  totalEarlyLeaveDays: number;
  totalLatePresentDays: number;
  totalLeaveDays: number;
};
export type StudentsForAttendanceData = {
  students: UserAttendanceCommonDetail[];
};
export type GetStudentsAttendanceFilterProps = z.infer<typeof GetStudentsAttendanceFilterSchema>;
export type StudentsAttendanceRecord = AttendanceCount & {
  attendances: UserAttendanceCommonDetail[];
};
export type StaffForAttendanceData = {
  staff: UserAttendanceCommonDetail[];
};
export type GetStaffAttendanceFilterProps = z.infer<typeof GetStaffAttendanceFilterSchema>;
export type StaffAttendanceRecord = AttendanceCount & {
  attendances: UserAttendanceCommonDetail[];
};
export type TakeStaffAttendanceFilterProps = z.infer<typeof TakeStaffAttendanceFilterSchema>;
export type TakeStudentsAttendanceFilterProps = z.infer<typeof TakeStudentsAttendanceFilterSchema>;
export type AttendanceStatusData = {
  attendanceStatus: NameIdType[];
};
export type AttendanceFormPropsWithId = z.infer<typeof AttendanceFormSchema>;
export type UserSetting = 'staff' | 'students';
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE_PRESENT' | 'EARLY_LEAVE' | 'ON_LEAVE';
export type AttendanceStatusColor = 'success' | 'error' | 'warning' | 'primary' | 'info';
