import { api, Tag } from '@/api';
import {
  AddStudent,
  GetStudentDetailProps,
  ReviewStudentStatusRequest,
  StudentProps,
  StudentPropsWithId
} from '../types';

export const studentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudentDetail: builder.query<GetStudentDetailProps, string | undefined>({
      query: (id) => (id ? `/students/${id}` : `/account/me`),
      providesTags: (result) => (result ? [{ type: Tag.STUDENTS, id: result.id }] : [])
    }),
    reviewStudentStatus: builder.mutation<{ message: string }, ReviewStudentStatusRequest>({
      query: ({ id, status }) => ({
        url: `/students/${id}/status`,
        method: 'POST',
        body: { status }
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STUDENTS, id }]
    }),
    addStudent: builder.mutation<AddStudent, StudentProps>({
      query: (payload) => ({
        url: `/students`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [Tag.STUDENTS]
    }),
    updateStudent: builder.mutation<{ message: string }, StudentPropsWithId>({
      query: ({ id, ...payload }) => ({
        url: `/students/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: Tag.STUDENTS, id }]
    })
  })
});

export const {
  useGetStudentDetailQuery,
  useReviewStudentStatusMutation,
  useAddStudentMutation,
  useUpdateStudentMutation
} = studentApi;
