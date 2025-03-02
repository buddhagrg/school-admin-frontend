import { api, Tag } from '@/api';
import { School, SchoolProps, SchoolsData, SchoolWithIdProps } from './types';

const schoolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query<SchoolsData, void>({
      query: () => `/schools`,
      providesTags: (result) =>
        result?.schools?.map(({ schoolId }) => {
          return { type: Tag.SCHOOLS, id: schoolId };
        }) || [{ type: Tag.SCHOOLS }]
    }),
    getSchool: builder.query<School, number>({
      query: (id) => `/schools/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.SCHOOLS, id: result.schoolId }] : [])
    }),
    updateSchool: builder.mutation<{ message: string }, SchoolWithIdProps>({
      query: ({ schoolId, ...payload }) => ({
        url: `/schools/${schoolId}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, error, { schoolId }) =>
        error ? [] : [{ type: Tag.SCHOOLS, id: schoolId }]
    }),
    addSchool: builder.mutation<{ message: string }, SchoolProps>({
      query: (payload) => ({
        url: `/schools`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.SCHOOLS])
    }),
    deleteSchool: builder.mutation<{ message: string }, { schoolId: number }>({
      query: (schoolId) => ({
        url: `/schools/${schoolId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, error) => (error ? [] : [Tag.SCHOOLS])
    })
  })
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useAddSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation
} = schoolApi;
