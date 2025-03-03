import { api, Tag } from '@/api';
import { AddStudent, GetStudentDetailProps, StudentProps, StudentPropsWithId } from './types';
import { ApiResponseSuccessMessage } from '@/types';

const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudentDetail: builder.query<GetStudentDetailProps, string | undefined>({
      query: (id) => (id ? `/students/${id}` : `/account/me`),
      providesTags: (result) => (result ? [{ type: Tag.STUDENTS, id: result.id }] : [])
    }),
    addStudent: builder.mutation<AddStudent, StudentProps>({
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
      invalidatesTags: (_result, error, { id }) => (error ? [] : [{ type: Tag.STUDENTS, id }])
    })
  })
});

export const { useGetStudentDetailQuery, useAddStudentMutation, useUpdateStudentMutation } =
  studentApi;
