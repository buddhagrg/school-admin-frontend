import { z } from 'zod';
import {
  AttendanceFormSchema,
  TakeStaffAttendanceFilterSchema,
  GetStaffAttendanceFilterSchema,
  TakeStudentsAttendanceFilterSchema,
  GetStudentsAttendanceFilterSchema
} from './attendance-schema';
import { NameIdType } from '@/types';

export type UserAttendance = {
  userId: number;
  status: string | null;
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
  attendanceStatusCode: string | null;
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
export type AttendanceStatus = 'PR' | 'AB' | 'LP' | 'EL';
export type AttendanceStatusColor = 'success' | 'error' | 'warning' | 'primary';
