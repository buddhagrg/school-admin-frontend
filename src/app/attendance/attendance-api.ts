import { api, Tag } from '@/api';
import {
  StaffForAttendanceData,
  StudentsForAttendanceData,
  StudentsAttendanceFilterProps,
  UserAttendanceProps,
  StaffAttendanceFilterProps,
  StudentsAttendanceRecord,
  StaffAttendanceRecord,
  StaffAttendanceCurrentFilterProps,
  StudentsAttendanceCurrentFilterProps
} from './types';
import { ApiResponseSuccessMessage } from '@/types';
import { getQueryString } from '@/utils/helpers/get-query-string';

const attendanceApi = api.injectEndpoints({
  endpoints: (buider) => ({
    recordStudentsAttendance: buider.mutation<ApiResponseSuccessMessage, UserAttendanceProps>({
      query: ({ attendances }) => ({
        url: `/attendances`,
        method: 'POST',
        body: { attendances }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.STUDENTS_FOR_ATTENDANCE])
    }),
    recordStaffAttendance: buider.mutation<ApiResponseSuccessMessage, UserAttendanceProps>({
      query: ({ attendances }) => ({
        url: `/attendances`,
        method: 'POST',
        body: { attendances }
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.STAFF_FOR_ATTENDANCE])
    }),
    getStudentsForAttendance: buider.query<
      StudentsForAttendanceData,
      StudentsAttendanceCurrentFilterProps | void
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/students${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.students?.map(({ id }) => ({
              type: Tag.STUDENTS_FOR_ATTENDANCE,
              id
            })) || [Tag.STUDENTS_FOR_ATTENDANCE]
    }),
    getStudentsAttendanceRecord: buider.query<
      StudentsAttendanceRecord,
      StudentsAttendanceFilterProps
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/students/record${queryString}`;
      }
    }),
    getStaffForAttendance: buider.query<
      StaffForAttendanceData,
      StaffAttendanceCurrentFilterProps | void
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/staff${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.staff?.map(({ id }) => ({
              type: Tag.STAFF_FOR_ATTENDANCE,
              id
            })) || [Tag.STAFF_FOR_ATTENDANCE]
    }),
    getStaffAttendanceRecord: buider.query<StaffAttendanceRecord, StaffAttendanceFilterProps>({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/staff/record${queryString}`;
      }
    })
  })
});

export const {
  useRecordStaffAttendanceMutation,
  useRecordStudentsAttendanceMutation,
  useGetStaffAttendanceRecordQuery,
  useGetStaffForAttendanceQuery,
  useGetStudentsAttendanceRecordQuery,
  useGetStudentsForAttendanceQuery
} = attendanceApi;
