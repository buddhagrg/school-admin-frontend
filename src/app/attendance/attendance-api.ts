import { api, Tag } from '@/api';
import {
  StaffForAttendanceData,
  StudentsForAttendanceData,
  GetStudentsAttendanceFilterProps,
  UserAttendanceProps,
  GetStaffAttendanceFilterProps,
  StudentsAttendanceRecord,
  StaffAttendanceRecord,
  TakeStaffAttendanceFilterProps,
  TakeStudentsAttendanceFilterProps,
  AttendanceFormPropsWithId
} from './types';
import { ApiResponseSuccessMessage } from '@/types';
import { getQueryString } from '@/utils/helpers/get-query-string';

const attendanceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    recordStudentsAttendance: builder.mutation<ApiResponseSuccessMessage, UserAttendanceProps>({
      query: (payload) => ({
        url: `/attendances`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.STUDENTS_FOR_ATTENDANCE, Tag.STUDENTS_ATTENDANCE_RECORD]
    }),
    recordStaffAttendance: builder.mutation<ApiResponseSuccessMessage, UserAttendanceProps>({
      query: (payload) => ({
        url: `/attendances`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [Tag.STAFF_FOR_ATTENDANCE, Tag.STAFF_ATTENDANCE_RECORD]
    }),
    getStudentsForAttendance: builder.query<
      StudentsForAttendanceData,
      TakeStudentsAttendanceFilterProps | void
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/students${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.students?.map(({ userId }) => ({
              type: Tag.STUDENTS_FOR_ATTENDANCE,
              id: userId
            })) || [Tag.STUDENTS_FOR_ATTENDANCE]
    }),
    getStudentsAttendanceRecord: builder.query<
      StudentsAttendanceRecord,
      Omit<GetStudentsAttendanceFilterProps, 'dateType'>
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/students/record${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.students?.map(({ userId }) => ({
              type: Tag.STUDENTS_ATTENDANCE_RECORD,
              id: userId
            })) || [Tag.STUDENTS_ATTENDANCE_RECORD]
    }),
    getStaffForAttendance: builder.query<
      StaffForAttendanceData,
      TakeStaffAttendanceFilterProps | void
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/staff${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.staff?.map(({ userId }) => ({
              type: Tag.STAFF_FOR_ATTENDANCE,
              id: userId
            })) || [Tag.STAFF_FOR_ATTENDANCE]
    }),
    getStaffAttendanceRecord: builder.query<
      StaffAttendanceRecord,
      Omit<GetStaffAttendanceFilterProps, 'dateType'>
    >({
      query: (payload) => {
        const queryString = getQueryString(payload);
        return `/attendances/staff/record${queryString}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.staff?.map(({ userId }) => ({
              type: Tag.STAFF_ATTENDANCE_RECORD,
              id: userId
            })) || [Tag.STAFF_ATTENDANCE_RECORD]
    }),
    updateStaffAttendanceRecord: builder.mutation<
      ApiResponseSuccessMessage,
      AttendanceFormPropsWithId
    >({
      query: ({ id, ...payload }) => ({
        url: `attendances/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: (_result, error, { userId }) =>
        error
          ? []
          : [
              { type: Tag.STAFF_ATTENDANCE_RECORD, id: userId },
              { type: Tag.STAFF_FOR_ATTENDANCE, id: userId }
            ]
    }),
    updateStudentAttendanceRecord: builder.mutation<
      ApiResponseSuccessMessage,
      AttendanceFormPropsWithId
    >({
      query: ({ id, ...payload }) => ({
        url: `attendances/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: (_result, error, { userId }) =>
        error
          ? []
          : [
              { type: Tag.STUDENTS_ATTENDANCE_RECORD, id: userId },
              { type: Tag.STUDENTS_FOR_ATTENDANCE, id: userId }
            ]
    })
  })
});

export const {
  useRecordStaffAttendanceMutation,
  useRecordStudentsAttendanceMutation,
  useGetStaffAttendanceRecordQuery,
  useGetStaffForAttendanceQuery,
  useGetStudentsAttendanceRecordQuery,
  useGetStudentsForAttendanceQuery,
  useUpdateStaffAttendanceRecordMutation,
  useUpdateStudentAttendanceRecordMutation
} = attendanceApi;
