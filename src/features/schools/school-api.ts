import { baseApi, Tag } from '@/api';
import type { School, SchoolProps, SchoolsData, SchoolWithIdProps } from './types';
import type { ApiResponseSuccessMessage } from '@/shared/types';
import { providesListTags } from '@/utils/helpers/provides-list-tags';

const schoolApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchools: builder.query<SchoolsData, void>({
      query: () => `/schools`,
      providesTags: (result) => providesListTags(result?.schools, Tag.SCHOOLS)
    }),
    getSchool: builder.query<School, number>({
      query: (id) => `/schools/${id}`,
      providesTags: (_result, _error, id) => [{ type: Tag.SCHOOL_DETAIL, id }]
    }),
    updateSchool: builder.mutation<ApiResponseSuccessMessage, SchoolWithIdProps>({
      query: ({ schoolId, ...payload }) => ({
        url: `/schools/${schoolId}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: (_result, _error, { schoolId }) => [
        { type: Tag.SCHOOLS, id: schoolId },
        { type: Tag.SCHOOLS, id: Tag.LIST },
        { type: Tag.SCHOOL_DETAIL, id: schoolId }
      ]
    }),
    addSchool: builder.mutation<ApiResponseSuccessMessage, SchoolProps>({
      query: (payload) => ({
        url: `/schools`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: Tag.SCHOOLS, id: Tag.LIST }]
    })
  })
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useAddSchoolMutation,
  useUpdateSchoolMutation
} = schoolApi;
