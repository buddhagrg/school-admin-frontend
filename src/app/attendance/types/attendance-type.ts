import { z } from 'zod';
import {
  StaffAttendanceCurrentFilterSchema,
  StaffAttendanceFilterSchema,
  StudentsAttendanceCurrentFilterSchema,
  StudentsAttendanceFilterSchema
} from './attendance-schema';

export type UserAttendance = {
  id: number;
  status: string | null;
  remarks?: string | null;
};
export type UserAttendanceProps = {
  attendances: UserAttendance[];
};
export type UserAttendanceCommonDetail = {
  id: number;
  name: string;
  attendanceStatus: string | null;
  attendanceStatusCode: string | null;
  remarks: string | null;
};
type RecordDetail = Pick<UserAttendanceCommonDetail, 'id' | 'name'> & {
  totalOperatingDays: number;
  totalPresentDays: number;
};
export type StudentsForAttendanceData = {
  students: UserAttendanceCommonDetail[];
};
export type StudentsAttendanceFilterProps = z.infer<typeof StudentsAttendanceFilterSchema>;
export type StudentsAttendanceRecord = {
  students: RecordDetail[];
};
export type StaffForAttendanceData = {
  staff: UserAttendanceCommonDetail[];
};
export type StaffAttendanceFilterProps = z.infer<typeof StaffAttendanceFilterSchema>;
export type StaffAttendanceRecord = {
  staff: RecordDetail[];
};
export type StaffAttendanceCurrentFilterProps = z.infer<typeof StaffAttendanceCurrentFilterSchema>;
export type StudentsAttendanceCurrentFilterProps = z.infer<
  typeof StudentsAttendanceCurrentFilterSchema
>;
