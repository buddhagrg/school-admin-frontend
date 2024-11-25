import { api, Tag } from '@/api';
import { School, SchoolProps, SchoolsData, SchoolWithIdProps } from '../types';

export const schoolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query<SchoolsData, void>({
      query: () => `/admin/schools`,
      providesTags: (result) =>
        result?.schools?.map(({ schoolId }) => {
          return { type: Tag.SCHOOLS, id: schoolId };
        }) || [{ type: Tag.SCHOOLS }]
    }),
    getSchool: builder.query<School, number>({
      query: (id) => `/admin/schools/${id}`,
      providesTags: (result) => (result ? [{ type: Tag.SCHOOLS, id: result.schoolId }] : [])
    }),
    updateSchool: builder.mutation<{ message: string }, SchoolWithIdProps>({
      query: ({ schoolId, ...payload }) => ({
        url: `/admin/schools/${schoolId}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (result, _error, { schoolId }) =>
        result ? [{ type: Tag.SCHOOLS, id: schoolId }] : []
    }),
    addSchool: builder.mutation<{ message: string }, SchoolProps>({
      query: (payload) => ({
        url: `/admin/schools`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: (result) => (result ? [Tag.SCHOOLS] : [])
    }),
    deleteSchool: builder.mutation<{ message: string }, { schoolId: number }>({
      query: (schoolId) => ({
        url: `/admin/schools/${schoolId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result) => (result ? [Tag.SCHOOLS] : [])
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
