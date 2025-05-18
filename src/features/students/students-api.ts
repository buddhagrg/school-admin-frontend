import type {
  AddStudent,
  GetStudentDetail,
  StudentFilterProps,
  StudentFormProps,
  StudentPropsWithId,
  StudentsData
} from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { getQueryString } from '@/utils/helpers/get-query-string';
import { StudentAccount } from '../account/account-type';
import { baseApi, Tag } from '@/api';

const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<StudentsData, StudentFilterProps | void>({
      query: (payload) => {
        const query = getQueryString(payload);
        return `/students${query}`;
      },
      providesTags: (result, error) =>
        error
          ? []
          : result?.students?.map(({ id }) => ({
              type: Tag.STUDENTS,
              id
            })) || [Tag.STUDENTS]
    }),
    getStudentDetail: builder.query<StudentAccount, GetStudentDetail>({
      query: ({ id, mode }) => `/students/${id}?mode=${mode}`,
      providesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.STUDENT_DETAIL, id }])
    }),
    addStudent: builder.mutation<AddStudent, StudentFormProps>({
      query: (payload) => ({
        url: `/students`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.STUDENTS])
    }),
    updateStudent: builder.mutation<ApiResponseSuccessMessage, StudentPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { id }) =>
        error
          ? []
          : [
              { type: Tag.STUDENTS, id },
              { type: Tag.STUDENT_DETAIL, id }
            ]
    })
  })
});

export const {
  useGetStudentsQuery,
  useGetStudentDetailQuery,
  useAddStudentMutation,
  useUpdateStudentMutation
} = studentsApi;
